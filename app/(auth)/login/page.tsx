import LoginFrom from "@/components/login/login-from";
import { redirectIfAuthenticated } from "@/lib/auth/guard";
import { loginMetadata } from "@/lib/seo/login";
import { Metadata } from "next";
import React from "react";
import { RiAliensLine } from "react-icons/ri";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = loginMetadata;

export default async function LoginPage() {
  await redirectIfAuthenticated("/profile");
  return (
    <section className="h-svh grid grid-cols-2">
      <div className="bg-primary center hidden md:flex">
        <RiAliensLine className="text-[150px] text-secondary" />
      </div>
      <div className="container center flex-col gap-5 col-span-full md:col-span-1">
        <LoginFrom />
      </div>
    </section>
  );
}
