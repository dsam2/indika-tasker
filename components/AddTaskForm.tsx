"use client";

import { addTask } from "@/actions/tasks";
import { useRef } from "react";

export default function AddTaskForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        formRef.current?.reset();
        await addTask(formData);
      }}
      className="flex flex-col gap-4 w-full" // Always column by default
    >
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* Task Title - flex-grow on desktop */}
        <input
          name="title"
          type="text"
          placeholder="Mission Objective..."
          className="flex-[2] min-w-0 border-4 border-black p-4 font-black uppercase text-black placeholder:text-gray-500 focus:bg-yellow-200 outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          required
        />
        
        {/* Priority Select */}
        <select
          name="priority"
          className="flex-1 min-w-0 border-4 border-black p-4 font-black uppercase bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none focus:bg-pink-200"
        >
          <option value="MISSION">MISSION</option>
          <option value="URGENT">URGENT</option>
          <option value="STASH">STASH</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* Date Picker */}
        <input
          name="dueDate"
          type="date"
          className="flex-1 min-w-0 border-4 border-black p-4 font-black uppercase text-black focus:bg-cyan-200 outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
          required
        />

        {/* Add Button */}
        <button
          type="submit"
          className="flex-1 bg-pink-500 text-white font-black px-8 py-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase italic text-xl"
        >
          Add +
        </button>
      </div>
    </form>
  );
}