import React from "react";
import HealthPrefButton from "./HealthPrefButton";

const HealthPreferences = () => {



  const healthPrefs = [
    "Alcohol-Cocktail",
    "Alcohol-Free",
    "Celery-Free",
    "Crustacean-Free",
    "Dairy-Free",
    "DASH",
    "Egg-Free",
    "Fish-Free",
    "Fodmap-Free",
    "Gluten-Free",
    "Immuno-Supportive",
    "Keto-Friendly",
    "Kidney-Friendly",
    "Kosher",
    "Low-Fat-Abs",
    "Low-Potassium",
    "Low-Sugar",
    "Lupine-Free",
    "Mediterranean",
    "Mollusk-Free",
    "Mustard-Free",
    "No-Oil-Added",
    "Paleo",
    "Peanut-Free",
    "Pescatarian",
    "Pork-Free",
    "Red-Meat-Free",
    "Sesame-Free",
    "Shellfish-Free",
    "Soy-Free",
    "Sugar-Conscious",
    "Sulfite-Free",
    "Tree-Nut-Free",
    "Vegan",
    "Vegetarian",
    "Wheat-Free",
  ];

  return (
    <div className="w-full lg:w-[80%] mx-auto mt-8 flex flex-col gap-6">
      <div className="w-[80%] lg:w-[50%] mx-auto flex flex-col gap-1">
        <h1 className="text-[var(--text)] font-dm-serif-display text-[26px] lg:text-3xl font-semibold text-center">
          Choose Your Health Preference
        </h1>
        <p className="text-[var(--text)] text-center text-xs lg:text-sm font-dm-sans">
          Choosing your health preference is an important step towards achieving
          a healthier lifestyle.
        </p>
      </div>
      <div className="flex flex-row gap-2 flex-wrap justify-center">
        {healthPrefs.map((pref) => {
          return <HealthPrefButton key={pref} pref={pref} />;
        })}
      </div>
    </div>
  );
};

export default HealthPreferences;
