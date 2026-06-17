import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client accessor
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY or VITE_GEMINI_API_KEY environment variable is required.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// REST API endpoint for generating recipes with Gemini AI
app.post("/api/generate-recipe", async (req, res): Promise<any> => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "No prompt specified." });
    }

    const ai = getGeminiClient();
    const systemPrompt = `You are a recipe assistant. Return ONLY a JSON object (no markdown, no explanation) matching the exact schema requested.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate a detailed recipe for: "${prompt}".`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "mealType", "difficulty", "cookTime", "imageUrl", "ingredients", "instructions", "nutrition"],
          properties: {
            title: {
              type: Type.STRING,
              description: "The title of the recipe.",
            },
            mealType: {
              type: Type.STRING,
              enum: ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"],
              description: "The meal category for this recipe.",
            },
            difficulty: {
              type: Type.STRING,
              enum: ["Easy", "Medium", "Hard"],
              description: "The difficulty level of preparing this recipe.",
            },
            cookTime: {
              type: Type.INTEGER,
              description: "The total preparation and cook time in minutes.",
            },
            imageUrl: {
              type: Type.STRING,
              description: "A suitable Unsplash image URL for this dish, or an empty string.",
            },
            ingredients: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of ingredients with quantities.",
            },
            instructions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Step-by-step instructions.",
            },
            nutrition: {
              type: Type.OBJECT,
              required: ["calories", "protein", "carbs", "fat"],
              properties: {
                calories: { type: Type.INTEGER, description: "Total calories per serving." },
                protein: { type: Type.STRING, description: "Protein content e.g., '25g'." },
                carbs: { type: Type.STRING, description: "Carbohydrates content e.g., '40g'." },
                fat: { type: Type.STRING, description: "Fat content e.g., '12g'." },
              },
            },
          },
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response content generated from Gemini model.");
    }
    
    // Parse the JSON directly
    const recipeObject = JSON.parse(text);

    // Fallback Unsplash query based on recipe title if imageUrl is empty
    if (!recipeObject.imageUrl || recipeObject.imageUrl === "") {
      const query = encodeURIComponent(recipeObject.title);
      recipeObject.imageUrl = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800&q=80`; // Safe premium placeholder, or dynamic search placeholder
    }

    return res.json(recipeObject);
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    return res.status(500).json({
      error: error.message || "An unexpected error occurred during recipe generation.",
    });
  }
});

// Configure Vite middleware or serve static static files
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

initServer().catch((err) => {
  console.error("Failed to start server:", err);
});
