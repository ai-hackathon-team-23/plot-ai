"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { ListItem } from "@/components/ui/list-item";
import { Separator } from "@/components/ui/separator";
import { type Session } from "next-auth";
import { PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type Props = {
  session: Session;
};

const NavBar = ({ session }: Props) => {
  return (
    <nav className="  flex items-center justify-center align-middle">
      <div className="flex w-[80%] items-center justify-between h-full">
        <div className="flex h-full align-middle items-center justify-center cursor-pointer">
          <Link href="/">
          <p className="font-bold">plot-ai</p>
          </Link>
        </div>
        <NavigationMenu className="">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Avatar className="h-9 w-9  mt-2">
                  <AvatarImage
                    src={session ? session.user.image : null}
                    alt="profile"
                  />
                  <AvatarFallback>
                    <PersonIcon className="h-9 w-9 p-2" />
                  </AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-56 overflow-auto">
                <ul className="w-full">
                  <ListItem href="/" title="Profile">
                    {session ? session.user.email : null}
                  </ListItem>
                  <ListItem href="/models" title="Models" />
                  <Separator />
                  <ListItem
                    href={session ? "/api/auth/signout" : "/api/auth/signin"}
                    title={session ? "Sign out" : "Sign in"}
                  />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default NavBar;
