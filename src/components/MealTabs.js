import React from "react";
import MealTabCard from "./MealTabCard";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { useContext } from "react";
import { useFetchMeals } from "../Hooks/useFetchRecipes";
import SkeletonMain from "./SkeletonMain";

const MealTabs = () => {
  const {
    setMeal,
    setPageSelected,
    selectedMeal,
    setSelectedMeal,
    handleClearFilters,
  } = useContext(AppContext);
  const { data, refetch, isLoading, isError, error } =
    useFetchMeals(selectedMeal);
  const numArr = Array.from({ length: 12 }, (_, index) => index + 1);

  useEffect(() => {
    refetch();
  }, [selectedMeal]);

  const twelveTabCardsData = data?.data.hits.slice(0, 12);

  const meals = ["Breakfast", "Lunch", "Dinner", "Snack", "Teatime"];

  if (isError) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="w-[80%] flex flex-row mx-auto">
          {meals.map((meal) => {
            return (
              <button
                key={meal}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedMeal(e.target.textContent);
                }}
                className={`text-[var(--text)] text-sm 2xl:text-2xl lg:text-[16px] py-2 hover:bg-[var(--badge-btn-hover)] transition-color duration-150 border-b-2 grow ${
                  selectedMeal === meal ? "border-b-orange-600" : null
                }`}
              >
                {meal}
              </button>
            );
          })}
        </div>
        <div className="text-2xl font-semibold w-[80%] mx-auto h-[200px] 2xl:h-[300px] flex flex-row justify-center items-center mt-4">
          <div className="text-[var(--text)] 2xl:text-4xl">{error.message}</div>
        </div>
        <Link className="mx-auto" to={`/${selectedMeal}`}>
          <button
            onClick={() => {
              handleClearFilters();
              setPageSelected("Recipes");
              setMeal([selectedMeal]);
            }}
            className="w-48 py-2 bg-[var(--primary-container)] hover:bg-[var(--badge-btn-hover)] transition-color duration-150 text-[var(--text)] rounded-full "
          >
            Show more
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 font-dm-sans">
      <div className="w-full lg:w-[80%] flex flex-row mx-auto">
        {meals.map((meal) => {
          return (
            <button
              key={meal}
              onClick={(e) => {
                e.preventDefault();
                setSelectedMeal(e.target.textContent);
              }}
              className={`text-[var(--text)] text-sm 2xl:text-2xl lg:text-[16px] transition-color duration-150 py-2 hover:bg-[var(--badge-btn-hover)] border-b-2 grow ${
                selectedMeal === meal ? "border-b-orange-600" : null
              }`}
            >
              {meal}
            </button>
          );
        })}
      </div>
      <ul className="lg:w-[80%] w-full mx-auto grid grid-cols-card 2xl:grid-cols-cardBig gap-2 2xl:gap-4 mt-4">
        {!isLoading
          ? twelveTabCardsData.map((mealCard, index) => {
              return (
                <MealTabCard
                  key={mealCard.recipe.label}
                  recipeInfo={mealCard}
                  // finalKey={(i * 20) + index + 1}
                  animKey={index + 1}
                />
              );
            })
          : numArr.map((num) => {
              return <SkeletonMain key={num} />;
            })}
      </ul>
      <Link className="mx-auto w-full text-center" to={`/${selectedMeal}`}>
        <button
          onClick={() => {
            handleClearFilters();
            setPageSelected("Recipes");
            setMeal([selectedMeal]);
          }}
          className="w-full lg:w-48 2xl:w-72 2xl:text-2xl py-2 bg-[var(--primary-container)] hover:bg-[var(--badge-btn-hover)] transition-color duration-150 text-[var(--text)]  rounded-full "
        >
          Show more
        </button>
      </Link>
    </div>
  );
};

export default MealTabs;
