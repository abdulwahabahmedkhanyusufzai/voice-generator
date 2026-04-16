"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData: FormData) {
    const session = await auth()
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    const name = formData.get("name") as string
    const image = formData.get("image") as string
    
    await prisma.user.update({
        where: { id: session.user.id },
        data: { 
            name,
            image
        },
    })

    revalidatePath("/profile")
    revalidatePath("/")
    
    return { success: true }
}
