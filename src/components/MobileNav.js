import React from "react";
import { MdHome } from "react-icons/md";
import { HiOutlineBookmarkAlt } from "react-icons/hi";
import { LiaHamburgerSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";

const MobileNav = () => {
  const { pageSelected } = useContext(AppContext);

  return (
    <div className="fixed bottom-0 z-10 flex h-24 w-full flex-row items-center justify-between border-t-[1px] border-t-[var(--outline)] bg-[var(--primary-container)] px-8 text-[var(--text)] transition-colors duration-150 lg:hidden">
      <Link to={"/Balanced"}>
        <button className="flex flex-col items-center justify-center px-3 py-1">
          <div
            className={`flex h-10 w-auto flex-row items-center justify-center rounded-2xl px-4 py-2 ${
              pageSelected === "Recipes" ? "bg-[var(--badge-btn-hover)]" : null
            }`}
          >
            <LiaHamburgerSolid className="h-8 w-auto " />
          </div>
          <span>Recipes</span>
        </button>
      </Link>
      <Link to={"/"}>
        <button className="flex flex-col items-center justify-center">
          <div
            className={`flex h-10 w-auto flex-row items-center justify-center rounded-2xl px-4 py-2 ${
              pageSelected === "Home" ? "bg-[var(--badge-btn-hover)]" : null
            }`}
          >
            <MdHome className="h-8 w-auto " />
          </div>
          <span>Home</span>
        </button>
      </Link>
      <Link to={"/savedRecipes"}>
        <button className="flex flex-col items-center justify-center">
          <div
            className={`flex h-10 w-auto flex-row items-center justify-center rounded-2xl px-4 py-2 ${
              pageSelected === "Saved" ? "bg-[var(--badge-btn-hover)]" : null
            }`}
          >
            <HiOutlineBookmarkAlt className="h-8 w-auto " />
          </div>
          <span>Saved</span>
        </button>
      </Link>
    </div>
  );
};

export default MobileNav;
