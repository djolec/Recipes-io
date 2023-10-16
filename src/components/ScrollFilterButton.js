import React from "react";
import { useState, useEffect } from "react";
import { MdFilterList } from "react-icons/md";

const ScrollFilterButton = ({ setFilterOpen }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
      <div>
        <button
          onClick={() => setFilterOpen(true)}
          className={`bg-[var(--primary-container)] z-30 fixed bottom-36 right-4 text-[var(--text)] transition-colors duration-150 flex flex-row gap-3 items-center rounded-md px-4 py-2 lg:hidden ${
            isVisible ? "visible" : "hidden"
          }`}
        >
          <MdFilterList />
          <h1>Filters</h1>
        </button>
      </div>
  );
};

export default ScrollFilterButton;
