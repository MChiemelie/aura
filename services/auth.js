"use server";

import { createSessionClient, createAdminClient } from "@/server/appwrite";
import { ID, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { appwriteConfig } from "@/config/appwrite";

const SESSION_COOKIE = "aura-session";

async function setSession(secret) {
  (await cookies()).set(SESSION_COOKIE, secret, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

async function createUserProfile(email, name = "") {
  const { tables } = await createAdminClient();

  const existingUser = await tables.listRows({
    databaseId: appwriteConfig.databaseId,
    tableId: appwriteConfig.usersTableId,
    queries: [Query.equal("email", [email])],
  });

  if (existingUser.rows.length > 0) return;

  await tables.createRow({
    databaseId: appwriteConfig.databaseId,
    tableId: appwriteConfig.usersTableId,
    rowId: ID.unique(),
    data: {
      email,
      name,
    },
  });
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch {
    return null;
  }
}

export async function signUpWithEmail(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  const { account } = await createAdminClient();

  await account.create({
    userId: ID.unique(),
    email,
    password,
    name,
  });

  await createUserProfile(email, name);

  const session = await account.createEmailPasswordSession({
    email,
    password,
  });

  await setSession(session.secret);

  redirect("/");
}

export async function signInWithEmail(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const { account } = await createAdminClient();

  const session = await account.createEmailPasswordSession({
    email,
    password,
  });

  await createUserProfile(email);

  await setSession(session.secret);

  redirect("/");
}

export async function signOut() {
  const { account } = await createSessionClient();

  await account.deleteSession("current");

  (await cookies()).delete(SESSION_COOKIE);

  redirect("/sign-in");
}

export async function getUser() {
  const loggedInUser = await getLoggedInUser();

  if (!loggedInUser) return null;

  const { tables } = await createAdminClient();

  const response = await tables.listRows({
    databaseId: appwriteConfig.databaseId,
    tableId: appwriteConfig.usersTableId,
    queries: [Query.equal("email", [loggedInUser.email])],
  });

  return response.rows[0] || null;
}
