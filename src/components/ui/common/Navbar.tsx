"use client";

import React, { useRef } from "react";
import Container from "../containers/Container";
import Logo from "./Logo";
import { Bell, Search } from "lucide-react";
import { Separator } from "../separator";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import ThemeToggler from "./ThemeToggler";
import PROFILE_MENU from "@/consts/ProfileMenu";
import Link from "next/link";

import { Input } from "../input";
import CreateEventDialog from "@/components/features/events/CreateEventDialog";

const Navbar = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchIconClick = () => {
    if (!searchInputRef.current) return;
    searchInputRef.current.focus();
  };

  return (
    <nav className="fixed z-40 w-full border-b bg-inherit px-4 py-0.5">
      <Container className="flex items-center justify-between gap-2 text-sm">
        {/* Right */}
        <Logo />

        {/* Mid */}
        <div className="relative hidden flex-[.8] items-center justify-center md:flex">
          <Search
            className="absolute left-4 cursor-pointer"
            size={20}
            strokeWidth={2.75}
            onClick={handleSearchIconClick}
          />
          <Input
            ref={searchInputRef}
            type="text"
            className="rounded-2xl pl-12"
            placeholder="Search Events"
          />
        </div>

        {/* Left */}
        <div className="flex h-10 items-center space-x-4">
          {/* Create Event */}
          <CreateEventDialog />

          <Separator orientation="vertical" className="hidden md:inline" />

          <Link href="#" className="hidden md:block">
            <Bell size={18} strokeWidth={2} />
          </Link>

          <Separator orientation="vertical" className="hidden md:inline" />

          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>NB</AvatarFallback>
                  </Avatar>
                  <p>Welcome</p>
                </div>
              </MenubarTrigger>

              <MenubarContent className="p-2 font-medium">
                <MenubarItem>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>NB</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col justify-center">
                      <p className="text-base font-semibold">
                        Nishan Budhathoki
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        nishanbudhathoki2266@gmail.com
                      </p>
                    </div>
                  </div>
                </MenubarItem>

                {PROFILE_MENU.map((menu, index) => {
                  if (menu.title === "Separator")
                    return (
                      <MenubarSeparator
                        key={`${menu.title} of index ${index}`}
                      />
                    );

                  if (menu.title === "Theme Toggler")
                    return (
                      <ThemeToggler
                        key={`${menu.title} of index ${index}`}
                        showInMenu
                      />
                    );

                  return (
                    <MenubarItem key={`${menu.title} of index ${index}`}>
                      <Link
                        href={menu.path ? menu.path : "#"}
                        className="flex items-center gap-2"
                      >
                        {menu.icon &&
                          React.cloneElement(menu.icon, {
                            className: "text-slate-700 dark:text-slate-200",
                            size: 20,
                          })}
                        {menu.title}
                      </Link>
                    </MenubarItem>
                  );
                })}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
