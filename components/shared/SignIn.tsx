"use client";
import { signIn } from "next-auth/react";

export function SignIn() {
  return (
    <button
      onClick={() => signIn()}
      className=" border border-white rounded-sm px-3 py-1 hover:bg-white hover:text-black transition"
    >
      Sign In
    </button>
  );
}
