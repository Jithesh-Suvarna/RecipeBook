import React from "react";
import { BookMarked, ChefHat, Plus } from "lucide-react";

interface NavbarProps {
  currentTab: "Discover" | "Cookbook";
  setTab: (tab: "Discover" | "Cookbook") => void;
  savedCount: number;
  onAddRecipeClick: () => void;
}

export default function Navbar({ currentTab, setTab, savedCount, onAddRecipeClick }: NavbarProps) {
  return (
    <nav
      id="main-navbar"
      className="sticky top-0 z-40 w-full bg-[#1A1A2E]/95 backdrop-blur-md border-b border-[#F5F0E8]/10 text-[#F5F0E8] shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: App Logo & Wordmark */}
          <div
            id="navbar-logo"
            onClick={() => setTab("Discover")}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer hover:opacity-90 transition-opacity shrink-0"
          >
            <div className="p-1 sm:p-1.5 bg-[#E07B39] rounded-lg text-[#F5F0E8]">
              <ChefHat size={18} className="sm:size-5 stroke-[2.2]" />
            </div>
            <span className="font-serif text-base min-[380px]:text-lg sm:text-2xl font-bold tracking-tight text-[#F5F0E8] select-none">
              Recipe<span className="text-[#E07B39] hidden min-[340px]:inline">Book</span>
            </span>
          </div>

          {/* Center: Tab Switcher (Discover vs. Cookbook) */}
          <div id="navbar-tabs" className="flex items-center gap-1 sm:gap-2 mx-1 sm:mx-2">
            <button
              id="tab-discover-btn"
              onClick={() => setTab("Discover")}
              className={`px-2 py-1 sm:px-4 sm:py-2 text-[11px] min-[380px]:text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                currentTab === "Discover"
                  ? "bg-[#E07B39] text-[#F5F0E8]"
                  : "text-[#F5F0E8]/80 hover:text-[#F5F0E8] hover:bg-[#F5F0E8]/5"
              }`}
            >
              Discover
            </button>
            <button
              id="tab-cookbook-btn"
              onClick={() => setTab("Cookbook")}
              className={`px-2 py-1 sm:px-4 sm:py-2 text-[11px] min-[380px]:text-xs sm:text-sm font-bold rounded-lg flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
                currentTab === "Cookbook"
                  ? "bg-[#E07B39] text-[#F5F0E8]"
                  : "text-[#F5F0E8]/80 hover:text-[#F5F0E8] hover:bg-[#F5F0E8]/5"
              }`}
            >
              <span className="hidden min-[480px]:inline">My </span>Cookbook
              <span
                id="saved-count-badge"
                className={`text-[9px] sm:text-xs px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full font-bold transition-all ${
                  currentTab === "Cookbook"
                    ? "bg-[#1A1A2E] text-[#E07B39]"
                    : "bg-[#E07B39] text-[#F5F0E8]"
                }`}
              >
                {savedCount}
              </span>
            </button>
          </div>

          {/* Right: + Add Recipe CTA Button */}
          <div id="navbar-actions" className="shrink-0">
            <button
              id="add-recipe-navbar-btn"
              onClick={onAddRecipeClick}
              className="flex items-center gap-1 px-2.5 py-1 sm:px-4 sm:py-2 bg-[#E07B39] hover:bg-[#c56525] text-[#F5F0E8] text-[11px] min-[380px]:text-xs sm:text-sm font-bold rounded-[10px] sm:rounded-[12px] shadow transition-all active:scale-95 cursor-pointer"
            >
              <Plus size={14} className="sm:size-4" />
              <span className="hidden sm:inline">Add Recipe</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
