
'use server'

import { cookies } from "next/headers";

const API_URL = process.env.DUMMY_API
export async function getAuth() {
  try {
    if (!API_URL) {
      throw new Error("API_URL environment variable is not defined");
    }

    const token = (await cookies()).get("auth_token")?.value

    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      },

    });
    if (!response.ok) {
      return { success: false, data: [], error: "Error!" }
    }
    const data = await response.json();

    return { success: true, data };
  } catch (error) {
    console.error("[getAuth] Error fetching auth:", error);
    return { success: false, data: [], error: "Error!" };
  }
}