import React from "react";
import SearchRecipe from "./SearchRecipe";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      className="mt-20 flex min-h-[480px] w-full flex-col items-center justify-center rounded-md bg-mobile-hero bg-cover bg-center font-dm-sans lg:min-h-[400px] lg:bg-hero-img 2xl:mt-32 2xl:min-h-[500px]"
    >
      <h1 className="mb-3 font-dm-serif-display text-3xl font-semibold text-white lg:text-4xl 2xl:text-6xl">
        Your desired dish?
      </h1>
      <SearchRecipe />
      <h3 className="mt-3 text-xs text-white lg:text-sm 2xl:text-base">
        Search any recipe e.g: burger, pizza, sandwich, toast
      </h3>
    </motion.div>
  );
};

export default Hero;
