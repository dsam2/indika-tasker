"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const newUsername = formData.get("username") as string;
  const newEmail = formData.get("email") as string;

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      username: newUsername,
      email: newEmail,
    },
  });

  revalidatePath("/dashboard/settings");
}