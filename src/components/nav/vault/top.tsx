"use client";

import { SearchIcon, User } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const TopBar = () => {
  return (
    <div className="flex h-20 items-center gap-4 p-4">
      <div className="relative flex flex-1 self-stretch">
        <div className="absolute bottom-0 left-2 top-0 flex items-center">
          <SearchIcon className="h-9 w-9 rounded-full p-2 hover:bg-muted" />
        </div>
        <Input
          className="h-full max-w-[32rem] pl-12"
          placeholder="Search everything..."
        />
      </div>
      <div className="flex h-full items-center rounded-full">
        <Avatar className="h-12 w-12 cursor-pointer border">
          <AvatarImage alt="profile" src="profile image src" />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default TopBar;
