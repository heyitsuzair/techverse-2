"use server";

import { prisma } from "@/lib/prisma";

export async function getRoles() {
  try {
    const roles = await prisma.role.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: roles };
  } catch (error) {
    console.error("Error fetching roles:", error);
    return { success: false, error: error.message };
  }
}
