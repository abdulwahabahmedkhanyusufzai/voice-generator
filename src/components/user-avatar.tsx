"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAvatarColor, cn } from "@/lib/utils"

interface UserAvatarProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  className?: string
  fallbackClassName?: string
}

export function UserAvatar({ user, className, fallbackClassName }: UserAvatarProps) {
  const firstChar = (user.name?.[0] || user.email?.[0] || "U").toUpperCase()
  const colorClass = getAvatarColor(user.name || user.email || "user")

  return (
    <Avatar className={cn("border-0", className)}>
      <AvatarImage src={user.image || ""} alt={user.name || ""} />
      <AvatarFallback className={cn(colorClass, "text-white font-medium border-0", fallbackClassName)}>
        {firstChar}
      </AvatarFallback>
    </Avatar>
  )
}
