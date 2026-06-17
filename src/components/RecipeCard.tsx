import React from "react";
import { Clock, Book, Trash2, Heart } from "lucide-react";
import { Recipe } from "../types";

interface RecipeCardProps {
  key?: string;
  recipe: Recipe;
  isSavedInCookbook: boolean;
  showRemoveIcon: boolean; // True if rendered inside My Cookbook view, shows trash top-right
  onViewClick: (recipe: Recipe) => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onRemoveClick?: (id: string, e: React.MouseEvent) => void;
}

export default function RecipeCard({
  recipe,
  isSavedInCookbook,
  showRemoveIcon,
  onViewClick,
  onToggleSave,
  onRemoveClick,
}: RecipeCardProps) {
  // Color mapping matching UI rules
  const getDifficultyColorClass = (diff: string) => {
    switch (diff) {
      case "Easy":
        return "bg-[#4CAF7D] text-[#F5F0E8]";
      case "Medium":
        return "bg-[#F4C542] text-[#1A1A2E]";
      case "Hard":
        return "bg-[#E07B39] text-[#F5F0E8]";
      default:
        return "bg-[#4CAF7D] text-white";
    }
  };

  return (
    <div
      id={`recipe-card-${recipe.id}`}
      className="group relative bg-white rounded-[12px] overflow-hidden border border-black/5 flex flex-col hover:-translate-y-1.5 transition-all duration-300 card-shadow text-[#1A1A2E]"
    >
      {/* Recipe Header/Image Container */}
      <div className="relative h-44 overflow-hidden bg-zinc-100 shrink-0">
        <img
          src={recipe.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Difficulty Pill (Top Left) */}
        <div className={`absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-[6px] shadow-sm ${getDifficultyColorClass(recipe.difficulty)}`}>
          {recipe.difficulty}
        </div>

        {/* Cook Time (Bottom Right) */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-[6px] text-[#1A1A2E] text-xs font-extrabold shadow-sm flex items-center gap-1">
          <Clock size={12} className="text-[#E07B39]" />
          <span>{recipe.cookTime} m</span>
        </div>

        {/* Top Right action toggle */}
        {showRemoveIcon && onRemoveClick ? (
          <button
            id={`remove-icon-btn-${recipe.id}`}
            onClick={(e) => onRemoveClick(recipe.id, e)}
            className="absolute top-3 right-3 p-2 bg-white/95 rounded-full text-[#E07B39] hover:bg-[#E07B39] hover:text-white shadow-sm transition-all cursor-pointer active:scale-90"
            title="Remove from Cookbook"
          >
            <Trash2 size={16} />
          </button>
        ) : (
          <button
            id={`save-icon-btn-${recipe.id}`}
            onClick={(e) => onToggleSave(recipe.id, e)}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-sm transition-all cursor-pointer active:scale-95 ${
              isSavedInCookbook
                ? "bg-[#E07B39] text-[#F5F0E8] hover:bg-[#c56525]"
                : "bg-white/95 text-[#1A1A2E] hover:bg-[#E07B39] hover:text-white"
            }`}
            title={isSavedInCookbook ? "Remove from Cookbook" : "Save to Cookbook"}
          >
            <Heart size={16} fill={isSavedInCookbook ? "currentColor" : "none"} className={isSavedInCookbook ? "scale-110" : ""} />
          </button>
        )}
      </div>

      {/* Details Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="mb-4">
          <span className="text-[10px] font-bold text-[#E07B39] uppercase tracking-widest">{recipe.mealType}</span>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1A1A2E] leading-tight mt-1 mb-2 line-clamp-2">
            {recipe.title}
          </h3>
          <p className="text-[#1A1A2E]/60 text-xs font-semibold">
            {recipe.ingredients.length} ingredients • Traditional style
          </p>
        </div>

        {/* View Recipe Action (lifts on hover, CTA button fades in) */}
        <button
          id={`view-recipe-btn-${recipe.id}`}
          onClick={() => onViewClick(recipe)}
          className="w-full py-2.5 rounded-[12px] bg-[#F5F0E8] text-[#1A1A2E] font-extrabold text-xs sm:text-sm tracking-wide border border-transparent hover:border-[#E07B39] group-hover:bg-[#E07B39] group-hover:text-[#F5F0E8] transition-all duration-300 shadow-sm cursor-pointer"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}
