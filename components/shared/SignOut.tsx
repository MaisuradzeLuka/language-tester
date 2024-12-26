"use client";
import { signOut } from "next-auth/react";

export function SignOut({ children }: { children: React.ReactNode }) {
  return (
    <button
      onClick={() => signOut({ redirectTo: "/" })}
      className=" rounded-full border border-transparent hover:border-red-500 transition"
    >
      {children || "Sign out"}
    </button>
  );
}
