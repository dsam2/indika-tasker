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
      className="flex flex-col md:flex-row gap-4"
    >
      {/* Task Title */}
      <input
        name="title"
        type="text"
        placeholder="Mission Objective..."
        className="flex-1 border-4 border-black p-4 font-black uppercase text-black placeholder:text-gray-500 focus:bg-yellow-200 outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        required
      />

      {/* Neubrutalist Date Picker */}
      <input 
        name="dueDate"
        type="date"
        className="border-4 border-black p-4 font-black uppercase text-black focus:bg-cyan-200 outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
        required
      />

      <button
        type="submit"
        className="bg-pink-500 text-white font-black px-8 py-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase italic text-xl"
      >
        Add +
      </button>
    </form>
  );
}