import React from "react";
import { MdOutlineBookmarkAdd, MdOutlineBookmark } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useRecipeDetails } from "../Hooks/useFetchRecipes";
import { AppContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RecipeDetails = () => {
  const base = "https://api.edamam.com/api/recipes/v2/";

  const { setPageSelected, recipesSaved, setRecipesSaved, handleScrollToTop } =
    useContext(AppContext);

  const { id } = useParams();

  const { data, refetch, error, isError } = useRecipeDetails(`${base}${id}`);

  const singleRecipe = {
    recipeInfo: {
      recipe: {
        image: data?.data.recipe.image,
        label: data?.data.recipe.label,
        totalTime: data?.data.recipe.totalTime,
      },
      _links: {
        self: {
          href: data?.data._links.self.href,
        },
      },
    },
  };

  const handleSaveRecipe = () => {
    const exists = recipesSaved.filter((recipe) => {
      return (
        recipe.recipeInfo._links.self.href ===
        singleRecipe.recipeInfo._links.self.href
      );
    });

    if (exists.length) {
      const updatedRecipes = recipesSaved.filter((recipe) => {
        return (
          recipe.recipeInfo._links.self.href !==
          singleRecipe.recipeInfo._links.self.href
        );
      });
      setRecipesSaved(updatedRecipes);
      localStorage.setItem("saved", JSON.stringify(updatedRecipes));
    } else {
      localStorage.setItem(
        "saved",
        JSON.stringify([...recipesSaved, singleRecipe]),
      );
      setRecipesSaved([...recipesSaved, singleRecipe]);
    }
  };

  useEffect(() => {
    handleScrollToTop();
    setPageSelected("");
    refetch();
  }, []);

  if (isError) {
    return (
      <div className="mt-20 flex h-full w-full flex-row items-center justify-center gap-6 text-[var(--text)]">
        <div className="flex h-[200px] w-full flex-row items-center justify-center text-2xl font-semibold text-[var(--text)] transition-colors duration-150">
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      className="mt-20 flex h-full w-full flex-col items-start justify-center gap-6 text-[var(--text)] lg:flex-row"
    >
      <div className="aspect-square h-auto w-full overflow-hidden rounded-md bg-gray-300 bg-tab-card-img bg-35% bg-center bg-no-repeat lg:w-[32%]">
        <img
          loading="lazy"
          className="aspect-square h-full w-full"
          src={data?.data.recipe.images.REGULAR.url}
          alt=""
        />
      </div>
      <div className="flex w-full flex-col gap-4 lg:w-[45%]">
        <div className="flex flex-row items-start justify-between">
          <div className="max-w-[65%] lg:max-w-[70%]">
            <h1 className="text-2xl font-semibold lg:text-3xl">
              {data?.data.recipe.label}
            </h1>
            <span>
              by{" "}
              <span className="font-semibold">{data?.data.recipe.source}</span>
            </span>
          </div>
          <button
            onClick={handleSaveRecipe}
            className="mt-2 flex w-28 flex-row items-center justify-center gap-1 bg-[var(--primary-container)] py-1 font-semibold hover:bg-[var(--badge-btn-hover)]"
          >
            <AnimatePresence>
              {!recipesSaved.filter((recipe) => {
                return (
                  recipe.recipeInfo._links.self.href ===
                  singleRecipe.recipeInfo._links.self.href
                );
              }).length && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transition: { duration: 0.2 } }}
                  exit={{ scale: 0, transition: { duration: 0 } }}
                >
                  <MdOutlineBookmarkAdd className=" h-5 w-auto" />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {recipesSaved.filter((recipe) => {
                return (
                  recipe.recipeInfo._links.self.href ===
                  singleRecipe.recipeInfo._links.self.href
                );
              }).length && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, transition: { duration: 0.2 } }}
                  exit={{ scale: 0, transition: { duration: 0 } }}
                >
                  <MdOutlineBookmark className="h-5 w-auto" />
                </motion.div>
              )}
            </AnimatePresence>
            {!recipesSaved.filter((recipe) => {
              return (
                recipe.recipeInfo._links.self.href ===
                singleRecipe.recipeInfo._links.self.href
              );
            }).length
              ? "Save"
              : "Saved"}
          </button>
        </div>
        <div className="flex flex-row">
          <div className="flex grow flex-col items-center justify-center border-r-[1px] border-[var(--outline)] py-6">
            <span className="text-2xl font-semibold">
              {data?.data.recipe.ingredientLines.length}
            </span>
            <span className="text-xs">ingredients</span>
          </div>
          <div className="flex grow flex-col items-center justify-center border-r-[1px] border-[var(--outline)] py-6">
            <span className="text-2xl font-semibold">
              {data?.data.recipe.totalTime}
            </span>
            <span className="text-xs">minutes</span>
          </div>
          <div className="flex grow flex-col items-center justify-center py-6">
            <span className="text-2xl font-semibold">
              {data?.data.recipe &&
              typeof data.data.recipe.calories === "number"
                ? Math.round(data.data.recipe.calories)
                : "N/A"}
            </span>
            <span className="text-xs">calories</span>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-4">
          {data?.data.recipe.cuisineType.map((cuisine) => {
            return (
              <button
                className="cursor-default whitespace-nowrap rounded-md border-[1px] border-[var(--outline)] px-4"
                key={cuisine}
              >{`${cuisine.charAt(0).toUpperCase()}${cuisine.slice(
                1,
              )}`}</button>
            );
          })}
          {data?.data.recipe.dietLabels.map((label) => {
            return (
              <button
                key={label}
                className="cursor-default whitespace-nowrap rounded-md border-[1px] border-[var(--outline)] px-4"
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-row items-end justify-between border-b-[1px] border-[var(--outline)] py-2">
          <h3 className="font-semibold">Ingredients</h3>
          <span className="text-xs font-semibold">
            for {data?.data.recipe.yield} servings
          </span>
        </div>
        <ul className="list-disc">
          {data?.data.recipe.ingredientLines.map((ingredientLine) => {
            return (
              <li className="ml-[18px]" key={ingredientLine}>
                {ingredientLine}
              </li>
            );
          })}
        </ul>
        <p>
          Link to instructions:{" "}
          <a
            className="break-words font-semibold underline"
            href={data?.data.recipe.url}
            target="_blank"
          >
            {data?.data.recipe.url}
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default RecipeDetails;
