import { useState, useEffect } from "react";
import { Recipe } from "../types";
import { SAMPLE_RECIPES } from "../data/recipes";

export function useCookbook() {
  // Saved Recipe IDs inside the Cookbook
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("cookbook_recipes");
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        console.error("Failed to read cookbook_recipes from localStorage", e);
        return [];
      }
    }
    return [];
  });

  // Full Custom Recipe Objects
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("custom_recipes");
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        console.error("Failed to read custom_recipes from localStorage", e);
        return [];
      }
    }
    return [];
  });

  // Sync savedIds changes with localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cookbook_recipes", JSON.stringify(savedIds));
    } catch (e) {
      console.error("Failed to sync cookbook_recipes to localStorage", e);
    }
  }, [savedIds]);

  // Sync customRecipes changes with localStorage
  useEffect(() => {
    try {
      localStorage.setItem("custom_recipes", JSON.stringify(customRecipes));
    } catch (e) {
      console.error("Failed to sync custom_recipes to localStorage", e);
    }
  }, [customRecipes]);

  // Unified lists of recipes (Sample recipes + Custom recipes)
  const allRecipes: Recipe[] = [...SAMPLE_RECIPES, ...customRecipes];

  // Helper actions
  const isSaved = (id: string): boolean => {
    return savedIds.includes(id);
  };

  const toggleCookbook = (id: string) => {
    setSavedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const removeCookbook = (id: string) => {
    setSavedIds((prev) => prev.filter((item) => item !== id));
  };

  const addCustomRecipe = (recipe: Recipe) => {
    setCustomRecipes((prev) => [recipe, ...prev]);
  };

  const removeCustomRecipe = (id: string) => {
    // Also toggle out of cookbook if saved
    setSavedIds((prev) => prev.filter((item) => item !== id));
    setCustomRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  return {
    savedIds,
    customRecipes,
    allRecipes,
    isSaved,
    toggleCookbook,
    removeCookbook,
    addCustomRecipe,
    removeCustomRecipe,
  };
}
