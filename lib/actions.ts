
"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { LoginResponse } from "@/types"
import { LoginSchema } from "@/schemas";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { revalidatePath } from "next/cache";


export async function Login(
  data: z.infer<typeof LoginSchema>
) {

  const url = `${process.env.DUMMY_API}/auth/login`;
  if (!url) {
    return { ok: false, message: "API_URL is not configured on the server" };
  }


  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      let msg = `Login failed (${res.status})`;
      try {
        const body = (await res.json());
        msg = body?.message || body?.error || msg;
      } catch { }
      return { status: false, message: msg };
    }

    const payload = (await res.json()) as LoginResponse;
    const token = payload.accessToken;
    if (!token) {
      return { ok: false, message: "No token returned by API" };
    }

    const maxAge = 60 * 60 * 24 * 30;

    (await cookies()).set("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge,
    });

    redirect("/profile");


  } catch (err) {
    if (isRedirectError(err)) throw err;
    console.error("[loginAction] Error:", err);
    return { status: false, message: "Network or server error" };
  }
}
export async function Logout() {
  const store = await cookies();

  store.delete("auth_token");

  revalidatePath("/");

  redirect("/login")
}