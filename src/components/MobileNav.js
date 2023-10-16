import React from "react";
import { MdHome } from "react-icons/md";
import { HiOutlineBookmarkAlt } from "react-icons/hi";
import { LiaHamburgerSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";

const MobileNav = () => {
  const { handleClearFilters, setDiet, pageSelected } = useContext(AppContext);

  return (
    <div className="text-[var(--text)] transition-colors duration-150 border-t-[1px] border-t-[var(--outline)] z-10 h-24 w-full lg:hidden fixed bottom-0 bg-[var(--primary-container)] flex flex-row justify-between items-center px-8">
      <Link to={"/Balanced"}>
        <button
          onClick={() => {
            handleClearFilters();
            setDiet(["Balanced"]);
          }}
          className="flex flex-col justify-center items-center py-1 px-3"
        >
          <div
            className={`flex flex-row justify-center items-center h-10 w-auto py-2 px-4 rounded-2xl ${
              pageSelected === "Recipes" ? "bg-[var(--badge-btn-hover)]" : null
            }`}
          >
            <LiaHamburgerSolid className="h-8 w-auto " />
          </div>
          <span>Recipes</span>
        </button>
      </Link>
      <Link to={"/"}>
        <button className="flex flex-col justify-center items-center">
          <div
            className={`flex flex-row justify-center items-center h-10 w-auto py-2 px-4 rounded-2xl ${
              pageSelected === "Home" ? "bg-[var(--badge-btn-hover)]" : null
            }`}
          >
            <MdHome className="h-8 w-auto " />
          </div>
          <span>Home</span>
        </button>
      </Link>
      <Link to={"/savedRecipes"}>
        <button className="flex flex-col justify-center items-center">
          <div
            className={`flex flex-row justify-center items-center h-10 w-auto py-2 px-4 rounded-2xl ${
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
