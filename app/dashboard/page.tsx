import { auth } from "@/auth";
import AddTaskForm from "@/components/AddTaskForm"; // Import the client component

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-8">
      
      <header className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-4xl font-black uppercase tracking-tight">
          Welcome back, <span className="text-pink-500">{session?.user?.email?.split('@')[0]}</span>!
        </h1>
      </header>

      {/* Task Creation Section */}
      <section className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-black uppercase mb-4 text-black text-left">Quick Add Task</h2>
       
        <AddTaskForm /> 
      </section>
    </div>
  );
}