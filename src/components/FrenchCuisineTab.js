import React from "react";
import MealTabCard from "./MealTabCard";
import SkeletonMain from "./SkeletonMain";
import { useFetchCuisine } from "../Hooks/useFetchRecipes";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { useContext, useEffect } from "react";

const FrenchCuisineTab = () => {
  const { setCuisine, setPageSelected, handleClearFilters } = useContext(AppContext);
  const { data, refetch, isLoading, error, isError } = useFetchCuisine("French");
  const numArr = Array.from({ length: 11 }, (_, index) => index + 1);
  const twelveCuisineCardsData = data?.data.hits.slice(0, 11);

  useEffect(() => {
    refetch();
    if (!isLoading) {
    }
  }, []);

  if(isError) {
    return (
      <div className="w-[80%] mx-auto mt-8 font-dm-sans">
        <h1 className="text-[var(--text)] transition-colors duration-150 w-full mx-auto text-[26px]">Latest French Recipes</h1>
        <div className="text-2xl text-[var(--text)] transition-colors duration-150 font-semibold w-full flex flex-row justify-center items-center h-[200px]">
          {error.message}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full lg:w-[80%] mx-auto mt-8 font-dm-sans">
      <h1 className="text-[var(--text)] transition-colors duration-150 w-full mx-auto text-[26px]">Latest French Recipes</h1>
      <div className="snap-x w-full mx-auto overflow-x-scroll overflow-y-hidden scrollbar">
        <ul className="min-w-[610%] lg:min-w-[200%] grid grid-cols-cuisineCard grid-flow-col gap-2 mt-4 whitespace-nowrap pb-4">
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
            <button onClick={() => {
              handleClearFilters()
              setCuisine(["French"])
              setPageSelected("Recipes")
            }} className="bg-[var(--primary-container)] hover:bg-[var(--badge-btn-hover)] transition-colors duration-150 text-[var(--text)] rounded-md w-full h-full">Show More &gt;</button>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default FrenchCuisineTab;
