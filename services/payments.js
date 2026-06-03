"use server";

import { redirect } from "next/navigation";
import { getUser } from "@/services/auth";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

async function initializePayment() {
  const user = await getUser();

  if (!user) throw new Error("No logged in user");

  const { $id: userId, email } = user;

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${paystackSecretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: 1000000,
      callback_url: `${baseURL}/api/payments/`,
      metadata: { userId },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to initialize payment");
  }

  const { authorization_url } = data.data;

  redirect(authorization_url);
}

export { initializePayment };
