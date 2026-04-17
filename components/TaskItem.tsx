"use client";

import { deleteTask, toggleTask } from "@/actions/tasks";
import { useTransition } from "react";

export default function TaskItem({ task }: { task: any }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className={`
      flex justify-between items-center p-4 border-4 border-black transition-all
      ${task.completed ? "bg-gray-200 opacity-60" : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"}
    `}>
      <div className="flex items-center gap-4">
        <input 
          type="checkbox" 
          checked={task.completed}
          onChange={() => startTransition(() => toggleTask(task.id))}
          className="w-6 h-6 border-4 border-black accent-pink-500 cursor-pointer"
        />
        <span className={`font-black uppercase text-lg ${task.completed ? "line-through" : ""}`}>
          {task.title}
        </span>
      </div>

      <button 
        disabled={isPending}
        onClick={() => startTransition(() => deleteTask(task.id))}
        className="bg-red-500 text-white border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all active:bg-black"
      >
        🗑️
      </button>
    </div>
  );
}