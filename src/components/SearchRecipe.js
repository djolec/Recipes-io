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
    handleClearExceptInput,
  } = useContext(AppContext);

  const searchRef = useRef();

  return (
    <div className="relative w-[90%] lg:w-auto lg:min-w-[50%]">
      <input
        value={inputValue}
        onKeyDown={(e) => handleKeyPress(e, searchRef)}
        onChange={(e) => setInputValue(e.target.value)}
        className="transition-color h-12 w-full rounded-md bg-[var(--primary-container)] pl-12 pr-24 text-xl text-[var(--text)] caret-[var(--text)] outline-none duration-150 2xl:h-16 2xl:pl-20 2xl:text-2xl"
        type="text"
        placeholder="Search recipe..."
      />
      <GiKnifeFork className="transition-color absolute left-0 top-0 h-full w-auto p-2 text-[var(--text)] duration-150" />

      <Link to={`/${inputValue}`}>
        <button
          ref={searchRef}
          onClick={() => {
            handleClearExceptInput();
            setPageSelected("Recipes");
          }}
          className="absolute right-1 top-1/2 h-10 -translate-y-1/2 rounded-md bg-[var(--orange)] px-7 transition-colors duration-150 hover:bg-[var(--orange-hover)] 2xl:h-14 2xl:px-9"
        >
          <FaMagnifyingGlass className="h-6 w-auto fill-white" />
        </button>
      </Link>
    </div>
  );
};

export default SearchRecipe;
