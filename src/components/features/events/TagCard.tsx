import Description from "@/components/ui/common/Description";
import React from "react";

const TagCard = ({ tag }: { tag: string }) => {
  return (
    <Description className="rounded-sm bg-gray-200 px-3 py-1 capitalize dark:bg-gray-800">
      {tag}
    </Description>
  );
};

export default TagCard;
