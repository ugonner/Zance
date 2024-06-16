import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={cn("flex cursor-pointer items-center gap-2", className)}
    >
      <Image src="/logo.svg" height={32} width={32} alt="Zance Logo" />
      <h3 className="text-xl font-extrabold leading-8 tracking-tighter lg:text-2xl">
        Zance
      </h3>
    </Link>
  );
};

export default Logo;
