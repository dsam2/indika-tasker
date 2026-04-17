"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * ADDS A NEW TASK
 * Fixed: Uses real session ID to prevent P2003 error.
 */
export async function addTask(formData: FormData) {
  const session = await auth();
  const title = formData.get("title") as string;
  const dueDateString = formData.get("dueDate") as string;

  if (!session?.user?.id) {
    throw new Error("Unauthorized: No session found.");
  }

  await prisma.task.create({
    data: { 
      title, 
      userId: session.user.id,
      dueDate: dueDateString ? new Date(dueDateString) : null,
      completed: false 
    }
  });

  revalidatePath("/dashboard");
}

/**
 * TOGGLES TASK COMPLETION
 * Fixed: Explicitly exported for TaskItem.tsx.
 */
export async function toggleTask(id: string) {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) return;

  await prisma.task.update({
    where: { id },
    data: { completed: !task.completed }
  });
  revalidatePath("/dashboard");
}

/**
 * DELETES A TASK
 * Fixed: Explicitly exported for Dashboard and TaskItem.
 */
export async function deleteTask(id: string) {
  await prisma.task.delete({
    where: { id }
  });
  revalidatePath("/dashboard");
}