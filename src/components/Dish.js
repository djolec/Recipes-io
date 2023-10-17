import React, { useEffect, useState, useRef, useContext } from "react";
import { BiDish } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa6";
import { AppContext } from "../App";

const optionArr = [
  "Biscuits and cookies",
  "Bread",
  "Cereals",
  "Condiments and sauces",
  "Desserts",
  "Drinks",
  "Main course",
  "Pancake",
  "Preps",
  "Preserve",
  "Salad",
  "Sandwiches",
  "Side dish",
  "Soup",
  "Starter",
  "Sweets",
];

const Dish = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { dish, setDish } = useContext(AppContext);

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
    dish.includes(e.target.value)
      ? setDish(dish.filter((option) => option !== e.target.value))
      : setDish([...dish, e.target.value]);
  };

  return (
    <div className="flex flex-col text-base text-[var(--text)] lg:text-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? "bg-[var(--badge-btn-hover)]" : null
        } flex cursor-pointer flex-row items-center justify-between px-4 py-3 hover:bg-[var(--badge-btn-hover)] lg:py-1 2xl:py-3`}
      >
        <div className="flex flex-row items-center gap-4">
          <BiDish className="h-7 w-auto transition-colors duration-150 lg:h-6 2xl:h-9" />
          <span className="transition-colors duration-150 2xl:text-xl">
            Dish
          </span>
          {dish.length ? (
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
          ) : null}
        </div>
        <div className="flex h-8 w-8 flex-row items-center justify-center">
          <FaChevronDown
            className={`h-4 w-auto transition-all duration-150 lg:h-3 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </button>
      <button
        ref={buttonRef}
        className="flex flex-row flex-wrap overflow-hidden transition-height duration-150"
      >
        <form
          ref={formRef}
          className="flex flex-row flex-wrap gap-2 rounded-md px-4 py-3"
        >
          {optionArr.map((option) => {
            return (
              <label
                className={`${
                  dish.includes(option) ? "bg-[var(--badge-btn)]" : null
                } cursor-pointer rounded-md border-[1px] border-[var(--outline)] px-2 py-1 2xl:text-lg`}
                htmlFor={option}
                key={option}
              >
                <input
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

export default Dish;
