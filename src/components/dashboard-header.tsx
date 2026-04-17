"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Headphones, ThumbsUp } from "lucide-react";
import Link from "next/link";

const routeConfig: Record<string, string> = {
    "/": "Dashboard",
    "/text-to-speech": "Text to Speech",
    "/voices": "Explore Voices",
    "/voice-cloning": "Voice Cloning",
    "/profile": "Profile",
    "/org-selection": "Organizations",
};

export function DashboardHeader() {
    const { data: session, status } = useSession();
    const pathname = usePathname();

    const getPageTitle = (path: string) => {
        // Find exact match or match base path for dynamic routes
        if (routeConfig[path]) return routeConfig[path];
        
        // Handle nested routes (e.g., /dashboard/audio/123)
        const segments = path.split("/").filter(Boolean);
        if (segments.length > 0) {
            const lastSegment = segments[segments.length - 1];
            return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, " ");
        }
        
        return "Dashboard";
    };

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <div className="h-4 w-px bg-border mx-2 hidden md:block" />
                <h1 className="text-sm font-medium">{getPageTitle(pathname)}</h1>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild className="h-8">
                        <Link href="mailto:bussiness@codewithantonio.com">
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            <span>Give Feedback</span>
                        </Link>
                    </Button>

                    <Button variant="outline" size="sm" asChild className="h-8">
                        <Link href="mailto:bussiness@codewithantonio.com">
                            <Headphones className="mr-2 h-4 w-4" />
                            <span>Support</span>
                        </Link>
                    </Button>
                </div>

                <div className="h-4 w-px bg-border mx-1 hidden sm:block" />

                {status === "loading" ? (
                    <Skeleton className="h-4 w-24" />
                ) : (
                    <span className="text-sm font-medium text-muted-foreground">
                        {session?.user?.name}
                    </span>
                )}
            </div>
        </header>
    );
}
