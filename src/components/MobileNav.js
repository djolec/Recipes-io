import React from "react";
import { MdHome } from "react-icons/md";
import { HiOutlineBookmarkAlt } from "react-icons/hi";
import { LiaHamburgerSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useContext } from "react";
import App, { AppContext } from "../App";

const MobileNav = () => {
  const { handleClearFilters, setDiet } = useContext(AppContext);

  return (
    <div className="text-[var(--text)] transition-colors duration-150 border-t-[1px] border-t-[var(--outline)] z-10 h-24 w-full lg:hidden fixed bottom-0 bg-[var(--primary-container)] flex flex-row justify-between items-center px-8">
      <Link to={"/Balanced"}>
        <button
          onClick={() => {
            handleClearFilters();
            setDiet(["Balanced"]);
          }}
          className="flex flex-col justify-center items-center"
        >
          <LiaHamburgerSolid className="h-8 w-auto " />
          <span>Recipes</span>
        </button>
      </Link>
      <Link to={"/"}>
        <button className="flex flex-col justify-center items-center">
          <MdHome className="h-8 w-auto " />
          <span>Home</span>
        </button>
      </Link>
      <Link to={"/savedRecipes"}>
        <button className="flex flex-col justify-center items-center">
          <HiOutlineBookmarkAlt className="h-8 w-auto " />
          <span>Saved</span>
        </button>
      </Link>
    </div>
  );
};

export default MobileNav;
