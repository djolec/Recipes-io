import React from "react";
import { GiKnifeFork } from "react-icons/gi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { AppContext } from "../App";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";

const SearchRecipe = () => {
  const {
    inputValue,
    setInputValue,
    setPageSelected,
    handleKeyPress,
    handleClearExceptInput
  } = useContext(AppContext);

  const searchRef = useRef();

  return (
    <div className="lg:min-w-[50%] w-[90%] lg:w-auto relative">
      <input
      value={inputValue}
        onKeyDown={(e) => handleKeyPress(e, searchRef)}
        onChange={(e) => setInputValue(e.target.value)}
        className="bg-[var(--primary-container)] text-[var(--text)] transition-color duration-150 w-full h-12 2xl:h-16 rounded-md pl-12 2xl:pl-20 pr-24 text-xl 2xl:text-2xl outline-none caret-[var(--text)]"
        type="text"
      />
      <GiKnifeFork className="text-[var(--text)] transition-color duration-150 p-2 w-auto h-full absolute top-0 left-0" />

      <Link to={`/${inputValue}`}>
        <button
          ref={searchRef}
          onClick={() => {
            handleClearExceptInput()
            setPageSelected("Recipes");
          }}
          className="rounded-md absolute top-1/2 right-1 bg-[var(--orange)] hover:bg-[var(--orange-hover)] transition-colors duration-150 px-7 2xl:px-9 h-10 2xl:h-14 -translate-y-1/2"
        >
          <FaMagnifyingGlass className="fill-white h-6 w-auto" />
        </button>
      </Link>
    </div>
  );
};

export default SearchRecipe;
