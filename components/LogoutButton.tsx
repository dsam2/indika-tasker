"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut()}
      className="bg-red-400 border-2 border-black px-4 py-2 font-black uppercase hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
    >
      Sign Out
    </button>
  );
}