import React from "react";
import { useCallback, useContext, useState } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import {
  MdOutlineBookmark,
  MdOutlineBookmarkAdd,
  MdAccessTime,
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const MealTabCard = ({ recipeInfo, animKey, finalKey, exit }) => {
  const { recipesSaved, setRecipesSaved } = useContext(AppContext);

  const formatTime = useCallback((minutes) => {
    const days = Math.floor(minutes / (60 * 24));
    const remainingHours = Math.floor((minutes % (60 * 24)) / 60);
    const remainingMinutes = minutes % 60;

    if (days > 0) {
      return `${days}d ${remainingHours > 0 ? `${remainingHours}h` : ""} ${
        remainingMinutes > 0 ? `${remainingMinutes}m` : ""
      }`;
    } else if (remainingHours > 0 && remainingMinutes > 0) {
      return `${remainingHours}h and ${remainingMinutes}m`;
    } else if (remainingHours > 0 && remainingMinutes === 0) {
      return `${remainingHours}h`;
    } else if (minutes < 1) {
      return "< 1m";
    } else {
      return `${minutes}m`;
    }
  }, []);

  const recipeObj = {
    recipeInfo: {
      recipe: {
        image: recipeInfo.recipe.image,
        label: recipeInfo.recipe.label,
        totalTime: recipeInfo.recipe.totalTime,
      },
      _links: {
        self: {
          href: recipeInfo._links.self.href,
        },
      },
    },
  };

  const handleSaveRecipe = () => {
    const savedRecipes = JSON.parse(localStorage.getItem("saved"));

    const exists = savedRecipes.filter((recipe) => {
      return (
        recipe.recipeInfo._links.self.href ===
        recipeObj.recipeInfo._links.self.href
      );
    });

    if (exists.length) {
      const updatedRecipes = savedRecipes.filter((recipe) => {
        return (
          recipe.recipeInfo._links.self.href !==
          recipeObj.recipeInfo._links.self.href
        );
      });
      setRecipesSaved(updatedRecipes);
      localStorage.setItem("saved", JSON.stringify(updatedRecipes));
    } else {
      localStorage.setItem(
        "saved",
        JSON.stringify([...savedRecipes, recipeObj]),
      );
      setRecipesSaved([...savedRecipes, recipeObj]);
    }
  };

  return (
    <motion.li
      className="relative flex flex-col justify-between gap-4 overflow-hidden rounded-md text-[var(--text)]"
      key={finalKey}
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.25, delay: animKey * 0.15 },
      }}
      exit={exit}
    >
      <div className="flex flex-col gap-2">
        <div className="aspect-square overflow-hidden rounded-md bg-gray-300 bg-tab-card-img bg-35% bg-center bg-no-repeat">
          <img
            loading="lazy"
            className="aspect-square h-full w-full"
            src={recipeInfo.recipe.image}
            alt=""
          />
        </div>
        <Link
          to={`/recipe/${recipeInfo._links.self.href.replace(
            "https://api.edamam.com/api/recipes/v2/",
            "",
          )}`}
        >
          <h1 className="cursor-pointer whitespace-normal px-1 font-semibold transition-colors duration-150 before:absolute before:inset-0 before:content-[''] hover:text-orange-500 2xl:text-xl">
            {recipeInfo.recipe.label.length > 30
              ? `${recipeInfo.recipe.label.slice(0, 30)}...`
              : recipeInfo.recipe.label}
          </h1>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-between px-1">
        <p className="flex flex-row items-center justify-start gap-1">
          <MdAccessTime className="h-5 w-auto pt-[1px] transition-colors duration-150 2xl:h-7" />
          <span className="text-sm transition-colors duration-150 2xl:text-base">
            {formatTime(recipeInfo.recipe.totalTime)}
          </span>
        </p>
        <div
          onClick={handleSaveRecipe}
          className="z-[5] flex h-7 w-7 cursor-pointer flex-row items-center justify-center rounded-full bg-[var(--primary-container)] transition-colors duration-150 hover:bg-[var(--badge-btn-hover)]"
        >
          <AnimatePresence>
            {!recipesSaved.filter((recipe) => {
              return (
                recipe.recipeInfo._links.self.href ===
                recipeObj.recipeInfo._links.self.href
              );
            }).length && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { duration: 0.2 } }}
                exit={{ scale: 0, transition: { duration: 0 } }}
              >
                <MdOutlineBookmarkAdd className="h-5 w-auto 2xl:h-7" />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {recipesSaved.filter((recipe) => {
              return (
                recipe.recipeInfo._links.self.href ===
                recipeObj.recipeInfo._links.self.href
              );
            }).length && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { duration: 0.2 } }}
                exit={{ scale: 0, transition: { duration: 0 } }}
              >
                <MdOutlineBookmark className="h-5 w-auto 2xl:h-7" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.li>
  );
};

export default MealTabCard;
