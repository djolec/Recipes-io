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
              className="scrollbar-hide fixed left-0 top-0 z-40 h-full w-full origin-right overflow-y-auto border-r-[1px] border-r-[var(--outline)] bg-[var(--primary-bg)] pb-[180px] font-dm-sans text-base transition-colors duration-150 lg:fixed lg:top-16 lg:w-[300px] lg:text-sm 2xl:top-32 2xl:w-[400px]"
            >
              <div className="flex flex-row items-center justify-between px-4 py-6 lg:py-1">
                <div className="flex flex-row items-center gap-2 text-[var(--text)] transition-colors duration-150">
                  <MdFilterList className="h-6 w-auto 2xl:h-8" />
                  <h1 className="2xl:text-3xl">Filters</h1>
                  <div className="flex h-6 w-6 flex-row items-center justify-center rounded-full bg-red-500 text-xs text-white 2xl:h-8 2xl:w-8 2xl:text-lg">
                    {filterNumber}
                  </div>
                </div>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="flex h-8 w-8 flex-row items-center justify-center rounded-full text-[var(--text)] transition-colors duration-150 hover:bg-[var(--badge-btn-hover)] md:hidden 2xl:h-10 2xl:w-10"
                >
                  <AiOutlineClose className="h-5 w-auto transition-colors duration-150 2xl:h-7" />
                </button>
              </div>
              <div className="my-2 w-full px-4">
                <div className="relative mx-auto flex w-full flex-row justify-center">
                  <label
                    className={`absolute left-4 bg-[var(--primary-bg)] text-base text-[var(--text)] transition-all duration-150 lg:text-sm 2xl:text-lg ${
                      isInputFocused || inputValue
                        ? "-top-3 z-40 px-[2px] text-sm text-orange-600 2xl:text-base"
                        : "top-1/2 -translate-y-1/2"
                    }`}
                    htmlFor="searchRecipe"
                  >
                    Search
                  </label>
                  <input
                    onKeyDown={(e) => handleKeyPress(e, applyRef)}
                    className={`h-14 w-full rounded-md bg-[var(--primary-bg)] px-2 text-[var(--text)] caret-[var(--text)] outline-none transition-colors duration-150 lg:h-10 2xl:h-14 2xl:text-xl ${
                      isInputFocused || inputValue
                        ? "border-2 border-orange-600"
                        : "border-2 border-[var(--outline)]"
                    }`}
                    autoComplete="off"
                    value={inputValue}
                    type="text"
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
              className="fixed bottom-0 left-0 z-50 flex h-[100px] w-full origin-right flex-row items-center justify-center gap-3 border-r-[1px] border-r-[var(--outline)] bg-[var(--primary-bg)] font-dm-sans transition-colors duration-150 lg:h-[70px] lg:w-[300px] 2xl:h-[120px] 2xl:w-[400px]"
            >
              <button
                title="Clear all filters"
                onClick={handleClearFilters}
                className="rounded-md bg-[var(--primary-container)] px-14 py-2 text-[var(--text)] transition-colors duration-150 hover:bg-[var(--badge-btn-hover)] lg:px-10 2xl:text-2xl"
              >
                Clear
              </button>
              <button
                ref={applyRef}
                className={`rounded-md px-14 py-2 text-white transition-colors duration-150 lg:px-10 2xl:text-2xl  ${
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
                  if (isMobileView) {
                    setFilterOpen(false);
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
