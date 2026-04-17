"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle state
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#A3E635] p-6 text-black">
      <div className="w-full max-w-md bg-white border-[6px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8">
        
        <h1 className="text-5xl font-black mb-8 uppercase italic tracking-tighter leading-none">
          Login <br />
          <span className="bg-pink-500 text-white px-3 border-2 border-black not-italic text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Nexus
          </span>
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500 border-4 border-black p-3 font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-black uppercase mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-4 border-black p-4 focus:outline-none focus:bg-yellow-300 transition-all font-bold placeholder:text-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              placeholder="gem@example.com"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-black uppercase mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-4 border-black p-4 focus:outline-none focus:bg-cyan-300 transition-all font-bold placeholder:text-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] pr-20"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-pink-200 border-2 border-black px-2 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-white active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="pt-4 pb-2">
            <button
              type="submit"
              className="w-full bg-[#A3E635] border-4 border-black p-4 font-black uppercase text-xl hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all active:bg-yellow-400"
            >
              Enter Dashboard →
            </button>
          </div>
        </form>

        <p className="mt-8 font-black uppercase text-[10px] text-center tracking-widest">
          New here? <a href="/register" className="underline decoration-pink-500 decoration-4 hover:text-pink-600">Create account</a>
        </p>
      </div>
    </div>
  );
}