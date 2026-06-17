import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative h-[280px] w-full overflow-hidden shrink-0 bg-[#1A1A2E] flex flex-col items-center justify-center">
      {/* Parallax style animated food pattern SVG background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Animated decorative circles */}
          <circle cx="10%" cy="25%" r="45" fill="#E07B39" className="animate-pulse" />
          <circle cx="90%" cy="75%" r="65" fill="#F4C542" />
          
          {/* Wave and line patterns simulating cooking steam/aroma */}
          <path
            d="M 150,180 Q 180,140 210,180 T 270,180"
            stroke="#4CAF7D"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            className="opacity-60"
          />
          <path
            d="M 680,80 Q 710,40 740,80 T 800,80"
            stroke="#E07B39"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            className="opacity-70"
          />

          {/* Abstract small spice/parsley flakes */}
          <circle cx="28%" cy="70%" r="8" fill="#4CAF7D" />
          <circle cx="29%" cy="73%" r="6" fill="#4CAF7D" />
          <circle cx="31%" cy="69%" r="4" fill="#4CAF7D" />

          {/* Citrus segment emoji/shape helper or abstract seed */}
          <circle cx="75%" cy="30%" r="28" stroke="#F4C542" strokeWidth="6" strokeDasharray="10 4" />
          
          {/* Utensil abstraction shape representing organic geometry */}
          <rect x="83%" y="20%" width="8" height="60" rx="4" fill="#F5F0E8" transform="rotate(45 83% 20%)" opacity="0.3" />
          <circle cx="83%" cy="20%" r="14" fill="#F5F0E8" opacity="0.2" />
        </svg>
      </div>

      {/* Prominent Search Section */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 max-w-4xl text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-[#F5F0E8] leading-tight drop-shadow-sm select-none">
          What are we cooking <br className="sm:hidden" />
          <span className="text-[#E07B39]">today?</span>
        </h1>
        
        <div className="relative w-full max-w-2xl px-2">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search size={22} className="text-[#1A1A2E]/70" />
          </div>
          <input
            id="main-search-input"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search recipes, ingredients..."
            className="w-full bg-white text-[#1A1A2E] placeholder-[#1A1A2E]/50 pl-14 pr-6 py-4 rounded-2xl shadow-xl outline-none text-base sm:text-lg font-medium transition-all focus:ring-2 focus:ring-[#E07B39]/50 border border-black/5"
          />
          {value && (
            <button
              onClick={() => onChange("")}
              className="absolute inset-y-0 right-6 flex items-center text-[#1A1A2E]/50 hover:text-[#1A1A2E] text-sm font-semibold transition-colors pr-2"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
