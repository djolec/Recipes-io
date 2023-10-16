import React, { useEffect, useState, useRef, useContext } from "react";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";
import { AppContext } from "../App";

const optionArr = [
  "Alcohol-Cocktail",
  "Alcohol-Free",
  "Celery-Free",
  "Crustacean-Free",
  "Dairy-Free",
  "DASH",
  "Egg-Free",
  "Fish-Free",
  "Fodmap-Free",
  "Gluten-Free",
  "Immuno-Supportive",
  "Keto-Friendly",
  "Kidney-Friendly",
  "Kosher",
  "Low-Potassium",
  "Low-Sugar",
  "Lupine-Free",
  "Mediterranean",
  "Mollusk-Free",
  "Mustard-Free",
  "No-Oil-Added",
  "Paleo",
  "Peanut-Free",
  "Pescatarian",
  "Pork-Free",
  "Red-Meat-Free",
  "Sesame-Free",
  "Shellfish-Free",
  "Soy-Free",
  "Sugar-Conscious",
  "Sulfite-Free",
  "Tree-Nut-Free",
  "Vegan",
  "Vegetarian",
  "Wheat-Free",
];

const Health = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { health, setHealth } = useContext(AppContext)

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
    health.includes(e.target.value)
      ? setHealth(
          health.filter((option) => option !== e.target.value)
        )
      : setHealth([...health, e.target.value]);
  };

  return (
    <div className="text-[var(--text)] lg:text-sm text-base flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? "bg-[var(--badge-btn-hover)]" : null} cursor-pointer hover:bg-[var(--badge-btn-hover)] flex flex-row items-center justify-between py-3 lg:py-1 px-4`}
      >
        <div className="flex flex-row items-center gap-4">
          <MdOutlineHealthAndSafety className="h-7 lg:h-6 w-auto transition-colors duration-150" />
          <span className="transition-colors duration-150">Health</span>
          {health.length ? (
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
        className="flex flex-row flex-wrap overflow-hidden transition-height duration-150"
      >
        <form
          ref={formRef}
          className="rounded-md flex flex-row py-3 flex-wrap gap-2 px-4"
        >
          {optionArr.map((option) => {
            return (
              <label
                className={`${
                  health.includes(option) ? "bg-[var(--badge-btn)]" : null
                } cursor-pointer px-2 py-1 border-[1px] border-[var(--outline)] rounded-md`}
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

export default Health;
