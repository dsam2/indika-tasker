import { auth } from "@/auth";
import AddTaskForm from "@/components/AddTaskForm";
import { prisma } from "@/lib/prisma";
import { deleteTask, toggleTask } from "../../actions/tasks";

export default async function DashboardPage() {
  const session = await auth();
  
  const tasks = await prisma.task.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: 'desc' }
  });

  const todayDate = new Date().toISOString().split('T')[0];

  // Filtering Logic
  const todayTasks = tasks.filter(t => 
    t.dueDate && new Date(t.dueDate).toISOString().split('T')[0] === todayDate
  );

  const upcomingTasks = tasks.filter(t => 
    !t.dueDate || new Date(t.dueDate).toISOString().split('T')[0] !== todayDate
  );

  // System Status Logic
  const completedToday = todayTasks.filter(t => t.completed).length;
  const totalToday = todayTasks.length;
  const progressPercent = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  return (
    <div className="space-y-10">
      {/* 1. WELCOME HEADER */}
      <header className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-black">
          Welcome back, <span className="text-pink-500">{session?.user?.email?.split('@')[0]}</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT & CENTER: Task Management */}
        <div className="lg:col-span-2 space-y-10">
          <section className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black uppercase mb-4 text-black">Quick Add Task</h2>
            <AddTaskForm /> 
          </section>

          {/* TODAY SECTION */}
          <div className="space-y-4">
            <h2 className="bg-cyan-300 border-4 border-black inline-block px-4 py-1 font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
              Today's Objectives
            </h2>
            <div className="grid gap-4">
              {todayTasks.length > 0 ? (
                todayTasks.map((task) => <TaskCard key={task.id} task={task} />)
              ) : (
                <p className="font-black uppercase text-black/20 italic p-6 border-4 border-dashed border-black/10">No objectives for today.</p>
              )}
            </div>
          </div>

          {/* UPCOMING SECTION */}
          <div className="space-y-4">
            <h2 className="bg-yellow-300 border-4 border-black inline-block px-4 py-1 font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
              Future Intel
            </h2>
            <div className="grid gap-4">
              {upcomingTasks.length > 0 ? (
                upcomingTasks.map((task) => <TaskCard key={task.id} task={task} />)
              ) : (
                <p className="font-black uppercase text-black/20 italic p-6 border-4 border-dashed border-black/10">The future is clear.</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SYSTEM STATUS & INTEL */}
        <div className="space-y-6">
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-24">
            <h3 className="font-black uppercase text-sm mb-4 text-black underline decoration-pink-500 decoration-4">System Status</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-black text-xs uppercase text-black">Mission Progress</span>
                  <span className="font-black text-xl text-pink-500">{progressPercent}%</span>
                </div>
                {/* Neubrutalist Progress Bar */}
                <div className="w-full h-6 border-4 border-black bg-gray-100 overflow-hidden">
                  <div 
                    className="h-full bg-[#A3E635] border-r-4 border-black transition-all duration-700 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t-2 border-black flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase text-black/40">Intel Report:</p>
                <p className="text-sm font-bold uppercase text-black">
                  {completedToday} of {totalToday} Objectives Clear
                </p>
                <p className={`text-xs font-black uppercase italic ${progressPercent === 100 ? "text-green-600" : "text-blue-600"}`}>
                  {progressPercent === 100 ? ">> Mission Accomplished" : ">> Operation Ongoing"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: any }) {
  const toggleWithId = toggleTask.bind(null, task.id);
  const deleteWithId = deleteTask.bind(null, task.id);

  return (
    <div className={`
      border-4 border-black p-4 flex justify-between items-center transition-all duration-200
      ${task.completed 
        ? "bg-gray-100 opacity-60 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[2px] translate-y-[2px]" 
        : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"}
    `}>
      <div className="flex items-center gap-4">
        <form action={toggleWithId}>
          <button 
            type="submit"
            className={`w-8 h-8 border-4 border-black flex items-center justify-center transition-colors font-black
              ${task.completed ? "bg-green-400 text-black" : "bg-white hover:bg-yellow-200 text-transparent"}`}
          >
            ✓
          </button>
        </form>

        <div className="flex flex-col">
          <span className={`font-bold uppercase tracking-tight text-black text-lg break-all ${task.completed ? "line-through decoration-4" : ""}`}>
            {task.title}
          </span>
          <span className="text-[10px] font-black text-gray-400 uppercase mt-1">
            Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Deadline"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <form action={deleteWithId}>
          <button className="bg-red-500 text-white border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
            🗑️
          </button>
        </form>
      </div>
    </div>
  );
}