import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { ReactComponent as LogoLight } from "../img/logo-light.svg";
import { ReactComponent as LogoDark } from "../img/logo-dark.svg";
import { ReactComponent as Edamam } from "../img/edamam.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  const { darkMode } = useContext(AppContext);

  return (
    <div className="mb-[94px] flex w-full flex-col items-center justify-between border-t-[1px] border-t-[var(--outline)] bg-[var(--primary-bg)] px-8 py-6 transition-colors duration-150 lg:mb-0 lg:flex-row 2xl:h-28">
      <h3 className="w-52 text-center text-[var(--text)] lg:text-left 2xl:text-xl">
        Copyright&copy; DC
      </h3>
      <Link className="hidden w-36 lg:block lg:w-40 2xl:w-52" to={"/"}>
        {darkMode && <LogoDark className="h-auto w-full cursor-pointer" />}
        {!darkMode && <LogoLight className="h-auto w-full cursor-pointer" />}
      </Link>
      <a href="https://www.edamam.com/" target="_blank">
        <Edamam className="w-52 cursor-pointer 2xl:h-24" />
      </a>
    </div>
  );
};

export default Footer;
