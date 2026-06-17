import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import AddRecipeModal from "./components/AddRecipeModal";
import CookbookSection from "./components/CookbookSection";
import EmptyState from "./components/EmptyState";
import { useCookbook } from "./hooks/useCookbook";
import { useFilters } from "./hooks/useFilters";
import { Recipe } from "./types";

export default function App() {
  const [currentTab, setCurrentTab] = useState<"Discover" | "Cookbook">("Discover");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  // Modals state controllers
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Hook 1: Persistence engine (sample & custom recipes, cookbook IDs)
  const {
    savedIds,
    allRecipes,
    isSaved,
    toggleCookbook,
    removeCookbook,
    addCustomRecipe,
  } = useCookbook();

  // Hook 2: State manager for search queries & filter variables
  const {
    filters,
    resetFilters,
    updateFilter,
    filterRecipes,
  } = useFilters();

  // Switch tabs (resets active filters on switch as specified in the rules)
  const handleTabChange = (tab: "Discover" | "Cookbook") => {
    setCurrentTab(tab);
    resetFilters();
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsDetailOpen(true);
  };

  const handleToggleCookbookFromCard = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCookbook(id);
  };

  const handleRemoveFromSaved = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeCookbook(id);
  };

  // Filter recipes according to filters & current search query inputs
  const matchedRecipes = filterRecipes(allRecipes);

  // Cookbook recipes slice filtered according to search query input
  const savedRecipesList = allRecipes.filter((recipe) => savedIds.includes(recipe.id));
  const matchedSavedRecipes = filterRecipes(savedRecipesList);

  const hasAnyActiveFilter = 
    filters.mealType !== "All" ||
    filters.difficulty !== "All" ||
    filters.maxTime !== "Any" ||
    filters.query.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-[#F5F0E8] overflow-x-hidden flex flex-col font-sans">
      {/* Sticky Header Navbar */}
      <Navbar
        currentTab={currentTab}
        setTab={handleTabChange}
        savedCount={savedIds.length}
        onAddRecipeClick={() => setIsAddOpen(true)}
      />

      {/* Prominent Parallax Hero Banner + Embedded Search input (only displayed on Discover tab) */}
      {currentTab === "Discover" && (
        <SearchBar
          value={filters.query}
          onChange={(val) => updateFilter("query", val)}
        />
      )}

      {/* Main Main Content Container - layout with custom curved top representing a premium bento style */}
      <main className="flex-1 bg-[#F5F0E8] rounded-t-[32px] sm:rounded-t-[48px] p-4 sm:p-6 md:p-10 flex flex-col gap-8 shadow-[0_-15px_30px_rgba(0,0,0,0.3)] mt-1 shrink-0">
        
        {currentTab === "Discover" ? (
          /* ================= DISCOVER RECIPES TAB ================= */
          <div className="space-y-6 max-w-7xl mx-auto w-full">
            {/* Horizontal Filter Pill Rows & Legenda */}
            <FilterBar
              selectedMeal={filters.mealType}
              onMealChange={(val) => updateFilter("mealType", val)}
              selectedDifficulty={filters.difficulty}
              onDifficultyChange={(val) => updateFilter("difficulty", val)}
              selectedMaxTime={filters.maxTime}
              onMaxTimeChange={(val) => updateFilter("maxTime", val)}
              onReset={resetFilters}
              hasActiveFilters={hasAnyActiveFilter}
            />

            {/* Main grid / Empty feedback state */}
            {matchedRecipes.length === 0 ? (
              filters.query.trim() ? (
                /* No search results empty feedback */
                <EmptyState
                  id="search-empty-state"
                  type="search"
                  title="No recipes found"
                  message={`We couldn't find any recipes matching "${filters.query}". Try searching for dynamic options or ingredients like "avocado", "spinach", "egg", or "flour"!`}
                  actionLabel="Clear Search Filter"
                  onAction={() => updateFilter("query", "")}
                />
              ) : (
                /* Filter matched empty state feedback */
                <EmptyState
                  id="filter-empty-state"
                  type="filter"
                  title="No matches found"
                  message={`There are currently no [${filters.mealType}] level recipes matching your active prep difficulty and time limits. Try readjusting the criteria rows.`}
                  actionLabel="Reset All Criteria"
                  onAction={resetFilters}
                />
              )
            ) : (
              /* Beautiful Responsive Card Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {matchedRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isSavedInCookbook={isSaved(recipe.id)}
                    showRemoveIcon={false}
                    onViewClick={handleViewRecipe}
                    onToggleSave={handleToggleCookbookFromCard}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ================= MY COOKBOOK TAB ================= */
          <div className="max-w-7xl mx-auto w-full">
            {/* Optional mini search inside cookbook if they have records */}
            {savedIds.length > 0 && (
              <div className="mb-6 max-w-md bg-white p-2 rounded-xl flex items-center border border-black/5 shadow-sm">
                <input
                  id="cookbook-inline-search"
                  type="text"
                  placeholder="Filter saved favourites..."
                  value={filters.query}
                  onChange={(e) => updateFilter("query", e.target.value)}
                  className="flex-1 text-sm bg-transparent border-none text-[#1A1A2E] pl-2 outline-none"
                />
                {filters.query && (
                  <button
                    onClick={() => updateFilter("query", "")}
                    className="text-xs font-bold text-[#E07B39] px-2"
                  >
                    Clear
                  </button>
                )}
              </div>
            )}

            <CookbookSection
              savedRecipes={matchedSavedRecipes}
              onViewClick={handleViewRecipe}
              onRemoveFromSaved={handleRemoveFromSaved}
              onSwitchToDiscover={() => handleTabChange("Discover")}
            />
          </div>
        )}
      </main>

      {/* Detail Overlay Sheet / Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedRecipe(null);
        }}
        isSaved={selectedRecipe ? isSaved(selectedRecipe.id) : false}
        onToggleSave={toggleCookbook}
      />

      {/* Creation Custom Recipe Modal Form */}
      <AddRecipeModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddRecipe={addCustomRecipe}
      />
    </div>
  );
}
