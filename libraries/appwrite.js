"use server";

import { cookies } from "next/headers";
import { Account, Client, TablesDB, Users } from "node-appwrite";
import { appwriteConfig } from "@/config/appwrite";

const SESSION_COOKIE = "aura-session";

export async function createSessionClient() {
  // Create a new client instance and set the endpoint and project ID
  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

  // Get the session cookie from the request headers
  const session = (await cookies()).get(SESSION_COOKIE);

  //checking if session exists
  if (!session || !session.value) {
    throw new Error("No session");
  }

  // Set the session cookie for the client to authenticate requests
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
