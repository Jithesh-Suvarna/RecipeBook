import React, { useState, useEffect } from "react";
import { X, Sparkles, Plus, Trash2, Loader2, Info } from "lucide-react";
import { Recipe, MealType, Difficulty } from "../types";

interface AddRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRecipe: (recipe: Recipe) => void;
}

export default function AddRecipeModal({ isOpen, onClose, onAddRecipe }: AddRecipeModalProps) {
  // AI generation prompt sub-mode state
  const [showAiPrompt, setShowAiPrompt] = useState(false);
  const [aiPromptText, setAiPromptText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState("");

  // Base Form Fields State
  const [title, setTitle] = useState("");
  const [mealType, setMealType] = useState<MealType>("Dinner");
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [cookTime, setCookTime] = useState<number>(30);
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructionsText, setInstructionsText] = useState("");
  const [validationError, setValidationError] = useState("");

  // Clean form input fields when opened / closed
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setMealType("Dinner");
      setDifficulty("Medium");
      setCookTime(30);
      setImageUrl("");
      setIngredients([""]);
      setInstructionsText("");
      setAiPromptText("");
      setShowAiPrompt(false);
      setValidationError("");
      setAiError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Ingredients row management
  const handleIngredientChange = (index: number, val: string) => {
    const updated = [...ingredients];
    updated[index] = val;
    setIngredients(updated);
  };

  const addIngredientRow = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredientRow = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, idx) => idx !== index));
    } else {
      setIngredients([""]);
    }
  };

  // Submit action logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Trim validation checks
    const finalTitle = title.trim();
    if (!finalTitle) {
      setValidationError("Please specify a valid recipe title.");
      return;
    }

    const validIngredients = ingredients.map(i => i.trim()).filter(i => i.length > 0);
    if (validIngredients.length === 0) {
      setValidationError("Please specify at least one valid ingredient.");
      return;
    }

    const rawInstructions = instructionsText
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const finalInstructions = rawInstructions.length > 0
      ? rawInstructions
      : ["Prepare ingredients accordingly.", "Combine ingredients and cook to choice.", "Plate, garnish, and serve warm."];

    // Build the recipe object
    const newRecipe: Recipe = {
      id: `custom-${Date.now()}`,
      title: finalTitle,
      mealType,
      difficulty,
      cookTime: cookTime > 0 ? cookTime : 15,
      imageUrl: imageUrl.trim() || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
      ingredients: validIngredients,
      instructions: finalInstructions,
      nutrition: {
        calories: Math.floor(Math.random() * 320) + 220, // realistic randomized fallback values
        protein: `${Math.floor(Math.random() * 20) + 10}g`,
        carbs: `${Math.floor(Math.random() * 40) + 20}g`,
        fat: `${Math.floor(Math.random() * 15) + 5}g`,
      },
    };

    onAddRecipe(newRecipe);
    onClose();
  };

  // call local full-stack server-side REST endpoint powered by prompt
  const handleGenerateWithAi = async () => {
    setAiError("");
    const finalPrompt = aiPromptText.trim();
    if (!finalPrompt) {
      setAiError("Please type a quick idea to generate. (e.g. 'French Toast')");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with code ${response.status}`);
      }

      const generatedRecipe = await response.json();

      // Autofill fields
      if (generatedRecipe.title) setTitle(generatedRecipe.title);
      if (generatedRecipe.mealType) setMealType(generatedRecipe.mealType);
      if (generatedRecipe.difficulty) setDifficulty(generatedRecipe.difficulty);
      if (generatedRecipe.cookTime) setCookTime(generatedRecipe.cookTime);
      if (generatedRecipe.imageUrl) setImageUrl(generatedRecipe.imageUrl);
      
      if (Array.isArray(generatedRecipe.ingredients)) {
        setIngredients(generatedRecipe.ingredients);
      }
      
      if (Array.isArray(generatedRecipe.instructions)) {
        setInstructionsText(generatedRecipe.instructions.join("\n"));
      }

      // Hide toggle area
      setShowAiPrompt(false);
      setAiPromptText("");
    } catch (e: any) {
      console.error("AI Generation Failure:", e);
      setAiError(e.message || "Failed to generate recipe. Check server logs.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      id="add-recipe-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-[#1A1A2E]/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        id="add-recipe-content"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#F5F0E8] text-[#1A1A2E] rounded-[20px] overflow-hidden shadow-2xl transition-all border border-black/5 flex flex-col max-h-[90vh]"
      >
        {/* Header Title */}
        <div className="p-6 border-b border-black/10 flex items-center justify-between bg-[#1A1A2E] text-[#F5F0E8] shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-[#E07B39]" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold">Add Custom Recipe</h2>
          </div>
          <button
            id="close-add-modal-btn"
            onClick={onClose}
            className="p-1 rounded-full text-[#F5F0E8]/70 hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content Form Area */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* AI Generator Integration section */}
          <div className="bg-white rounded-[12px] p-4 border border-[#E07B39]/20 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-[#E07B39] uppercase tracking-wider">
                <Sparkles size={14} className="animate-spin text-[#F4C542]" />
                Gemini Recipe Creator
              </span>
              <button
                id="toggle-ai-prompt-btn"
                type="button"
                onClick={() => {
                  setShowAiPrompt(!showAiPrompt);
                  setAiError("");
                }}
                className="px-3 py-1 bg-[#E07B39]/10 text-[#E07B39] text-xs font-extrabold rounded-lg hover:bg-[#E07B39] hover:text-white transition-all cursor-pointer"
              >
                {showAiPrompt ? "Collapse AI" : "✨ Create with Gemini"}
              </button>
            </div>

            {showAiPrompt ? (
              <div id="ai-prompt-controls" className="space-y-3 pt-2">
                <p className="text-[11px] text-[#1A1A2E]/60 leading-relaxed font-semibold">
                  Specify details like ingredients or style (e.g. "vegan chocolate dessert" or "spicy Indian chicken") and Gemini 3.5 Flash will automatically form ingredients checklist, preparation times, metadata, and detailed instructions!
                </p>
                <div className="flex gap-2">
                  <input
                    id="ai-prompt-input"
                    type="text"
                    value={aiPromptText}
                    onChange={(e) => setAiPromptText(e.target.value)}
                    placeholder="E.g., garlic butter shrimp pasta..."
                    disabled={isGenerating}
                    className="flex-1 bg-[#F5F0E8] border border-black/10 rounded-lg px-3 py-2 text-sm text-[#1A1A2E] outline-none focus:ring-1 focus:ring-[#E07B39]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleGenerateWithAi();
                    }}
                  />
                  <button
                    id="ai-generate-submit-btn"
                    type="button"
                    onClick={handleGenerateWithAi}
                    disabled={isGenerating}
                    className="px-4 py-2 bg-[#E07B39] text-[#F5F0E8] font-bold text-xs rounded-lg hover:bg-[#c56525] transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        <span>Working...</span>
                      </>
                    ) : (
                      <span>Generate</span>
                    )}
                  </button>
                </div>
                {aiError && (
                  <p className="text-xs text-[#E07B39] font-bold mt-1">⚠️ {aiError}</p>
                )}
                <div className="flex items-start gap-1 p-2 bg-[#F5F0E8] rounded-lg">
                  <Info size={12} className="text-zinc-500 shrink-0 mt-0.5" />
                  <span className="text-[10px] text-zinc-600 leading-normal font-semibold">
                    Note: Powered directly by the robust Gemini 3.5 Flash model on the backend server.
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Core Custom Recipe Add Form */}
          <form id="custom-recipe-form" onSubmit={handleSubmit} className="space-y-5">
            {/* Title field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A2E]/60">Recipe Title *</label>
              <input
                id="form-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., Grandmama's Secret Apple Pie"
                className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2.5 text-sm text-[#1A1A2E] outline-none focus:ring-1 focus:ring-[#E07B39] font-medium"
              />
            </div>

            {/* Meal Type & Difficulty Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A2E]/60">Meal Type</label>
                <select
                  id="form-mealtype"
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value as MealType)}
                  className="w-full bg-white border border-black/10 rounded-xl px-3 py-2.5 text-sm text-[#1A1A2E] outline-none focus:ring-1 focus:ring-[#E07B39] font-medium"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A2E]/60">Difficulty</label>
                <select
                  id="form-difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                  className="w-full bg-white border border-black/10 rounded-xl px-3 py-2.5 text-sm text-[#1A1A2E] outline-none focus:ring-1 focus:ring-[#E07B39] font-medium"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Cook Time & Image Url Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A2E]/60">Cook Time (min)</label>
                <input
                  id="form-cooktime"
                  type="number"
                  min="1"
                  value={cookTime}
                  onChange={(e) => setCookTime(parseInt(e.target.value) || 0)}
                  className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2.5 text-sm text-[#1A1A2E] outline-none focus:ring-1 focus:ring-[#E07B39] font-medium"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A2E]/60">Image Link URL</label>
                <input
                  id="form-imageurl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2.5 text-sm text-[#1A1A2E] outline-none focus:ring-1 focus:ring-[#E07B39] font-medium"
                />
              </div>
            </div>

            {/* Ingredients Checklist input fields dynamic container */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-black/15 pb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A2E]/60">Ingredients *</label>
                <button
                  id="add-ingredient-row-btn"
                  type="button"
                  onClick={addIngredientRow}
                  className="flex items-center gap-1.5 text-xs text-[#E07B39] font-extrabold hover:underline hover:text-[#c56525] cursor-pointer"
                >
                  <Plus size={14} /> Add Ingredient Row
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {ingredients.map((ing, idx) => (
                  <div key={idx} id={`form-ingredient-row-${idx}`} className="flex items-center gap-2">
                    <input
                      id={`form-ingredient-input-${idx}`}
                      type="text"
                      required={idx === 0}
                      value={ing}
                      onChange={(e) => handleIngredientChange(idx, e.target.value)}
                      placeholder={`Ingredient #${idx + 1} with measurement`}
                      className="flex-1 bg-white border border-black/10 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#1A1A2E] outline-none focus:ring-1 focus:ring-[#E07B39] font-medium"
                    />
                    <button
                      id={`remove-ingredient-row-btn-${idx}`}
                      type="button"
                      onClick={() => removeIngredientRow(idx)}
                      className="p-2 text-[#E07B39] hover:bg-white rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Instruction Steps textarea input field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A2E]/60">Step-by-Step Instructions</label>
              <textarea
                id="form-instructions"
                rows={4}
                value={instructionsText}
                onChange={(e) => setInstructionsText(e.target.value)}
                placeholder="Type each cooking step on a new line..."
                className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1A1A2E] outline-none focus:ring-1 focus:ring-[#E07B39] font-medium leading-relaxed"
              />
            </div>

            {/* Validation errors warning message panel */}
            {validationError && (
              <p className="text-xs text-[#E07B39] font-black mt-2">🚫 {validationError}</p>
            )}

            {/* Active Submit Buttons row inside container */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-black/10">
              <button
                id="cancel-add-btn"
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-zinc-200 text-[#1A1A2E] text-xs sm:text-sm font-bold rounded-xl hover:bg-zinc-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="submit-add-btn"
                type="submit"
                className="px-5 py-2 bg-[#E07B39] text-[#F5F0E8] text-xs sm:text-sm font-extrabold rounded-xl hover:bg-[#c56525] transition-colors cursor-pointer shadow active:scale-95 flex items-center gap-1.5"
              >
                <Plus size={16} /> Add Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
