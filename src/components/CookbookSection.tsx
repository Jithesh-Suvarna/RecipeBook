import React from "react";
import { Recipe } from "../types";
import RecipeCard from "./RecipeCard";
import EmptyState from "./EmptyState";

interface CookbookSectionProps {
  savedRecipes: Recipe[];
  onViewClick: (recipe: Recipe) => void;
  onRemoveFromSaved: (id: string, e: React.MouseEvent) => void;
  onSwitchToDiscover: () => void;
}

export default function CookbookSection({
  savedRecipes,
  onViewClick,
  onRemoveFromSaved,
  onSwitchToDiscover,
}: CookbookSectionProps) {
  const isCookbookEmpty = savedRecipes.length === 0;

  return (
    <div id="cookbook-section" className="space-y-6">
      {/* Cookbook Header info */}
      <div className="flex items-center justify-between border-b border-[#1A1A2E]/10 pb-4">
        <div>
          <h2 className="font-serif text-3xl font-extrabold text-[#1A1A2E]">My Personal Cookbook</h2>
          <p className="text-[#1A1A2E]/60 text-sm font-semibold mt-1">
            Access your curated kitchen favorites, anytime, on any device.
          </p>
        </div>
        <div className="bg-[#E07B39]/10 border border-[#E07B39]/20 text-[#E07B39] font-black text-sm px-4 py-2 rounded-xl shadow-sm">
          {savedRecipes.length} {savedRecipes.length === 1 ? "recipe" : "recipes"} saved
        </div>
      </div>

      {isCookbookEmpty ? (
        /* Empty State with CTA button */
        <EmptyState
          id="empty-cookbook-state"
          type="cookbook"
          title="Curate Your Flavor Collection"
          message="Your personal digital recipe organizer is currently empty. Explore the Discover tab to find recipes, click the heart icon, and build your custom notebook!"
          actionLabel="Go to Discover"
          onAction={onSwitchToDiscover}
        />
      ) : (
        /* Responsive Grid of saved cards */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {savedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isSavedInCookbook={true}
              showRemoveIcon={true} // Inside My Cookbook, show trash icon
              onViewClick={onViewClick}
              onToggleSave={() => {}} // Not needed because trash action replaces it
              onRemoveClick={onRemoveFromSaved}
            />
          ))}
        </div>
      )}
    </div>
  );
}
