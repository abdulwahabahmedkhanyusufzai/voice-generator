import Link from "next/link"
import { LucideIcon, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
    title: string;
    description: string;
    href: string;
    gradient: string;
    icon: LucideIcon;
}

export function QuickActionCard({ title, description, href, gradient, icon: Icon }: QuickActionCardProps) {
    return (
        <div className="flex gap-4 rounded-xl border bg-card p-3 shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className={cn("relative h-24 w-24 sm:h-28 sm:w-32 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br", gradient)}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-1.5 rounded-lg ring-1 ring-inset ring-white/20 " />
                    <div className="size-10 sm:size-12 rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                        <Icon className="size-5 sm:size-6 text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                </div>
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
                <div className="space-y-1">
                    <h3 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>
                </div>
                <div className="pt-2">
                    <Button variant="ghost" size="sm" className="h-8 px-0 text-xs font-medium hover:bg-transparent hover:text-primary group/btn" asChild>
                        <Link href={href}>
                            Try Now
                            <ArrowRight className="ml-1 size-3 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
