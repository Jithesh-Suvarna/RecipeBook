export type MealType = "Breakfast" | "Lunch" | "Dinner" | "Dessert" | "Snack";
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Nutrition {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

export interface Recipe {
  id: string;
  title: string;
  mealType: MealType;
  difficulty: Difficulty;
  cookTime: number; // in minutes
  imageUrl: string;
  ingredients: string[];
  instructions: string[];
  nutrition: Nutrition;
}

export interface RecipeFilter {
  mealType: MealType | "All";
  difficulty: Difficulty | "All";
  maxTime: "Any" | "<15" | "<30" | "<60";
  query: string;
}
