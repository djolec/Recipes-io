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
    <div className="mx-auto mt-8 flex w-full flex-col gap-6 lg:w-[80%]">
      <div className="mx-auto flex w-[80%] flex-col gap-1 lg:w-[50%] 2xl:w-[60%]">
        <h1 className="text-center font-dm-serif-display text-[26px] font-semibold text-[var(--text)] lg:text-3xl 2xl:text-6xl">
          Choose Your Health Preference
        </h1>
        <p className="text-center font-dm-sans text-xs text-[var(--text)] lg:text-sm 2xl:mx-auto 2xl:w-[80%] 2xl:text-2xl">
          Choosing your health preference is an important step towards achieving
          a healthier lifestyle.
        </p>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-2">
        {healthPrefs.map((pref) => {
          return <HealthPrefButton key={pref} pref={pref} />;
        })}
      </div>
    </div>
  );
};

export default HealthPreferences;
