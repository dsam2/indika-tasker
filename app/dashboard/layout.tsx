"use client";

import { useState } from "react";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import PomodoroTimer from "@/components/PomodoroTimer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#A3E635] text-black font-mono overflow-x-hidden">

      {/* MOBILE HEADER */}
      {/* MOBILE HEADER */}
<div className="md:hidden fixed top-0 left-0 w-full bg-white border-b-4 border-black p-4 flex justify-between items-center z-50">
  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
    <h2 className="text-xl font-black uppercase italic tracking-tighter">Indika</h2>
  </Link>
  <button 
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    className="bg-yellow-300 border-2 border-black px-3 py-1 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
  >
    {isMenuOpen ? "CLOSE" : "MENU"}
  </button>
</div>

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white border-r-4 border-black p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="space-y-8">
          <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-black">
              Indika
            </h2>
          </Link>

          <div className="space-y-4">
            <PomodoroTimer />
          </div>

          <nav className="space-y-2 font-bold uppercase">
            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
              <div className="p-3 border-2 border-black bg-yellow-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-black">
                Objectives
              </div>
            </Link>
            <div className="p-3 opacity-40 cursor-not-allowed border-2 border-transparent">
              Intel (Coming)
            </div>
            <Link href="/dashboard/settings" onClick={() => setIsMenuOpen(false)}>
              <div className="p-3 opacity-60 hover:opacity-100 cursor-pointer border-2 border-transparent hover:border-black transition-all">
                Settings
              </div>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t-4 border-black">
          <LogoutButton />
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 md:p-10 mt-20 md:mt-0 w-full min-w-0">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}