"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, LogOut } from "lucide-react";
import { Logout } from "@/lib/actions";

export default function LogoutBtn() {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    await Logout();
  };
  return (
    <Button
      disabled={isLoading}
      className="bg-secondary"
      onClick={handleLogout}
    >
      {isLoading ? (
        <Loader2 className="animate-spin"/>
      ) : (
        <>
          <LogOut /> Logout
        </>
      )}
    </Button>
  );
}
