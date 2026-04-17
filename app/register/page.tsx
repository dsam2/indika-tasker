"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const errorData = await res.json();
      alert(`Error: ${errorData.message || "Registration failed"}`);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center p-4 text-black">
      <form 
        onSubmit={handleSubmit}
        className="bg-white border-[6px] border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full max-w-md"
      >
        {/* Spaced out Neubrutalist Title */}
        <h1 className="text-4xl font-black uppercase mb-10 italic tracking-tighter leading-none flex flex-col gap-3">
          <span className="text-black">Join the</span>
          <span className="bg-cyan-300 px-3 py-1 border-4 border-black inline-block self-start shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] not-italic">
            Mission
          </span>
        </h1>
        
        <div className="mb-6">
          <label className="block font-black uppercase text-sm mb-2">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-4 border-black p-4 font-bold text-black placeholder:text-gray-500 focus:bg-cyan-100 outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            placeholder="dev@indika.ai"
            required
          />
        </div>

        <div className="mb-8 relative">
          <label className="block font-black uppercase text-sm mb-2">Secure Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-4 border-black p-4 font-bold text-black placeholder:text-gray-500 focus:bg-pink-200 outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] pr-20"
              placeholder="••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-yellow-300 border-2 border-black px-2 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-white active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="pb-4">
          <button 
            type="submit"
            className="w-full bg-black text-white font-black py-4 uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,20,147,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all text-xl"
          >
            Initialize Account
          </button>
        </div>

        <p className="mt-4 text-center font-bold uppercase text-xs">
          Already a member? <a href="/login" className="underline decoration-pink-500 decoration-2">Log In</a>
        </p>
      </form>
    </div>
  );
}