

import {
  BookOpenIcon, ChevronDownIcon, HomeIcon,
  LayoutDashboardIcon,
  LogOutIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useSignout } from "@/hooks/use-signout"

interface iAppProps {
    name: string;
    email: string;
    image: string;
}

export function UserDropDown({email,name, image} : iAppProps) {

    const router = useRouter();
    const handleSignOut = useSignout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* thêm relative nếu sau này bạn để icon absolute giống ThemeToggle */}
        <Button variant="ghost" className="relative h-auto p-0 gap-2">
          <Avatar>
            <AvatarImage src={image} alt="Profile image" />
            <AvatarFallback>{name[0].toLocaleUpperCase()}</AvatarFallback>
          </Avatar>
          <ChevronDownIcon size={16} className="opacity-60" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="max-w-64 z-[1000] bg-popover text-popover-foreground ring-1 ring-border shadow-md rounded-md"
      >
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium">{name}</span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild
            className="group cursor-pointer
                       data-[highlighted]:bg-neutral-100 data-[highlighted]:text-neutral-900
                       dark:data-[highlighted]:bg-neutral-800 dark:data-[highlighted]:text-neutral-100"
          >
            <Link href='/'>
                <HomeIcon size={16} className="opacity-60 transition-opacity group-data-[highlighted]:opacity-100" />
                <span className="transition-colors">Home</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild
            className="group cursor-pointer
                       data-[highlighted]:bg-neutral-100 data-[highlighted]:text-neutral-900
                       dark:data-[highlighted]:bg-neutral-800 dark:data-[highlighted]:text-neutral-100"
          >
            <Link href='/course'>
            <BookOpenIcon size={16} className="opacity-60 transition-opacity group-data-[highlighted]:opacity-100" />
            <span className="transition-colors">Course</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild
            className="group cursor-pointer
                       data-[highlighted]:bg-neutral-100 data-[highlighted]:text-neutral-900
                       dark:data-[highlighted]:bg-neutral-800 dark:data-[highlighted]:text-neutral-100"
          >
            <Link href='/dashboard'>
            <LayoutDashboardIcon size={16} className="opacity-60 transition-opacity group-data-[highlighted]:opacity-100" />
            <span className="transition-colors">Dashboard</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleSignOut}
          className="group cursor-pointer
                     data-[highlighted]:bg-neutral-100 data-[highlighted]:text-neutral-900
                     dark:data-[highlighted]:bg-neutral-800 dark:data-[highlighted]:text-neutral-100"
        >
          <LogOutIcon size={16} className="opacity-60 transition-opacity group-data-[highlighted]:opacity-100" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
