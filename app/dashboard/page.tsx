import { auth } from "@/auth";
import AddTaskForm from "@/components/AddTaskForm";
import { prisma } from "@/lib/prisma";
import { deleteTask, toggleTask } from "../../actions/tasks";

// Strict interface to satisfy TypeScript
interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority?: string; // Add the '?' here to make it optional
  dueDate: Date | string | null;
}

export default async function DashboardPage() {
  const session = await auth();

  const userProfile = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: { username: true, email: true }
  });

  const allUserTasks = await prisma.task.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: 'desc' }
  }); // Cast to Task interface

  const displayName = userProfile?.username || userProfile?.email?.split('@')[0];
  const todayDate = new Date().toISOString().split('T')[0];

  const todayTasks = allUserTasks.filter(t =>
    t.dueDate && new Date(t.dueDate).toISOString().split('T')[0] === todayDate
  );

  const upcomingTasks = allUserTasks.filter(t =>
    !t.dueDate || new Date(t.dueDate).toISOString().split('T')[0] !== todayDate
  );

  const completedToday = todayTasks.filter(t => t.completed).length;
  const totalToday = todayTasks.length;
  const progressPercent = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  return (
    <div className="space-y-10 w-full overflow-x-hidden">
      <header className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-black break-words">
          Welcome back, <span className="text-pink-500">{displayName}</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-black">
        <div className="lg:col-span-2 space-y-10 w-full min-w-0">
          <section className="bg-white border-4 border-black p-4 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black uppercase mb-4 text-left">Quick Add Task</h2>
            <AddTaskForm />
          </section>

          {/* TODAY SECTION - Fixed apostrophe */}
          <div className="space-y-4">
            <h2 className="bg-cyan-300 border-4 border-black inline-block px-4 py-1 font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Today&apos;s Objectives
            </h2>
            <div className="grid gap-4 w-full">
              {todayTasks.length > 0 ? (
                todayTasks.map((task) => <TaskCard key={task.id} task={task} />)
              ) : (
                <div className="border-4 border-dashed border-black/20 p-10 flex flex-col items-center justify-center bg-white/50 space-y-4">
                  <div className="bg-yellow-300 border-4 border-black p-2 rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-black uppercase text-xl italic">All Sectors Clear</span>
                  </div>
                  <p className="font-black uppercase text-black/40 text-center max-w-xs leading-tight">
                    No missions detected for today. Standby for next deployment.
                  </p>
                  <div className="text-4xl animate-bounce pt-2">↑</div>
                </div>
              )}
            </div>
          </div>

          {/* UPCOMING SECTION */}
          <div className="space-y-4">
            <h2 className="bg-yellow-300 border-4 border-black inline-block px-4 py-1 font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Future Intel
            </h2>
            <div className="grid gap-4 w-full">
              {upcomingTasks.length > 0 ? (
                upcomingTasks.map((task) => <TaskCard key={task.id} task={task} />)
              ) : (
                <div className="border-4 border-dashed border-black/20 p-8 flex flex-col items-center justify-center bg-white/30">
                  <p className="font-black uppercase opacity-30 italic">No future threats found.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SIDE COLUMN: SYSTEM STATUS */}
        <div className="w-full">
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:sticky lg:top-24">
            <h3 className="font-black uppercase text-sm mb-4 underline decoration-pink-500 decoration-4 text-left">System Status</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-black text-xs uppercase">Mission Progress</span>
                  <span className="font-black text-xl text-pink-500">{progressPercent}%</span>
                </div>
                <div className="w-full h-6 border-4 border-black bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-[#A3E635] border-r-4 border-black transition-all duration-700 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
              <div className="pt-4 border-t-2 border-black flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase text-black/40 text-left">Intel Report:</p>
                <p className="text-sm font-bold uppercase text-left">
                  {completedToday} of {totalToday} Objectives Clear
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const toggleWithId = toggleTask.bind(null, task.id);
  const deleteWithId = deleteTask.bind(null, task.id);

  const priorityStyles: Record<string, string> = {
    URGENT: "border-red-600 bg-red-50 shadow-red-600 text-red-600",
    MISSION: "border-black bg-white shadow-black text-black",
    STASH: "border-cyan-500 bg-cyan-50 shadow-cyan-500 text-cyan-700",
  };

const currentStyle = priorityStyles[task.priority || "MISSION"] || priorityStyles.MISSION;

  return (
    <div className={`border-4 p-4 flex justify-between items-center transition-all duration-200
      ${task.completed ? "bg-gray-100 opacity-50 grayscale shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" : `${currentStyle} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}`}>
      <div className="flex items-center gap-4">
        <form action={toggleWithId}>
          <button type="submit" className={`w-8 h-8 border-4 border-black font-black ${task.completed ? "bg-green-400 text-black" : "bg-white text-transparent"}`}>
            ✓
          </button>
        </form>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            {task.priority === "URGENT" && !task.completed && (
              <span className="bg-red-600 text-white text-[10px] px-1 font-black animate-pulse">CRITICAL</span>
            )}
            <span className={`font-bold uppercase tracking-tight text-lg ${task.completed ? "line-through decoration-4 opacity-50" : ""}`}>
              {task.title}
            </span>
          </div>
          <span className="text-[10px] font-black opacity-40 uppercase">
            Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Deadline"}
          </span>
        </div>
      </div>
      <form action={deleteWithId}>
        <button className="bg-red-500 text-white border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-all">🗑️</button>
      </form>
    </div>
  );
}