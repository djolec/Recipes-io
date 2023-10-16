import React from "react";

const SkeletonMain = () => {
  return (
    <li className="flex flex-col gap-8 justify-between rounded-md overflow-hidden animate-pulse">
      <div className="flex flex-col gap-4">
        <div className="aspect-square bg-gray-500 w-full rounded-md"></div>
        <div className="bg-gray-500 h-4 w-[60%] mx-1"></div>
      </div>
      <div className="bg-gray-500 h-4 w-[80%] mx-1"></div>
    </li>
  );
};

export default SkeletonMain;
