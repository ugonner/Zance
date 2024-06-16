import React from "react";

const GridContainer = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`grid grid-cols-4 gap-8 lg:mx-0 lg:grid-cols-12 lg:gap-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default GridContainer;
