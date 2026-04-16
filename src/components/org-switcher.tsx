"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Building2, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { selectOrganization } from "@/lib/actions/org"
import Link from "next/link"

interface OrganizationSwitcherProps {
  currentOrg: {
    id: string
    name: string
  }
  memberships: {
    organizationId: string
    organization: {
      name: string
    }
  }[]
}

export function OrganizationSwitcher({
  currentOrg,
  memberships,
}: OrganizationSwitcherProps) {
  const [isPending, startTransition] = React.useTransition()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-label="Select an organization"
          className={cn("w-[200px] justify-between", isPending && "opacity-50")}
          disabled={isPending}
        >
          <Building2 className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <span className="truncate">{currentOrg.name}</span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] p-0" align="start">
        <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground">
          Organizations
        </DropdownMenuLabel>
        {memberships.map((membership) => (
          <DropdownMenuItem
            key={membership.organizationId}
            onSelect={() => {
              startTransition(async () => {
                await selectOrganization(membership.organizationId)
              })
            }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <Building2 className="mr-2 h-4 w-4" />
              <span className="truncate">{membership.organization.name}</span>
            </div>
            {currentOrg.id === membership.organizationId && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <Link href="/org-selection">
          <DropdownMenuItem>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Organization
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
