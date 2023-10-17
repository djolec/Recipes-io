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
      <div className="flex w-full flex-col gap-4">
        <div className="mx-auto flex w-[80%] flex-row">
          {meals.map((meal) => {
            return (
              <button
                key={meal}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedMeal(e.target.textContent);
                }}
                className={`transition-color grow border-b-2 py-2 text-sm text-[var(--text)] duration-150 hover:bg-[var(--badge-btn-hover)] lg:text-[16px] 2xl:text-2xl ${
                  selectedMeal === meal ? "border-b-orange-600" : null
                }`}
              >
                {meal}
              </button>
            );
          })}
        </div>
        <div className="mx-auto mt-4 flex h-[200px] w-[80%] flex-row items-center justify-center text-2xl font-semibold 2xl:h-[300px]">
          <div className="text-[var(--text)] 2xl:text-4xl">{error.message}</div>
        </div>
        <Link className="mx-auto" to={`/${selectedMeal}`}>
          <button
            onClick={() => {
              handleClearFilters();
              setPageSelected("Recipes");
              setMeal([selectedMeal]);
            }}
            className="transition-color w-48 rounded-full bg-[var(--primary-container)] py-2 text-[var(--text)] duration-150 hover:bg-[var(--badge-btn-hover)] "
          >
            Show more
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4 font-dm-sans">
      <div className="mx-auto flex w-full flex-row lg:w-[80%]">
        {meals.map((meal) => {
          return (
            <button
              key={meal}
              onClick={(e) => {
                e.preventDefault();
                setSelectedMeal(e.target.textContent);
              }}
              className={`transition-color grow border-b-2 py-2 text-sm text-[var(--text)] duration-150 hover:bg-[var(--badge-btn-hover)] lg:text-[16px] 2xl:text-2xl ${
                selectedMeal === meal ? "border-b-orange-600" : null
              }`}
            >
              {meal}
            </button>
          );
        })}
      </div>
      <ul className="mx-auto mt-4 grid w-full grid-cols-card gap-2 lg:w-[80%] 2xl:grid-cols-cardBig 2xl:gap-4">
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
          className="transition-color w-full rounded-full bg-[var(--primary-container)] py-2 text-[var(--text)] duration-150 hover:bg-[var(--badge-btn-hover)] lg:w-48 2xl:w-72  2xl:text-2xl "
        >
          Show more
        </button>
      </Link>
    </div>
  );
};

export default MealTabs;
