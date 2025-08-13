import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

const TITLE = "Login | Alien E-commerce";
const DESCRIPTION =
  "Sign in to your Alien E-commerce account to track orders, manage profile, and checkout faster.";

export const loginMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/login` },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      nosnippet: true,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/login`,
    siteName: "Alien E-commerce",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};
