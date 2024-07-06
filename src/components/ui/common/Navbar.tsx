"use client";

import React from "react";
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
import Link from "next/link";

import { CircleUser, LogOut, UserRoundCog } from "lucide-react";

import { Input } from "../input";
import CreateEventDialog from "@/components/features/events/CreateEventDialog";

import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser, logout } from "@/store/reducers/authSlice";
import ROUTES from "@/consts/Routes";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/lib/cookies";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../button";
import { DEFAULT_IMAGE_PLACEHOLDER } from "@/consts/Users";

import ProfileSheet from "@/components/features/users/ProfileSheet";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const PROFILE_MENU = [
    {
      title: "Profile",
      icon: React.createElement(CircleUser),
      path: ROUTES.HOME,
    },
    {
      title: "Account settings",
      icon: React.createElement(UserRoundCog),
      path: ROUTES.HOME,
    },
    {
      title: "Separator",
    },
    {
      title: "Theme Toggler",
    },
    {
      title: "Separator",
    },
    {
      title: "Sign out",
      icon: React.createElement(LogOut),
      onClick: () => {
        dispatch(logout());
        deleteCookie("token", { path: "/" });
        router.push(ROUTES.AUTH);
      },
    },
  ];

  const loggedInUser = useSelector(getLoggedInUser);

  const email = loggedInUser?.email;

  const { fullname, profilePhoto } = loggedInUser?.profile || {
    profilePhoto: "",
    fullname: "",
  };

  const fallbackProfile =
    `${fullname?.split(" ")[0][0] + fullname?.split(" ")[1][0]}` || "U";

  // Since we are handling logout differently. We need some custom dialogs only in logout click
  const logoutMenu = PROFILE_MENU.find(
    (menu) => menu.title.toLowerCase() === "sign out",
  );

  // Also we need a sheet trigger while a user clicks profile
  const profileSheetTrigger = PROFILE_MENU.find(
    (menu) => menu.title.toLowerCase() === "profile",
  );

  return (
    <nav className="fixed z-40 w-full border-b bg-background px-4 py-0.5">
      <Container className="flex items-center justify-between gap-2 text-sm">
        {/* Right */}
        <Logo />

        {/* Mid */}
        <div className="relative hidden flex-[.8] items-center justify-center md:flex">
          <Search
            className="absolute left-4 cursor-pointer"
            size={20}
            strokeWidth={2.75}
          />
          <Input
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
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={
                      loggedInUser?.profile?.profilePhoto ||
                      DEFAULT_IMAGE_PLACEHOLDER
                    }
                  />
                  <AvatarFallback>{fallbackProfile}</AvatarFallback>
                </Avatar>
              </MenubarTrigger>

              <MenubarContent className="p-2 font-medium">
                <MenubarItem asChild>
                  <ProfileSheet
                    trigger={
                      <div className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 hover:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-gray-800 dark:hover:text-gray-50">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={profilePhoto || DEFAULT_IMAGE_PLACEHOLDER}
                          />
                          <AvatarFallback>{fallbackProfile}</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col justify-center">
                          <p className="text-base font-semibold">{fullname}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {email}
                          </p>
                        </div>
                      </div>
                    }
                  />
                </MenubarItem>

                <MenubarSeparator />

                {profileSheetTrigger && (
                  <MenubarItem asChild>
                    <ProfileSheet
                      trigger={
                        <div className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 hover:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-gray-800 dark:hover:text-gray-50">
                          {profileSheetTrigger.icon &&
                            React.cloneElement(profileSheetTrigger.icon, {
                              className: "text-slate-700 dark:text-slate-200",
                              size: 20,
                            })}
                          {profileSheetTrigger.title}
                        </div>
                      }
                    />
                  </MenubarItem>
                )}

                {PROFILE_MENU.map((menu, index) => {
                  // Since we are handling logout and profile link differently
                  if (
                    menu.title.toLowerCase() === "sign out" ||
                    menu.title.toLocaleLowerCase() === "profile"
                  )
                    return null;

                  if (menu.title.toLowerCase() === "separator")
                    return (
                      <MenubarSeparator
                        key={`${menu.title} of index ${index}`}
                      />
                    );

                  if (menu.title.toLowerCase() === "theme toggler")
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

                {logoutMenu && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        className="flex w-full items-center gap-2 text-sm text-gray-200"
                      >
                        {logoutMenu.icon &&
                          React.cloneElement(logoutMenu.icon, {
                            size: 20,
                          })}
                        {logoutMenu.title}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to sign out?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={logoutMenu.onClick}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
