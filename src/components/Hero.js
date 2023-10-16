import React from "react";
import SearchRecipe from "./SearchRecipe";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      className="w-full font-dm-sans rounded-md min-h-[480px] lg:min-h-[400px] 2xl:min-h-[500px] bg-center bg-mobile-hero lg:bg-hero-img bg-cover flex flex-col justify-center items-center mt-20 2xl:mt-32"
    >
      <h1 className="text-white text-3xl lg:text-4xl 2xl:text-6xl mb-3 font-dm-serif-display font-semibold">Your desired dish?</h1>
      <SearchRecipe />
      <h3 className="text-white lg:text-sm text-xs 2xl:text-base mt-3">
        Search any recipe e.g: burger, pizza, sandwich, toast
      </h3>
    </motion.div>
  );
};

export default Hero;
