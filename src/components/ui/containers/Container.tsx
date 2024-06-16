import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
  className = "",
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("container", "mx-auto p-4", className)}>{children}</div>
  );
};

export default Container;
