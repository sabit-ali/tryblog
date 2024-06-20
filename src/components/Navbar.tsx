"use client"

import React, { useState } from "react";
import { cn } from "@/app/utils/cn";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { ModeToggle } from "./modeToggle";
import { User } from "next-auth";
import Link from "next/link";
import { Button } from "./ui/button";
import { SheetDemo } from "./Sheet";
import { useSession, signOut } from "next-auth/react";
export function Navbar({ className }: { className?: string }) {


  const [active, setActive] = useState<string | null>(null);
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 h-14 justify-center items-center ", className)}
    >
      <Menu setActive={setActive}>
        <Link href={'/'}>
          <MenuItem setActive={setActive} active={active} item="Home" />
        </Link>
        <MenuItem setActive={setActive} active={active} item="content">
          <div className="flex flex-col space-y-4 text-sm w-24 items-center">
            <HoveredLink href='/create-blog'>Blog</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="profile">
          <div className="flex flex-col space-y-4 text-sm w-24 items-center">
            {session ? (
              <Button className="dark:bg-black dark:text-white bg-white text-black w-4 h-4" onClick={() => signOut()}>logout</Button>
            ) : (
              <Link href={'/sign-in'}>
                <Button className="dark:bg-black dark:text-white bg-white text-black w-4 h-4">Sign-in</Button>
              </Link>
            )}
          </div>
        </MenuItem>
        <div>
            {session && (
              <>
                <span className=" text-sm px-3 y-3 rounded-full text-green-600 border border-purple-500">Welcome,{ user.username}</span>
              </>
            )}
        </div>
        <div className="">
          <ModeToggle />
        </div>
      </Menu>
    </div>
  );
}


{/* <div className="flex items-end justify-center gap-5 top-5 absolute right-10 rounded-full">
<div className="">
  <ModeToggle />
</div>
{session ? (
  <Button onClick={() => signOut()}>logout</Button>
) : (
  <Link href={'/sign-up'}>
    <Button>Sign-up</Button>
  </Link>
)}
</div> */}