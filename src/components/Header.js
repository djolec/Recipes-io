import React from "react";
import { ReactComponent as LogoLight } from "../img/logo-light.svg";
import { ReactComponent as LogoDark } from "../img/logo-dark.svg";
import { FaRegMoon, FaRegSun } from "react-icons/fa6";
import { LuBookMarked } from "react-icons/lu";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { useContext } from "react";

const Header = () => {
  const { pageSelected, darkMode, setDarkMode } = useContext(AppContext);

  return (
    <header className="transition-color fixed z-10 flex h-16 w-full flex-row items-center justify-between border-b-[1px] border-b-[var(--outline)] bg-[var(--primary-bg)] px-4 font-dm-sans duration-150 lg:px-8 2xl:h-28">
      <Link to={"/"} className=" w-40 lg:w-56 2xl:w-72">
        <div>
          {darkMode && (
            <LogoDark className="h-auto w-36 cursor-pointer lg:w-40 2xl:w-52" />
          )}
          {!darkMode && (
            <LogoLight className="h-auto w-36 cursor-pointer lg:w-40 2xl:w-52" />
          )}
        </div>
      </Link>
      <div className="hidden h-full w-48 flex-row justify-center lg:flex">
        <Link className="h-full outline-none" to={"/"}>
          <button
            className={`transition-color h-full w-36 font-semibold text-[var(--text)] duration-150 hover:bg-[var(--badge-btn-hover)] 2xl:text-2xl ${
              pageSelected === "Home" ? "border-b-2 border-b-orange-600" : null
            }`}
          >
            Home
          </button>
        </Link>
        <Link className="h-full outline-none" to={"/Balanced"}>
          <button
            className={`transition-color h-full w-32 font-semibold text-[var(--text)] duration-150 hover:bg-[var(--badge-btn-hover)] 2xl:text-2xl ${
              pageSelected === "Recipes"
                ? "border-b-2 border-b-orange-600"
                : null
            }`}
          >
            Recipes
          </button>
        </Link>
      </div>
      <div className="flex w-40 flex-row items-center justify-end gap-0 lg:w-56 lg:gap-3 2xl:w-72">
        <div
          onClick={() => {
            setDarkMode(!darkMode);
            localStorage.setItem(
              "isDark",
              JSON.stringify(!JSON.parse(localStorage.getItem("isDark"))),
            );
          }}
          className="transition-color flex  h-11 w-11 flex-row items-center justify-center rounded-full bg-[var(--primary-container)] duration-150 hover:bg-[var(--badge-btn-hover)] "
        >
          {darkMode && (
            <FaRegSun
              style={{ fill: darkMode ? "#ffffff" : "#000000" }}
              className="transition-color h-auto w-6 cursor-pointer duration-150 2xl:w-8"
            />
          )}
          {!darkMode && (
            <FaRegMoon
              style={{ fill: darkMode ? "#ffffff" : "#000000" }}
              className="h-auto w-6 cursor-pointer py-1 2xl:w-8"
            />
          )}
        </div>
        <Link to={"/savedRecipes"}>
          <button className="transition-color hidden flex-row items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[var(--orange)] px-4 py-[10px] text-sm font-semibold text-white duration-150 hover:bg-[var(--orange-hover)] lg:flex 2xl:text-xl">
            <LuBookMarked className="h-4 w-auto 2xl:h-6" />{" "}
            <span>Saved Recipes</span>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
