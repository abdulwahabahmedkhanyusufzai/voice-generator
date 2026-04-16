"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateProfile } from "@/lib/actions/user"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { UserAvatar } from "@/components/user-avatar"

export default function ProfilePage() {
    const { data: session, update, status } = useSession()
    const [isLoading, setIsLoading] = useState(false)
    
    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!session?.user) {
        return null
    }

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        try {
            const result = await updateProfile(formData)
            if (result.success) {
                await update({
                    name: formData.get("name"),
                    image: formData.get("image"),
                })
                toast.success("Profile updated successfully")
            }
        } catch (error) {
            toast.error("Failed to update profile")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40 p-4">
            <div className="w-full max-w-md space-y-4">
                <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Manage Account</CardTitle>
                        <CardDescription>
                            Update your profile information.
                        </CardDescription>
                    </CardHeader>
                    <form action={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col items-center gap-4">
                                <UserAvatar 
                                    user={session.user} 
                                    className="h-20 w-20" 
                                    fallbackClassName="text-3xl"
                                />
                                <div className="w-full space-y-2">
                                    <Label htmlFor="image">Profile Image URL</Label>
                                    <Input id="image" name="image" defaultValue={session.user.image || ""} placeholder="https://example.com/image.jpg" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={session.user.email || ""} disabled className="bg-muted" />
                                <p className="text-[10px] text-muted-foreground">Email cannot be changed.</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Display Name</Label>
                                <Input id="name" name="name" defaultValue={session.user.name || ""} placeholder="Your Name" required />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}
