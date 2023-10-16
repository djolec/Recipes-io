import React, { useEffect } from "react";
import MealTabCard from "./MealTabCard";
import SkeletonMain from "./SkeletonMain";
import { useFetchCuisine } from "../Hooks/useFetchRecipes";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { useContext } from "react";

const AsianCuisineTab = () => {
  const { setCuisine, setPageSelected, handleClearFilters } = useContext(AppContext);
  const { data, refetch, isLoading, error, isError } = useFetchCuisine("Asian");
  const numArr = Array.from({ length: 11 }, (_, index) => index + 1);
  const elevenCuisineCardsData = data?.data.hits.slice(0, 11);

  useEffect(() => {
    refetch();
    if (!isLoading) {
    }
  }, []);

  if(isError) {
    return (
      <div className="w-[80%] mx-auto mt-8 font-dm-sans">
        <h1 className="text-[var(--text)] 2xl:text-4xl transition-colors duration-150 w-full mx-auto text-[26px]">Latest Asian Recipes</h1>
        <div className="text-[var(--text)] transition-colors duration-150 text-2xl 2xl:text-4xl font-semibold w-full flex flex-row justify-center items-center h-[200px] 2xl:h-[300px]">
          {error.message}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full lg:w-[80%] mx-auto mt-8 font-dm-sans">
      <h1 className="text-[var(--text)] 2xl:text-4xl transition-colors duration-150 w-full mx-auto text-[26px]">Latest Asian Recipes</h1>
      <div className="snap-x w-full mx-auto overflow-x-scroll overflow-y-hidden scrollbar">
        <ul className="min-w-[calc(600%+2.5rem)] lg:min-w-[200%] grid grid-cols-cuisineCard grid-flow-col 2xl:gap-4 gap-2 mt-4 whitespace-nowrap pb-4">
          {!isLoading
            ? elevenCuisineCardsData.map((mealCard, index) => {
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
          <Link to={"/Asian"}>
            <button
              onClick={() => {
                handleClearFilters()
                setCuisine(["Asian"]);
                setPageSelected("Recipes");
              }}
              className="bg-[var(--primary-container)] text-[var(--text)] hover:bg-[var(--badge-btn-hover)] transition-colors duration-150 rounded-md w-full h-full"
            >
              Show More &gt;
            </button>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default AsianCuisineTab;
