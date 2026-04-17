"use server"

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createTask(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  
  if (!title || title.length < 3) {
    return { error: "Title must be at least 3 characters long" };
  }

  try {
    await prisma.task.create({
      data: {
        title,
        userId: session.user.id,
      },
    });

    revalidatePath("/dashboard");
    return { error: null }; // Success state
  } catch (e) {
    return { error: "Failed to create task" };
  }
}