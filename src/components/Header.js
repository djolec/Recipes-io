import React from "react";
import { ReactComponent as LogoLight } from "../img/logo-light.svg";
import { ReactComponent as LogoDark } from "../img/logo-dark.svg";
import { FaRegMoon, FaRegSun } from "react-icons/fa6";
import { LuBookMarked } from "react-icons/lu";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { useContext } from "react";

const Header = () => {
  const { pageSelected, darkMode, setDarkMode } =
    useContext(AppContext);

  return (
    <header className="font-dm-sans fixed h-16 2xl:h-28 w-full bg-[var(--primary-bg)] transition-color duration-150 z-10 flex flex-row justify-between items-center px-4 lg:px-8 border-b-[1px] border-b-[var(--outline)]">
      <Link to={"/"} className=" lg:w-56 w-40 2xl:w-72">
        <div>
          {darkMode && (
            <LogoDark className="cursor-pointer w-36 lg:w-40 2xl:w-52 h-auto" />
          )}
          {!darkMode && (
            <LogoLight className="cursor-pointer w-36 lg:w-40 2xl:w-52 h-auto" />
          )}
        </div>
      </Link>
      <div className="w-48 h-full hidden lg:flex flex-row justify-center">
        <Link className="outline-none h-full" to={"/"}>
          <button
            className={`text-[var(--text)] transition-color 2xl:text-2xl duration-150 h-full w-36 font-semibold hover:bg-[var(--badge-btn-hover)] ${
              pageSelected === "Home" ? "border-b-orange-600 border-b-2" : null
            }`}
          >
            Home
          </button>
        </Link>
        <Link className="outline-none h-full" to={"/Balanced"}>
          <button
            className={`text-[var(--text)] 2xl:text-2xl transition-color duration-150 h-full w-32 font-semibold hover:bg-[var(--badge-btn-hover)] ${
              pageSelected === "Recipes"
                ? "border-b-orange-600 border-b-2"
                : null
            }`}
          >
            Recipes
          </button>
        </Link>
      </div>
      <div className="w-40 lg:w-56 2xl:w-72 flex flex-row justify-end gap-0 lg:gap-3 items-center">
        <div
          onClick={() => {
            setDarkMode(!darkMode);
            localStorage.setItem(
              "isDark",
              JSON.stringify(!JSON.parse(localStorage.getItem("isDark")))
            );
          }}
          className="w-11 h-11  flex flex-row justify-center items-center bg-[var(--primary-container)] hover:bg-[var(--badge-btn-hover)] transition-color duration-150 rounded-full "
        >
          {darkMode && (
            <FaRegSun
              style={{ fill: darkMode ? "#ffffff" : "#000000" }}
              className="w-6 2xl:w-8 h-auto cursor-pointer transition-color duration-150"
            />
          )}
          {!darkMode && (
            <FaRegMoon
              style={{ fill: darkMode ? "#ffffff" : "#000000" }}
              className="w-6 2xl:w-8 h-auto py-1 cursor-pointer"
            />
          )}
        </div>
        <Link to={"/savedRecipes"}>
          <button className="text-sm 2xl:text-xl bg-[var(--orange)] hover:bg-[var(--orange-hover)] transition-color duration-150 px-4 py-[10px] whitespace-nowrap rounded-md text-white font-semibold hidden lg:flex flex-row gap-2 items-center justify-center">
            <LuBookMarked className="h-4 2xl:h-6 w-auto" /> <span>Saved Recipes</span>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
