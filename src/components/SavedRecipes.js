import React from "react";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import MealTabCard from "./MealTabCard";
import { AnimatePresence, motion } from "framer-motion";

const SavedRecipes = () => {
  const { recipesSaved, setPageSelected } = useContext(AppContext);

  useEffect(() => {
    setPageSelected("Saved");
  });

  return (
    <div className="mt-20 font-dm-sans text-[var(--text)] transition-colors duration-150 2xl:mt-32">
      {recipesSaved.length ? (
        <ul className="mx-auto mt-4 grid w-full grid-cols-card gap-2 lg:w-[80%] 2xl:w-[90%] 2xl:grid-cols-cardBig 2xl:gap-4">
          <AnimatePresence>
            {recipesSaved.map((recipe, index) => {
              return (
                <MealTabCard
                  key={recipe.recipeInfo.recipe.label}
                  recipeInfo={recipe.recipeInfo}
                  animKey={index + 1}
                  exit={{
                    scale: [1, 0.5, 0.5],
                    opacity: [1, 0.5, 0],
                    y: [0, 0, -300],
                    transition: { duration: 0.5 },
                  }}
                />
              );
            })}
          </AnimatePresence>
        </ul>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 2 } }}
            className="mt-56 flex flex-row items-center justify-center text-[var(--text)] transition-colors duration-150"
          >
            <h1 className="text-center text-3xl">
              You haven't saved any recipes.
            </h1>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default SavedRecipes;
