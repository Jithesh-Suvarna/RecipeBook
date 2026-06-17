import React, { useState, useEffect } from "react";
import { X, Clock, Heart, ChevronRight, Check } from "lucide-react";
import { Recipe } from "../types";

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export default function RecipeModal({
  recipe,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
}: RecipeModalProps) {
  // Checklist checked state
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  // Reset checked ingredients when recipe changes or modal closes/opens
  useEffect(() => {
    setCheckedIngredients({});
  }, [recipe, isOpen]);

  if (!isOpen || !recipe) return null;

  const toggleChecked = (index: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div
      id="recipe-detail-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-[#1A1A2E]/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        id="recipe-detail-content"
        onClick={(e) => e.stopPropagation()} // halt bubbling
        className="relative w-full max-w-2xl bg-[#F5F0E8] text-[#1A1A2E] rounded-[20px] overflow-hidden shadow-2xl transition-all border border-black/5 flex flex-col max-h-[90vh]"
      >
        {/* Close Button Top Right (Float on image) */}
        <button
          id="close-recipe-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#1A1A2E]/60 text-white hover:bg-[#E07B39] transition-all cursor-pointer shadow active:scale-95"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto">
          {/* Hero Banner Image */}
          <div className="relative h-64 md:h-72 w-full bg-zinc-100">
            <img
              src={recipe.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for text on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
              <div className="text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F4C542] bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-sm">
                  {recipe.mealType}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold mt-2 leading-tight drop-shadow-sm">
                  {recipe.title}
                </h2>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Meta Tags Quick Specs */}
            <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-[12px] border border-black/5 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-[#4CAF7D]/10 text-[#4CAF7D] rounded-lg">
                <span className="w-2 h-2 rounded-full bg-[#4CAF7D]" />
                <span>Difficulty: {recipe.difficulty}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-[#E07B39]/10 text-[#E07B39] rounded-lg">
                <Clock size={14} className="text-[#E07B39]" />
                <span>Cook Time: {recipe.cookTime} mins</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-zinc-100 text-zinc-700 rounded-lg ml-auto">
                <span>{recipe.ingredients.length} items</span>
              </div>
            </div>

            {/* Nutrition Information Grid */}
            <div>
              <h4 className="font-serif text-lg font-bold mb-3 border-b border-black/10 pb-1">Nutrition Information (Per Serving)</h4>
              <div className="grid grid-cols-4 gap-2.5">
                <div className="bg-white p-3 rounded-xl border border-black/5 text-center shadow-sm">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase">Calories</p>
                  <p className="text-base sm:text-lg font-black text-[#1A1A2E] mt-0.5">{recipe.nutrition.calories}</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-black/5 text-center shadow-sm">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase">Protein</p>
                  <p className="text-base sm:text-lg font-black text-[#4CAF7D] mt-0.5">{recipe.nutrition.protein}</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-black/5 text-center shadow-sm">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase">Carbs</p>
                  <p className="text-base sm:text-lg font-black text-[#F4C542] mt-0.5">{recipe.nutrition.carbs}</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-black/5 text-center shadow-sm">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase">Fat</p>
                  <p className="text-base sm:text-lg font-black text-[#E07B39] mt-0.5">{recipe.nutrition.fat}</p>
                </div>
              </div>
            </div>

            {/* Ingredients checklist */}
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-black/10 pb-1">
                <h4 className="font-serif text-lg font-bold">Ingredients Checklist</h4>
                <span className="text-[11px] text-[#1A1A2E]/50 font-medium">Click to check-off items as you prepare</span>
              </div>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, idx) => {
                  const isChecked = !!checkedIngredients[idx];
                  return (
                    <li
                      key={idx}
                      id={`ingredient-item-${idx}`}
                      onClick={() => toggleChecked(idx)}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer select-none ${
                        isChecked
                          ? "bg-[#4CAF7D]/10 border-[#4CAF7D] text-[#1A1A2E]/60 line-through"
                          : "bg-white border-[#1A1A2E]/5 text-[#1A1A2E] hover:bg-zinc-50"
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                        isChecked ? "bg-[#4CAF7D] border-[#4CAF7D] text-white" : "bg-white border-zinc-300"
                      }`}>
                        {isChecked && <Check size={14} className="stroke-[3]" />}
                      </div>
                      <span className="text-sm font-medium leading-tight">{ingredient}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Step-by-step instructions */}
            <div>
              <h4 className="font-serif text-lg font-bold mb-3 border-b border-black/10 pb-1">Cooking Instructions</h4>
              <ol className="space-y-4">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#E07B39] text-[#F5F0E8] font-black text-xs shrink-0 shadow-sm mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm sm:text-base leading-relaxed text-[#1A1A2E] font-medium pt-0.5">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Modal sticky footer panel - save / toggle bookmark */}
        <div className="p-4 bg-white border-t border-black/5 flex items-center justify-between gap-4 shrink-0 rounded-b-[20px]">
          <span className="text-xs text-[#1A1A2E]/50 font-bold hidden sm:inline">
            Love this recipe? Add it to your cookbook.
          </span>
          <button
            id="toggle-save-detail-btn"
            onClick={() => onToggleSave(recipe.id)}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow active:scale-95 ${
              isSaved
                ? "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
                : "bg-[#E07B39] text-[#F5F0E8] hover:bg-[#c56525]"
            }`}
          >
            <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
            <span>{isSaved ? "Remove from Cookbook" : "Save to Cookbook"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
