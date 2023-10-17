import React from "react";

const SkeletonMain = () => {
  return (
    <li className="flex animate-pulse flex-col justify-between gap-8 overflow-hidden rounded-md">
      <div className="flex flex-col gap-4">
        <div className="aspect-square w-full rounded-md bg-gray-500"></div>
        <div className="mx-1 h-4 w-[60%] bg-gray-500"></div>
      </div>
      <div className="mx-1 h-4 w-[80%] bg-gray-500"></div>
    </li>
  );
};

export default SkeletonMain;
