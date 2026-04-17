import LogoutButton from "@/components/LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#A3E635]"> {/* Neon Green Background */}
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r-4 border-black p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase italic mb-10">Indika</h2>
          <nav className="space-y-4 font-bold uppercase">
            <div className="p-2 border-2 border-black bg-yellow-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Tasks</div>
            <div className="p-2 hover:bg-white transition-colors cursor-pointer">Stats</div>
            <div className="p-2 hover:bg-white transition-colors cursor-pointer">Settings</div>
          </nav>
        </div>
        <LogoutButton />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}