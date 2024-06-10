import Image from "next/image";
import React from "react";
import Heading from "./Heading";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Logo = ({ className = "" }: { className: string }) => {
  return (
    <Link
      href="/"
      className={cn("flex cursor-pointer items-center gap-2", className)}
    >
      <Image src="/logo.svg" height={48} width={48} alt="Zance Logo" />
      <Heading type="secondary">Zance</Heading>
    </Link>
  );
};

export default Logo;
