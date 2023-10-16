import React, { useState, useRef, useEffect, useContext } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { MdOutlineEnergySavingsLeaf } from "react-icons/md";
import { AppContext } from "../App";

const optionArr = [
  "< 50 calories",
  "50 - 100 calories",
  "100 - 200 calories",
  "200 - 300 calories",
  "300 - 400 calories",
  "400 - 500 calories",
  "> 500 calories",
];

const Calories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { calories, setCalories, darkMode } = useContext(AppContext);

  const buttonRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const form = formRef.current;

    if (button && form) {
      button.style.height = isOpen ? `${form.clientHeight}px` : "0";
    }
  }, [isOpen]);

  const handleOptionChange = (e) => {
    calories.includes(e.target.value)
      ? setCalories([])
      : setCalories([e.target.value]);
  };

  return (
    <div className="text-[var(--text)] lg:text-sm text-base flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? "bg-[var(--badge-btn-hover)]" : null} cursor-pointer hover:bg-[var(--badge-btn-hover)] flex flex-row items-center justify-between py-3 lg:py-1 px-4`}
      >
        <div className="flex flex-row items-center gap-3">
          <MdOutlineEnergySavingsLeaf className="h-7 lg:h-6 w-auto transition-colors duration-150" />
          <span className="transition-colors duration-150">Calories</span>
          {calories.length ? (
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
          ) : null}
        </div>
        <div className="h-8 w-8 flex flex-row justify-center items-center">
          <FaChevronDown
            className={`h-4 lg:h-3 w-auto transition-all duration-150 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </button>
      <button
        ref={buttonRef}
        className="flex flex-row flex-wrap overflow-hidden transition-height"
      >
        <form
          ref={formRef}
          className="rounded-md flex flex-row py-3 flex-wrap gap-2 px-4"
        >
          {optionArr.map((option) => {
            return (
              <label
                className={`${
                  calories.includes(option) ? "bg-[var(--badge-btn)]" : null
                } cursor-pointer px-2 py-1 border-[1px] border-[var(--outline)] rounded-md`}
                htmlFor={option}
                key={option}
              >
                <input
                  checked={calories.includes(option)}
                  className="hidden"
                  type="checkbox"
                  name={option}
                  id={option}
                  value={option}
                  onChange={handleOptionChange}
                />
                {option}
              </label>
            );
          })}
        </form>
      </button>
    </div>
  );
};

export default Calories;
