import { cn } from "@/lib/utils";
import React from "react";

const Description = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-[14px] font-medium leading-5 lg:text-[18px] lg:leading-7",
        className,
      )}
    >
      {children}
    </p>
  );
};

export default Description;
