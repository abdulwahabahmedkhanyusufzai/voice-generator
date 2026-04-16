"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createOrganization(formData: FormData) {
    const session = await auth()
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    const name = formData.get("name") as string
    if (!name) {
        throw new Error("Name is required")
    }

    const org = await prisma.organization.create({
        data: {
            name,
            memberships: {
                create: {
                    userId: session.user.id,
                    role: "OWNER",
                },
            },
        },
    })

    const { cookies } = await import("next/headers")
    ;(await cookies()).set("activeOrgId", org.id, { path: "/" })

    revalidatePath("/org-selection")
    redirect("/")
}

export async function selectOrganization(orgId: string) {
    const session = await auth()
    if (!session?.user?.id) {
        throw new Error("Unauthorized")
    }

    // Verify user belongs to org
    const membership = await prisma.membership.findUnique({
        where: {
            userId_organizationId: {
                userId: session.user.id,
                organizationId: orgId,
            },
        },
    })

    if (!membership) {
        throw new Error("Unauthorized")
    }

    // In NextAuth v5, we might want to store the active org in a cookie
    // or update the session if possible. 
    // For now, let's just redirect to home with a cookie.
    
    // We can't easily update the session on the fly without a re-auth or similar
    // unless we use a cookie that we read in middleware or elsewhere.
    
    // Let's use a cookie for activeOrgId
    const { cookies } = await import("next/headers")
    ;(await cookies()).set("activeOrgId", orgId, { path: "/" })

    redirect("/")
}
