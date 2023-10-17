import React from "react";
import MealTabCard from "./MealTabCard";
import SkeletonMain from "./SkeletonMain";
import { useFetchCuisine } from "../Hooks/useFetchRecipes";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { useContext, useEffect } from "react";

const FrenchCuisineTab = () => {
  const { setCuisine, setPageSelected, handleClearFilters } =
    useContext(AppContext);
  const { data, refetch, isLoading, error, isError } =
    useFetchCuisine("French");
  const numArr = Array.from({ length: 11 }, (_, index) => index + 1);
  const twelveCuisineCardsData = data?.data.hits.slice(0, 11);

  useEffect(() => {
    refetch();
    if (!isLoading) {
    }
  }, []);

  if (isError) {
    return (
      <div className="mx-auto mt-8 w-[80%] font-dm-sans">
        <h1 className="mx-auto w-full text-[26px] text-[var(--text)] transition-colors duration-150 2xl:text-4xl">
          Latest French Recipes
        </h1>
        <div className="flex h-[200px] w-full flex-row items-center justify-center text-2xl font-semibold text-[var(--text)] transition-colors duration-150 2xl:h-[300px] 2xl:text-4xl">
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 w-full font-dm-sans lg:w-[80%]">
      <h1 className="mx-auto w-full text-[26px] text-[var(--text)] transition-colors duration-150 2xl:text-4xl">
        Latest French Recipes
      </h1>
      <div className="scrollbar mx-auto w-full snap-x overflow-y-hidden overflow-x-scroll">
        <ul className="mt-4 grid min-w-[calc(600%+2.5rem)] grid-flow-col grid-cols-cuisineCard gap-2 whitespace-nowrap pb-4 lg:min-w-[200%] 2xl:gap-4">
          {!isLoading
            ? twelveCuisineCardsData.map((mealCard, index) => {
                return (
                  <MealTabCard
                    key={mealCard.recipe.label}
                    recipeInfo={mealCard}
                    animKey={index + 1}
                  />
                );
              })
            : numArr.map((num) => {
                return <SkeletonMain key={num} />;
              })}
          <Link to={"/French"}>
            <button
              onClick={() => {
                handleClearFilters();
                setCuisine(["French"]);
                setPageSelected("Recipes");
              }}
              className="h-full w-full rounded-md bg-[var(--primary-container)] text-[var(--text)] transition-colors duration-150 hover:bg-[var(--badge-btn-hover)]"
            >
              Show More &gt;
            </button>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default FrenchCuisineTab;
