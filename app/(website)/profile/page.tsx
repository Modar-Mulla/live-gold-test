import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Calendar, AtSign, User2 } from "lucide-react";
import { getAuth } from "@/lib/get-auth";
import LogoutBtn from "@/components/profile/logout-btn";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { formatDate } from "@/lib/strings";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: "Profile | Alien E-commerce",
  description:
    "View and manage your Alien E-commerce account profile, contact details, and preferences.",
  alternates: { canonical: `${SITE_URL}/profile` },
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
    url: `${SITE_URL}/profile`,
    siteName: "Alien E-commerce",
    title: "Profile",
    description:
      "Manage your account settings and personal information securely.",
  },
  twitter: {
    card: "summary",
    title: "Profile | Alien E-commerce",
    description:
      "Manage your account settings and personal information securely.",
  },
};

export default async function ProfilePage() {
  const userFetch = await getAuth();
  if (!userFetch.success) {
    redirect("/login");
  }
  const user = userFetch.data;

  return (
    <div className="min-h-screen bg-gradient-to-b p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            User Profile
          </h1>
          <p className="text-gray-600">Personal information and details</p>
        </div>

        {/* Main Profile Card */}
        <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage
                  src={user.image || "/placeholder.svg"}
                  alt={`${user.firstName} ${user.lastName}`}
                />
                <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-500 text-lg">@{user.username}</p>
                {user.maidenName && (
                  <p className="text-sm text-gray-400">{user.maidenName}</p>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Personal Information Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">
                  Basic Information
                </h3>

                <div className="flex items-center space-x-3">
                  <User2 className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-medium">{user.age} years old</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Birth Date</p>
                    <p className="font-medium">{formatDate(user.birthDate)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Badge variant="secondary" className="text-xs">
                      {user.gender === "female" ? "♀" : "♂"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium capitalize">{user.gender}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold border-b pb-2">
                  Contact Information
                </h3>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium break-all">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <AtSign className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-medium">@{user.username}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="center w-full mt-10">
              <LogoutBtn />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
