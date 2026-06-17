import React from "react";
import { MealType, Difficulty } from "../types";

interface FilterBarProps {
  selectedMeal: MealType | "All";
  onMealChange: (meal: MealType | "All") => void;
  selectedDifficulty: Difficulty | "All";
  onDifficultyChange: (diff: Difficulty | "All") => void;
  selectedMaxTime: "Any" | "<15" | "<30" | "<60";
  onMaxTimeChange: (time: "Any" | "<15" | "<30" | "<60") => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export default function FilterBar({
  selectedMeal,
  onMealChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedMaxTime,
  onMaxTimeChange,
  onReset,
  hasActiveFilters,
}: FilterBarProps) {
  const mealTypes: (MealType | "All")[] = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack"];
  const difficulties: (Difficulty | "All")[] = ["All", "Easy", "Medium", "Hard"];
  const maxTimes: ("Any" | "<15" | "<30" | "<60")[] = ["Any", "<15", "<30", "<60"];

  return (
    <div id="filter-bar" className="flex flex-col gap-5 py-2 border-b border-[#1A1A2E]/10 pb-6 shrink-0 text-[#1A1A2E]">
      {/* Scrollable Row 1: Meal Categories */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
          {mealTypes.map((meal) => (
            <button
              key={meal}
              id={`meal-filter-${meal}`}
              onClick={() => onMealChange(meal)}
              className={`px-4 py-2 rounded-[12px] text-xs sm:text-sm font-semibold transition-all cursor-pointer border shrink-0 whitespace-nowrap whitespace-pre ${
                selectedMeal === meal
                  ? "bg-[#1A1A2E] text-[#F5F0E8] border-transparent shadow-sm"
                  : "bg-white text-[#1A1A2E]/70 border-[#1A1A2E]/10 hover:bg-[#F5F0E8]/50 hover:text-[#1A1A2E]"
              }`}
            >
              {meal === "All" ? "All Types" : meal}
            </button>
          ))}
        </div>

        {/* Legend for color coded difficulty levels */}
        <div className="flex gap-4 items-center text-[#1A1A2E]/70 text-xs sm:text-sm font-medium self-end md:self-auto select-none">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4CAF7D]" /> Easy
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F4C542]" /> Medium
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E07B39]" /> Hard
          </span>
        </div>
      </div>

      {/* Row 2: Difficulty & Cook Time Sub-filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-1 bg-white p-4 rounded-2xl border border-[#1A1A2E]/5 shadow-sm">
        <div className="flex flex-wrap items-center gap-6">
          {/* Difficulty Group */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#1A1A2E]/40">Difficulty</span>
            <div className="flex items-center gap-1.5 bg-[#F5F0E8] p-1 rounded-xl">
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  id={`diff-filter-${diff}`}
                  onClick={() => onDifficultyChange(diff)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedDifficulty === diff
                      ? "bg-[#1A1A2E] text-[#F5F0E8] shadow-sm"
                      : "text-[#1A1A2E]/60 hover:text-[#1A1A2E] hover:bg-white/50"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Cooking Time Limit Group */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#1A1A2E]/40">Max Ready Time</span>
            <div className="flex items-center gap-1.5 bg-[#F5F0E8] p-1 rounded-xl">
              {maxTimes.map((time) => (
                <button
                  key={time}
                  id={`time-filter-${time}`}
                  onClick={() => onMaxTimeChange(time)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedMaxTime === time
                      ? "bg-[#1A1A2E] text-[#F5F0E8] shadow-sm"
                      : "text-[#1A1A2E]/60 hover:text-[#1A1A2E] hover:bg-white/50"
                  }`}
                >
                  {time === "Any" ? "Any Time" : `${time} min`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action clear / reset helper */}
        {hasActiveFilters && (
          <button
            id="reset-filters-btn"
            onClick={onReset}
            className="text-xs font-bold text-[#E07B39] hover:text-[#c56525] hover:underline cursor-pointer py-1 px-3 bg-[#E07B39]/5 rounded-lg border border-[#E07B39]/10 transition-colors"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
}
