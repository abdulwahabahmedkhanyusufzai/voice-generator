import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createOrganization, selectOrganization } from "@/lib/actions/org"

export default async function OrgSelectionPage() {
    const session = await auth()
    
    if (!session?.user?.id) {
        redirect("/sign-in")
    }

    console.log("Prisma keys:", Object.keys(prisma))
    const memberships = await prisma.membership.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            organization: true
        }
    })

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
            <div className="w-full max-w-md space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Select Organization</CardTitle>
                        <CardDescription>
                            Choose an organization to continue or create a new one.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {memberships.length > 0 ? (
                            <div className="grid gap-2">
                                {memberships.map((membership) => (
                                    <form key={membership.organizationId} action={async () => {
                                        "use server"
                                        await selectOrganization(membership.organizationId)
                                    }}>
                                        <Button 
                                            variant="outline" 
                                            className="w-full justify-start text-left h-auto py-3 px-4"
                                            type="submit"
                                        >
                                            <div className="flex flex-col items-start">
                                                <span className="font-semibold">{membership.organization.name}</span>
                                                <span className="text-xs text-muted-foreground uppercase">{membership.role}</span>
                                            </div>
                                        </Button>
                                    </form>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-center text-muted-foreground py-4">
                                You are not a member of any organization yet.
                            </p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Create Organization</CardTitle>
                        <CardDescription>
                            Create a new organization to get started.
                        </CardDescription>
                    </CardHeader>
                    <form action={createOrganization}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Organization Name</Label>
                                <Input id="name" name="name" placeholder="Acme Inc." required />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">Create & Continue</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}