import React from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

const HealthPrefButton = ({ pref }) => {
  const { setHealth, setPageSelected, handleClearFilters } =
    useContext(AppContext);

  return (
    <button
      onClick={() => {
        handleClearFilters();
        setHealth([pref]);
        setPageSelected("Recipes");
      }}
      className="rounded-full bg-[var(--badge-btn)] px-4 py-2 font-dm-sans text-sm text-[var(--text)] transition-colors duration-300 hover:bg-[var(--badge-btn-hover)] 2xl:text-2xl"
    >
      <Link to={`/${pref}`} className="h-full w-full">
        {pref}
      </Link>
    </button>
  );
};

export default HealthPrefButton;
