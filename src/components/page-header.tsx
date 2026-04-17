import { Headphones, ThumbsUp, LucideIcon } from "lucide-react";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function PageHeader({ title, className }: {
    title: string
    className?: string
}) {
    return (
        <div className={cn("flex items-center justify-between border-b px-4 py-4", className)}>
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                    <Link href="mailto:bussiness@codewithantonio.com">
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        <span>Give Feedback</span>
                    </Link>
                </Button>

                <Button variant="outline" size="sm" asChild>
                    <Link href="mailto:bussiness@codewithantonio.com">
                        <Headphones className="mr-2 h-4 w-4" />
                        <span>Support</span>
                    </Link>
                </Button>
            </div>
        </div >
    )
}