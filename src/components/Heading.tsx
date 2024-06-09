import { cn } from "@/lib/utils";
import React from "react";

const Heading = ({
  children = "",
  type = "primary",
  className = "",
}: {
  children?: React.ReactNode;
  type?: "primary" | "secondary";
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "font-bold",
        type === "primary"
          ? "text-4xl leading-[44px] tracking-tighter lg:text-[58px] lg:leading-[64px]"
          : "text-2xl leading-8 lg:text-[32px] lg:leading-10",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export default Heading;
