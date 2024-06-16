import { CircleUser, LogOut, UserRoundCog } from "lucide-react";
import ROUTES from "./Routes";
import React from "react";

const PROFILE_MENU: {
  title: string;
  icon?: React.ReactElement;
  path?: string;
}[] = [
  {
    title: "Separator",
  },
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
    path: ROUTES.HOME,
  },
];

export default PROFILE_MENU;
