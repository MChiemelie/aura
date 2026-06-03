"use server";

import { NextResponse } from "next/server";
import { Query } from "node-appwrite";
import { appwriteConfig } from "@/config/appwrite";
import { createAdminClient } from "@/server/appwrite";

const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const paystackHeaders = {
  Authorization: `Bearer ${paystackSecretKey}`,
  "Content-Type": "application/json",
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference =
      searchParams.get("reference") || searchParams.get("trxref");

    if (!reference) {
      throw new Error("Payment reference is required for verification");
    }

    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: paystackHeaders },
    );

    const { status, data } = await verifyRes.json();
    const userId = data?.metadata?.userId;

    if (!status || data.status !== "success") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const { tables } = await createAdminClient();
    const { databaseId, usersTableId } = appwriteConfig;

    const getReference = await tables.listRows({
      databaseId,
      tableId: usersTableId,
      queries: [Query.equal("reference", [reference])],
    });

    const usedReference = getReference.rows.length > 0;

    if (usedReference) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    await tables.updateRow({
      databaseId,
      tableId: usersTableId,
      rowId: userId,
      data: { paid: true, reference },
    });

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Error occurred while verifying payment:", error);
  }
}
