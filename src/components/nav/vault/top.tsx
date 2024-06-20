"use client";

import User from "~/components/icons/user";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import Search from "~/components/icons/search";

const TopBar = () => {
  return (
    <div className="flex h-20 items-center justify-between gap-4 p-4">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 stroke-muted-foreground" />
        <Input className="max-w-96 pl-8" placeholder="Search everything..." />
      </div>
      <div className="flex h-full items-center rounded-full">
        <Avatar className="h-10 w-10 cursor-pointer border">
          <AvatarImage alt="profile" src="/logo192.png" />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default TopBar;
