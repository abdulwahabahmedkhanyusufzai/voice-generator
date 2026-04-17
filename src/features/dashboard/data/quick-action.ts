import { LucideIcon, BookOpen, Mic2, Film, Podcast, Wind } from "lucide-react";

export interface QuickAction {
    title: string;
    description: string;
    gradient: string;
    href: string;
    icon: LucideIcon;
}

export const quickActions: QuickAction[] = [
    {
        title: "Narrate a Story",
        description: "Bring stories to life with engaging narration",
        gradient: "from-blue-600 to-indigo-600",
        href: "/dashboard/narrate-a-story",
        icon: BookOpen,
    },
    {
        title: "Record an Ad",
        description: "Create compelling advertisements with professional voiceovers",
        gradient: "from-sky-500 to-blue-500",
        href: "/dashboard/record-an-ad",
        icon: Mic2,
    },
    {
        title: "Direct a Movie Scene",
        description: "Bring movie scenes to life with engaging narration",
        gradient: "from-purple-600 to-pink-600",
        href: "/dashboard/direct-a-movie-scene",
        icon: Film,
    },
    {
        title: "Introduce your podcast",
        description: "Create engaging podcast introductions with professional voiceovers",
        gradient: "from-indigo-600 to-purple-600",
        href: "/dashboard/introduce-your-podcast",
        icon: Podcast,
    },
    {
        title: "Guide a Meditation",
        description: "Create guided meditations with calming voiceovers",
        gradient: "from-pink-500 to-rose-500",
        href: "/dashboard/guide-a-meditation",
        icon: Wind,
    },
]
