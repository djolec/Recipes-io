import React, { useEffect, useContext } from "react";
import Hero from "./Hero";
import MealTabs from "./MealTabs";
import FrenchCuisineTab from "./FrenchCuisineTab";
import AsianCuisineTab from "./AsianCuisineTab";
import HealthPreferences from "./HealthPreferences";
import { AppContext } from "../App";

const HomePage = () => {

  const { setPageSelected } = useContext(AppContext);

  useEffect(() => {
    setPageSelected("Home")
  }, [])

  return (
    <>
      <Hero />
      <MealTabs />
      <FrenchCuisineTab />
      <AsianCuisineTab />
      <HealthPreferences />
    </>
  );
};

export default HomePage;
