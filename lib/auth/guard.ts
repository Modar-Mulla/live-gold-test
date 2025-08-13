import { redirect } from "next/navigation";
import { getAuth } from "@/lib/get-auth";

export async function redirectIfAuthenticated(nextPath = "/profile") {
  const isAuth = (await getAuth()).success;
  if (isAuth) redirect(nextPath);
}