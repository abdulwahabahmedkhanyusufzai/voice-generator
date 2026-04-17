import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserButton } from "@/components/user-button";
import { OrganizationSwitcher } from "@/components/org-switcher";
import { WavyBackground } from "@/components/ui/wavy-background";
import { TextInputPanel } from "../components/text-input-panel";
import { QuickActionPanel } from "../components/quick-action-panel";

export async function DashboardView() {
    const session = await auth();
    if (!session?.user) {
        redirect("/sign-in");
    }

    const activeOrgId = (await cookies()).get("activeOrgId")?.value;

    if (!activeOrgId) {
        redirect("/org-selection");
    }

    let organization = null;
    let memberships: any[] = [];

    try {
        organization = await prisma.organization.findUnique({
            where: { id: activeOrgId },
        });

        if (!organization) {
            (await cookies()).delete("activeOrgId");
            redirect("/org-selection");
        }

        memberships = await prisma.membership.findMany({
            where: { userId: session.user.id },
            include: { organization: true },
        });
    } catch (error) {
        console.error("Dashboard Prisma Error:", error);
        // If DB fails during build, we might still want to pre-render the shell 
        // Or Next will handle the error. For build time pre-rendering we need 
        // to be careful not to redirect unless we have to.
        if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
            // Probably pre-rendering without DB
            return <div>Loading dashboard...</div>
        }
        // Let it throw for actual runtime errors? Or handle it.
        // For now, return a placeholder to avoid build crash.
        return <div className="p-8">Unable to load dashboard data. Please check your database connection.</div>
    }

    return (
        <div className="h-full w-full bg-background p-4 md:p-8 flex flex-col items-start justify-start overflow-y-auto">
            <div className="w-full flex flex-col items-start gap-y-10 max-w-7xl mx-auto">
                <WavyBackground
                    className="p-4 md:p-6"
                    containerClassName="h-auto w-full max-w-xl rounded-xl items-start justify-start"
                    backgroundFill="white"
                    waveOpacity={0.12}
                    blur={3}
                >
                    <div className="flex flex-col items-start gap-y-0.5">
                        <p className="text-xl md:text-2xl lg:text-3xl text-black font-bold tracking-tight text-left">
                            Welcome back, {session.user.name}
                        </p>
                        <p className="text-sm md:text-base text-zinc-600 font-medium text-left">
                            {organization.name}
                        </p>
                    </div>
                </WavyBackground>

                <TextInputPanel />
                <QuickActionPanel />
            </div>
        </div>
    )
}
