import { useState, useCallback } from "react";
import { Recipe, RecipeFilter } from "../types";

const INITIAL_FILTERS: RecipeFilter = {
  mealType: "All",
  difficulty: "All",
  maxTime: "Any",
  query: "",
};

export function useFilters() {
  const [filters, setFilters] = useState<RecipeFilter>(INITIAL_FILTERS);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const updateFilter = useCallback(<K extends keyof RecipeFilter>(key: K, value: RecipeFilter[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const filterRecipes = useCallback((recipes: Recipe[]) => {
    return recipes.filter((recipe) => {
      // 1. Search Query (Title or ingredients checklist)
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase();
        const matchesTitle = recipe.title.toLowerCase().includes(q);
        const matchesIngredients = recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesIngredients) {
          return false;
        }
      }

      // 2. Meal Type
      if (filters.mealType !== "All") {
        if (recipe.mealType !== filters.mealType) {
          return false;
        }
      }

      // 3. Difficulty
      if (filters.difficulty !== "All") {
        if (recipe.difficulty !== filters.difficulty) {
          return false;
        }
      }

      // 4. Max Time
      if (filters.maxTime !== "Any") {
        const timeVal = parseInt(filters.maxTime.replace("<", "").replace(" min", ""));
        if (recipe.cookTime >= timeVal) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  return {
    filters,
    resetFilters,
    updateFilter,
    filterRecipes,
  };
}
