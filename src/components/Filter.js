import React, { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from "../App";
import CookingTime from "./CookingTime";
import Ingredients from "./Ingredients";
import Calories from "./Calories";
import Diet from "./Diet";
import Health from "./Health";
import Meal from "./Meal";
import Dish from "./Dish";
import Cuisine from "./Cuisine";
import { MdFilterList } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

const Filter = ({
  filterOpen,
  setFilterOpen,
  applyDisabled,
  setApplyDisabled,
  refetch,
  filterNumber,
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const applyRef = useRef();

  const {
    handleScrollToTop,
    handleKeyPress,
    handleClearFilters,
    inputValue,
    setInputValue,
    isMobileView,
  } = useContext(AppContext);

  const queryClient = useQueryClient();

  useEffect(() => {
    isMobileView ? setFilterOpen(false) : setFilterOpen(true);
  }, [isMobileView]);

  useEffect(() => {
    filterNumber > 0 || inputValue
      ? setApplyDisabled(false)
      : setApplyDisabled(true);
  }, [filterNumber, []]);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <>
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              className="origin-right font-dm-sans lg:text-sm text-base scrollbar-hide border-r-[1px] border-r-[var(--outline)] fixed lg:fixed z-40 lg:top-16 pb-[180px] left-0 top-0 w-full lg:w-[300px] h-full bg-[var(--primary-bg)] transition-colors duration-150 overflow-y-auto"
            >
              <div className="flex flex-row items-center justify-between px-4 lg:py-1 py-6">
                <div className="text-[var(--text)] transition-colors duration-150 flex flex-row gap-2 items-center">
                  <MdFilterList className="h-6 w-auto" />
                  <h1>Filters</h1>
                  <div className="text-white rounded-full bg-red-500 h-6 w-6 text-xs flex flex-row justify-center items-center">
                    {filterNumber}
                  </div>
                </div>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="md:hidden h-8 w-8 hover:bg-[var(--badge-btn-hover)] text-[var(--text)] transition-colors duration-150 rounded-full flex flex-row justify-center items-center"
                >
                  <AiOutlineClose className="h-5 w-auto transition-colors duration-150" />
                </button>
              </div>
              <div className="w-full px-4 my-2">
                <div className="relative w-full mx-auto flex flex-row justify-center">
                  <label
                    className={`text-[var(--text)] absolute transition-all duration-150 bg-[var(--primary-bg)] lg:text-sm text-base left-4 ${
                      isInputFocused || inputValue
                        ? "-top-3 text-sm z-40 px-[2px] text-orange-600"
                        : "top-1/2 -translate-y-1/2"
                    }`}
                    htmlFor="searchRecipe"
                  >
                    Search
                  </label>
                  <input
                    onKeyDown={(e) => handleKeyPress(e, applyRef)}
                    className={`bg-[var(--primary-bg)] caret-[var(--text)] text-[var(--text)] w-full transition-colors duration-150 lg:h-10 h-14 px-2 outline-none rounded-md ${
                      isInputFocused || inputValue
                        ? "border-2 border-orange-600"
                        : "border-2 border-[var(--outline)]"
                    }`}
                    autoComplete="off"
                    value={inputValue}
                    type="search"
                    id="searchRecipe"
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
              </div>
              <CookingTime />
              <Ingredients />
              <Calories />
              <Diet />
              <Health />
              <Meal />
              <Dish />
              <Cuisine />
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              className="origin-right font-dm-sans w-full lg:w-[300px] h-[100px] lg:h-[70px] border-r-[1px] border-r-[var(--outline)] bg-[var(--primary-bg)] transition-colors duration-150 flex flex-row gap-3 justify-center items-center fixed z-50 bottom-0 left-0"
            >
              <button
                title="Clear all filters"
                onClick={handleClearFilters}
                className="rounded-md px-14 lg:px-10 py-2 text-[var(--text)] bg-[var(--primary-container)] hover:bg-[var(--badge-btn-hover)] transition-colors duration-150"
              >
                Clear
              </button>
              <button
                ref={applyRef}
                className={`text-white transition-colors duration-150 rounded-md px-14 lg:px-10 py-2  ${
                  applyDisabled
                    ? "bg-gray-300"
                    : "bg-[var(--orange)] hover:bg-[var(--orange-hover)]"
                }`}
                title="Add some filters to enable the button"
                disabled={applyDisabled}
                onClick={() => {
                  queryClient.removeQueries(["filtered"]);
                  refetch();
                  handleScrollToTop();
                  if(isMobileView) {
                    setFilterOpen(false)
                  }
                }}
              >
                Apply
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Filter;
