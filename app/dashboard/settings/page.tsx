import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateProfile } from "@/actions/settings";

export default async function SettingsPage() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  });

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <header className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-4xl font-black uppercase italic">User Intel</h1>
        <p className="font-bold text-gray-500">Update your operative credentials.</p>
      </header>

      <form action={updateProfile} className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
        {/* Username Field */}
        <div className="space-y-2">
          <label className="font-black uppercase text-sm">Codename (Username)</label>
          <input
            name="username"
            defaultValue={user?.username || ""}
            className="w-full border-4 border-black p-3 font-bold focus:bg-yellow-200 outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            placeholder="e.g. ShadowWalker"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="font-black uppercase text-sm">Secure Email</label>
          <input
            name="email"
            defaultValue={user?.email || ""}
            className="w-full border-4 border-black p-3 font-bold focus:bg-cyan-200 outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#A3E635] border-4 border-black py-4 font-black uppercase italic text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          Update Credentials
        </button>
      </form>
    </div>
  );
}