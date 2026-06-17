import React from "react";
import { Search, BookOpen, Filter } from "lucide-react";

interface EmptyStateProps {
  id: string;
  type: "search" | "filter" | "cookbook";
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ id, type, title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div
      id={id}
      className="flex flex-col items-center justify-center text-center p-8 md:p-16 max-w-md mx-auto my-12 bg-[#F5F0E8] rounded-[12px] text-[#1A1A2E] shadow-lg animate-fade-in"
    >
      <div className="p-4 rounded-full bg-[#E07B39]/10 text-[#E07B39] mb-4">
        {type === "search" && <Search size={40} className="stroke-[1.5]" />}
        {type === "filter" && <Filter size={40} className="stroke-[1.5]" />}
        {type === "cookbook" && <BookOpen size={40} className="stroke-[1.5]" />}
      </div>
      
      <h3 className="font-serif text-2xl font-semibold tracking-tight leading-8 mb-2">
        {title || (type === "search" ? "No results found" : type === "filter" ? "No matches found" : "Your Cookbook is Empty")}
      </h3>
      
      <p className="text-sm text-[#1A1A2E]/80 leading-relaxed mb-6">
        {message}
      </p>

      {onAction && actionLabel && (
        <button
          id={`${id}-action-btn`}
          onClick={onAction}
          className="px-6 py-2.5 bg-[#E07B39] text-[#F5F0E8] text-sm font-medium rounded-lg hover:bg-[#c56525] transition-all cursor-pointer shadow-sm hover:shadow active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
