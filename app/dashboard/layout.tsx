"use client";

import { useState } from "react";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import PomodoroTimer from "@/components/PomodoroTimer";

// Sector Themes Configuration
const themes = {
  default: "bg-[#A3E635]", 
  cyber: "bg-blue-500",    
  danger: "bg-red-500",    
  night: "bg-slate-900",   
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<keyof typeof themes>("default");

  return (
    <div className={`flex min-h-screen ${themes[activeTheme]} text-black font-mono overflow-x-hidden transition-colors duration-500`}>
      
      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white border-b-4 border-black p-4 flex justify-between items-center z-50">
        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
          <h2 className="text-xl font-black uppercase italic tracking-tighter text-black">Nexus</h2>
        </Link>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-yellow-300 border-2 border-black px-3 py-1 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
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
              Nexus
            </h2>
          </Link>

          <div className="space-y-4">
            <PomodoroTimer />
            
            {/* THEME SELECTOR */}
            <div className="bg-white border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-[10px] font-black uppercase mb-2 text-black">Sector Theme</h3>
              <div className="flex gap-2">
                {Object.keys(themes).map((t) => (
                  <button 
                    key={t}
                    onClick={() => setActiveTheme(t as keyof typeof themes)}
                    className={`w-6 h-6 border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform ${themes[t as keyof typeof themes]}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <nav className="space-y-2 font-bold uppercase">
            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
              <div className="p-3 border-2 border-black bg-yellow-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-black">
                Objectives
              </div>
            </Link>
            <Link href="/dashboard/settings" onClick={() => setIsMenuOpen(false)}>
              <div className="p-3 opacity-60 hover:opacity-100 cursor-pointer border-2 border-transparent hover:border-black transition-all text-black">
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