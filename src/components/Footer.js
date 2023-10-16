import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { ReactComponent as LogoLight } from "../img/logo-light.svg";
import { ReactComponent as LogoDark } from "../img/logo-dark.svg";
import { ReactComponent as Edamam } from "../img/edamam.svg";
import { Link } from "react-router-dom";

const Footer = () => {

  const { darkMode } = useContext(AppContext)

  return (
    <div className="bg-[var(--primary-bg)] transition-colors duration-150 w-full py-6 px-8 mb-[94px] lg:mb-0 border-t-[1px] border-t-[var(--outline)] 2xl:h-28 flex flex-col lg:flex-row justify-between items-center">
      <h3 className="text-[var(--text)] 2xl:text-xl text-center w-52 lg:text-left">Copyright&copy; DC</h3>
      <Link className="hidden lg:block w-36 lg:w-40 2xl:w-52" to={"/"}>
      {darkMode && (
            <LogoDark className="cursor-pointer w-full h-auto" />
          )}
          {!darkMode && (
            <LogoLight className="cursor-pointer w-full h-auto" />
          )}
      </Link>
      <Edamam className="cursor-pointer w-52 2xl:h-24" />
    </div>
  );
};

export default Footer;
