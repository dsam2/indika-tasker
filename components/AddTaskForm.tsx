"use client";

import { useActionState } from "react";
import { createTask } from "@/lib/actions";

export default function AddTaskForm() {
  // This hook automatically handles the (prevState, formData) 
  // arguments required by your updated actions.ts
  const [state, formAction, isPending] = useActionState(createTask, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <input 
          name="title"
          className="flex-1 border-4 border-black p-3 font-bold text-black outline-none focus:bg-yellow-50"
          placeholder="What needs to be done?"
          required
        />
        <button 
          disabled={isPending}
          className="bg-pink-500 border-4 border-black px-6 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50"
        >
          {isPending ? "Adding..." : "Add +"}
        </button>
      </div>
      
      {state?.error && (
        <p className="text-red-600 font-bold bg-red-100 border-2 border-black p-2 self-start">
          {state.error}
        </p>
      )}
    </form>
  );
}