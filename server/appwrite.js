"use server";

import { Client, Account, TablesDB, Users } from "node-appwrite";
import { cookies } from "next/headers";
import { appwriteConfig } from "@/config/appwrite";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

  const session = (await cookies()).get("aura-session");

  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get tables() {
      return new TablesDB(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.appwriteKey);

  return {
    get account() {
      return new Account(client);
    },
    get tables() {
      return new TablesDB(client);
    },
    get users() {
      return new Users(client);
    },
  };
}
