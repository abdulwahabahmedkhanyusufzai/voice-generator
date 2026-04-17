"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LucideIcon, Home, LayoutGrid, AudioLines, Volume2, Settings, Headphones } from "lucide-react";
import { Sidebar, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, SidebarContent, SidebarHeader, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";
import { UserButton } from "@/components/user-button";
import { OrganizationSwitcher } from "@/components/org-switcher";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuItem {
    title: string;
    href?: string;
    url?: string;
    icon: LucideIcon;
    onClick?: () => void;
}
interface NavSectionProps {
    label: string;
    items: MenuItem[];
    pathname: string;
}

interface DashboardSidebarProps {
    currentOrg: {
        id: string;
        name: string;
    } | null;
    memberships: any[];
}




export function NavSection({ label, items, pathname }: NavSectionProps) {
    return (
        <SidebarGroup>
            {label && (
                <SidebarGroupLabel className="text-[13px] uppercase text-muted-foreground">{label}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => {
                        const active = item.href ? (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) : false;
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild={!!(item.href || item.url)}
                                    isActive={active}
                                    onClick={item.onClick}
                                    tooltip={item.title}>
                                    {item.href ? (
                                        <Link href={item.href}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    ) : item.url ? (
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    ) : (
                                        <>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </>
                                    )}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

export function DashboardSidebar({ currentOrg, memberships }: DashboardSidebarProps) {
    const pathname = usePathname();
    const { data: session, status } = useSession();

    const mainMenuItems: MenuItem[] = [
        {
            title: "Dashboard",
            href: "/",
            icon: Home,
        },
        {
            title: "Explore Voices",
            href: "/voices",
            icon: LayoutGrid,
        },
        {
            title: "Text to Speech",
            href: "/text-to-speech",
            icon: AudioLines,
        },
        {
            title: "Voice Cloning",
            href: "/voice-cloning",
            icon: Volume2,
        },
    ];
    const otherMenuItems: MenuItem[] = [
        {
            title: "Settings",
            icon: Settings,
            onClick: () => {
                OrganizationSwitcher
            }
        }, {
            title: "Help and Support",
            url: "mailto:bussiness@codewithantonio.com",
            icon: Headphones,
        }
    ];
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="flex flex-col gap-4 pt-4 ">
                <div className="flex items-center gap-2 pl-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:pl-0">
                    <Image src="/logo.svg" alt="Logo" width={24} height={24} className="rounded-sm" priority loading="eager" />
                    <span className="group-data-[collapsible=icon]:hidden font-bold text-lg tracking-tight">Ressiance AI</span>
                </div>
                <div className="group-data-[collapsible=icon]:hidden px-1">
                    {currentOrg && (
                        <OrganizationSwitcher
                            currentOrg={currentOrg}
                            memberships={memberships}
                        />
                    )}
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavSection label="Platform" items={mainMenuItems} pathname={pathname} />
                <NavSection label="Support" items={otherMenuItems} pathname={pathname} />
            </SidebarContent>
            <SidebarFooter>
                {status === "loading" ? (
                    <Skeleton className="h-9 w-9 rounded-full" />
                ) : session?.user ? (
                    <UserButton user={session.user} />
                ) : null}
            </SidebarFooter>
        </Sidebar>
    );
}
