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
        className={`fixed bottom-36 right-4 z-30 flex flex-row items-center gap-3 rounded-md bg-[var(--primary-container)] px-4 py-2 text-[var(--text)] transition-colors duration-150 lg:hidden ${
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
