import Image from "next/image";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserButton } from "@/components/user-button";
import { OrganizationSwitcher } from "@/components/org-switcher";

export default async function Home() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const activeOrgId = (await cookies()).get("activeOrgId")?.value;

  if (!activeOrgId) {
    redirect("/org-selection");
  }

  const organization = await prisma.organization.findUnique({
    where: { id: activeOrgId },
  });

  if (!organization) {
    (await cookies()).delete("activeOrgId");
    redirect("/org-selection");
  }

  const memberships = await prisma.membership.findMany({
    where: { userId: session.user.id },
    include: { organization: true },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-6 bg-white dark:bg-black border-b">
        <div className="flex items-center gap-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={80}
            height={16}
            priority
          />
        </div>
      </header>

      <main className="flex w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start shadow-sm rounded-xl">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to {organization.name}
          </h1>

          <div className="flex items-center gap-4 py-2">
            <OrganizationSwitcher 
              currentOrg={{ id: organization.id, name: organization.name }}
              memberships={memberships}
            />
            <UserButton user={session.user} />
          </div>

          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            You are now signed in and your organization is selected. You can start building your voice generator here.
          </p>
        </div>
      </main>
    </div>
  );
}
