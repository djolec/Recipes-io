import "./theme.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import AllRecipes from "./components/AllRecipes";
import RecipeDetails from "./components/RecipeDetails";
import SavedRecipes from "./components/SavedRecipes";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

export const AppContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("isDark")) || null,
  );

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const [selectedMeal, setSelectedMeal] = useState("Breakfast");

  const [inputValue, setInputValue] = useState("");
  const [diet, setDiet] = useState([]);
  const [meal, setMeal] = useState([]);
  const [cuisine, setCuisine] = useState([]);
  const [health, setHealth] = useState([]);
  const [cookingTime, setCookingTime] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [calories, setCalories] = useState([]);
  const [dish, setDish] = useState([]);
  const [pageSelected, setPageSelected] = useState("Home");
  const [recipesSaved, setRecipesSaved] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // Check if the screen width is less than or equal to a mobile size (e.g., 768px)
    const handleResize = () => {
      // setIsMobileView(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("saved")) {
      localStorage.setItem("saved", JSON.stringify([]));
    } else {
      setRecipesSaved(JSON.parse(localStorage.getItem("saved")));
    }

    if (localStorage.getItem("isDark")) {
      setDarkMode(JSON.parse(localStorage.getItem("isDark")));
    } else {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)",
      );
      setDarkMode(darkModeMediaQuery.matches);
      localStorage.setItem(
        "isDark",
        JSON.stringify(darkModeMediaQuery.matches),
      );

      const handleDarkModeChange = (e) => {
        setDarkMode(e.matches);
      };

      // Add event listener to track theme change
      darkModeMediaQuery.addEventListener("change", handleDarkModeChange);

      // Remove the event listener when the component unmounts
      return () => {
        darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
      };
    }
  }, []);

  const handleClearFilters = () => {
    setCookingTime([]);
    setIngredients([]);
    setCalories([]);
    setDiet([]);
    setHealth([]);
    setMeal([]);
    setDish([]);
    setCuisine([]);
    setInputValue("");
  };

  const handleClearExceptInput = () => {
    setCookingTime([]);
    setIngredients([]);
    setCalories([]);
    setDiet([]);
    setHealth([]);
    setMeal([]);
    setDish([]);
    setCuisine([]);
  };

  const handleKeyPress = (e, ref) => {
    if (e.key === "Enter") {
      handleClearExceptInput();
      ref.current.click();
    }
  };

  return (
    <AppContext.Provider
      value={{
        selectedMeal,
        setSelectedMeal,
        inputValue,
        setInputValue,
        diet,
        setDiet,
        meal,
        setMeal,
        cuisine,
        setCuisine,
        health,
        setHealth,
        handleScrollToTop,
        pageSelected,
        setPageSelected,
        cookingTime,
        setCookingTime,
        ingredients,
        setIngredients,
        calories,
        setCalories,
        dish,
        setDish,
        handleClearFilters,
        handleKeyPress,
        darkMode,
        setDarkMode,
        recipesSaved,
        setRecipesSaved,
        handleClearExceptInput,
        isMobileView,
      }}
    >
      <div
        data-theme={darkMode ? "dark" : "light"}
        className="App flex min-h-screen w-full flex-col"
      >
        <Header />
        <main className="transition-color w-full flex-grow bg-[var(--primary-bg)] p-4 duration-150">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:id" element={<AllRecipes />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/savedRecipes" element={<SavedRecipes />} />
          </Routes>
        </main>
        <Footer />
        <MobileNav />
      </div>
    </AppContext.Provider>
  );
}

export default App;
