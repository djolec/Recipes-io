import React from "react";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import MealTabCard from "./MealTabCard";
import { AnimatePresence, motion } from "framer-motion";

const SavedRecipes = () => {
  const { recipesSaved, setPageSelected } = useContext(AppContext);

  useEffect(() => {
    setPageSelected("");
  });

  return (
    <div className="font-dm-sans text-[var(--text)] transition-colors duration-150 mt-20">
      {recipesSaved.length ? (
        <ul className="w-full lg:w-[80%] mx-auto grid grid-cols-card gap-2 mt-4">
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
            className="text-[var(--text)] transition-colors duration-150 mt-56 flex flex-row justify-center items-center"
          >
            <h1 className="text-center text-3xl">You haven't saved any recipes.</h1>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default SavedRecipes;
