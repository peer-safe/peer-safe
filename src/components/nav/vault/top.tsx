"use client";

import User from "~/components/icons/user";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import Search from "~/components/icons/search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const { disconnect } = useDisconnect();
  const router = useRouter();

  return (
    <div className="flex h-20 items-center justify-between gap-4 p-4">
      <div className="relative w-full">
        <Search className=" absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full stroke-muted-foreground p-1.5 transition-colors hover:bg-muted" />
        <Input
          className="h-10 w-full max-w-[32rem] pl-12"
          placeholder="Search everything..."
        />
      </div>
      <div className="flex h-full items-center rounded-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-12 w-12 cursor-pointer border p-1">
              <AvatarImage alt="profile" src="/logo192.png" />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/vault/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Add</DropdownMenuItem>
              <DropdownMenuItem>Storage</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/vault/settings")}>
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/vault/requests")}>
                Requests
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() =>
                        navigator.clipboard.writeText(
                          "I just tried PeerSafe and its so cool! Try it for yourself at https://localhost:3000",
                        )
                      }
                    >
                      Email
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        navigator.clipboard.writeText(
                          "I just tried PeerSafe and its so cool! Try it for yourself at https://localhost:3000",
                        )
                      }
                    >
                      Copy to Clipboard
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                (window.location.href = "https://github.com/peer-safe")
              }
            >
              GitHub
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Pricing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => disconnect()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopBar;
