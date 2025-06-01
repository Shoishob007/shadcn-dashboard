import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useRoleStore from "@/stores/roleStore/useRoleStore";

import {
  ChevronDownIcon,
  KeyRound,
  LogOutIcon,
  Ticket,
  UserCog,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfileAvater() {
  const { currentRole, setRole } = useRoleStore();
  const { status, data: session } = useSession();
  //   console.log("Session data: ", session);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage
              src="/applicant.png"
              width={40}
              height={40}
              alt="Profile image"
            />
            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
          <ChevronDownIcon
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {session?.user?.name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {session?.user?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center gap-1.5">
            <UserCog className="h-4 w-4 text-gray-800 dark:text-gray-300" />
            <Link
              href={`${
                currentRole === "organization"
                  ? "/profile-settings"
                  : "/profile-demo"
              }`}
            >
              {currentRole === "organization"
                ? "View Profile Settings"
                : "View Profile"}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {currentRole === "organization" && (
            <DropdownMenuItem className="flex items-center gap-1.5">
              <KeyRound className="h-4 w-4 text-gray-800 dark:text-gray-300" />
              <Link
                href={`${
                  currentRole === "organization"
                    ? "/profile-settings/password"
                    : null
                }`}
              >
                Change password
              </Link>
            </DropdownMenuItem>
          )}
          {currentRole === "organization" && (
            <DropdownMenuItem className="flex items-center gap-1.5">
              <Ticket className="h-4 w-4 text-gray-800 dark:text-gray-300" />
              <Link href="/Billings/pricing">Try Enterprize</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut();
          }}
          disabled={status === "unauthenticated"}
          className="flex items-center gap-1.5 cursor-pointer"
        >
          <LogOutIcon
            disabled={status === "unauthenticated"}
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
