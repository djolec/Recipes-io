import React, { Fragment, useEffect } from "react";
import { useState, createContext } from "react";
import { MdFilterList } from "react-icons/md";
import Filter from "./Filter";
import MealTabCard from "./MealTabCard";
import SkeletonMain from "./SkeletonMain";
import ScrollFilterButton from "./ScrollFilterButton";
import { useFilteredRecipes } from "../Hooks/useFetchRecipes";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AllRecipes = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [applyDisabled, setApplyDisabled] = useState(true);

  const {
    inputValue,
    diet,
    meal,
    cuisine,
    health,
    handleScrollToTop,
    setPageSelected,
    cookingTime,
    ingredients,
    calories,
    dish,
    handleClearFilters,
  } = useContext(AppContext);

  const numArr = Array.from({ length: 20 }, (_, index) => index + 1);

  const { id } = useParams();

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight - 50;

    if (bottom) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filterNumber =
    cookingTime.length +
    ingredients.length +
    calories.length +
    diet.length +
    health.length +
    meal.length +
    dish.length +
    cuisine.length;

  const queryCookingTime = cookingTime
    .map((time) => {
      if (time === "< 5 minutes") {
        return "5";
      } else if (time === "> 1 hour") {
        return "60%2B";
      } else {
        return time.replace(/\s/g, "").replace("minutes", "");
      }
    })
    .map((string) => `&time=${string}`);

  const queryIngredients = ingredients
    .map((ingredient) => {
      if (ingredient === "< 5 ingredients") {
        return "5";
      } else if (ingredient === "> 30 ingredients") {
        return "30%2B";
      } else {
        return ingredient.replace(/\s/g, "").replace("ingredients", "");
      }
    })
    .map((string) => `&ingr=${string}`);

  const queryCalories = calories
    .map((calorieNum) => {
      if (calorieNum === "< 50 calories") {
        return "50";
      } else if (calorieNum === "> 500 calories") {
        return "500%2B";
      } else {
        return calorieNum.replace(/\s/g, "").replace("calories", "");
      }
    })
    .map((string) => `&calories=${string}`);

  const queryDiet = diet
    .map((diet) => diet.toLowerCase())
    .map((string) => `&diet=${string}`)
    .join("");
  const queryHealth = health
    .map((health) =>
      health === "DASH" || health === "Mediterranean"
        ? health
        : health.toLowerCase()
    )
    .map((string) => `&health=${string}`)
    .join("");
  const queryMeal = meal.map((string) => `&mealType=${string}`).join("");
  const queryDish = dish
    .map((dish) => dish.replace(/ /g, "%20"))
    .map((string) => `&dishType=${string}`)
    .join("");
  const queryCuisine = cuisine
    .map((cuisine) => cuisine.replace(/ /g, "%20"))
    .map((string) => `&cuisineType=${string}`)
    .join("");
  const queryInput = inputValue ? `&q=${inputValue}` : "";

  useEffect(() => {
    setPageSelected("Recipes");
    handleScrollToTop();
    refetch();
  }, []);

  const {
    data,
    isLoading,
    isFetching,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    error,
    isError,
  } = useFilteredRecipes(
    queryInput,
    queryCookingTime,
    queryIngredients,
    queryCalories,
    queryDiet,
    queryHealth,
    queryMeal,
    queryDish,
    queryCuisine
  );

  if (isError) {
    return (
      <div className="mt-56 font-dm-sans">
        <h1 className="text-[var(--text)] text-center w-full text-3xl font-semibold">
          {error.message}
        </h1>
      </div>
    );
  }

  return (
    <div className="mt-20 font-dm-sans">
      <Filter
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        applyDisabled={applyDisabled}
        setApplyDisabled={setApplyDisabled}
        refetch={refetch}
        filterNumber={filterNumber}
      />
      <div className="w-full h-full lg:pl-[300px] pl-0  flex flex-col ">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-[var(--text)] text-3xl">All Recipes</h1>
          <button
            onClick={() => setFilterOpen(true)}
            className="bg-[var(--primary-container)] text-[var(--text)] transition-colors duration-150 flex flex-row gap-3 items-center rounded-md px-4 py-2 lg:hidden"
          >
            <MdFilterList />
            <h1>Filters</h1>
          </button>
        </div>
        <ScrollFilterButton setFilterOpen={setFilterOpen} />
        <ul className=" w-full grid grid-cols-card gap-2 mt-4">
          {data?.pages[0].data.count !== 0 &&
            data?.pages.map((group, i) => {
              return (
                <Fragment key={i}>
                  {group.data.hits.map((mealCard, index) => {
                    return (
                      <MealTabCard
                        key={i * 20 + index + 1}
                        finalKey={i * 20 + index + 1}
                        recipeInfo={mealCard}
                        animKey={index + 1}
                      />
                    );
                  })}
                </Fragment>
              );
            })}
          <AnimatePresence>
            {data?.pages[0].data.count === 0 && !isFetching ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate= {{ opacity: 1, transition: { duration: 1 } }}
                className="text-[var(--text)] w-full lg:w-[400px] h-40 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto text-3xl font-semibold"
              >
                <h1>No recipe found. Try applying the filters.</h1>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {isFetching || (isFetchingNextPage && data?.pages[0].data.count !== 0)
            ? numArr.map((num) => {
                return <SkeletonMain key={num} />;
              })
            : null}
        </ul>
      </div>
    </div>
  );
};

export default AllRecipes;
