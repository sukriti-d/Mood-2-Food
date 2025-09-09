import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { imageAnalysisSchema, textAnalysisSchema, recipeFilterSchema } from "@shared/schema";
import { analyzeImageEmotion, analyzeTextSentiment, mapEmotionToMoodTags } from "./services/huggingface";
import multer from "multer";

// Configure multer for image uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Analyze mood from uploaded image
  app.post("/api/mood/analyze-image", upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      const sessionId = req.body.sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Convert buffer to base64
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      
      // Analyze emotion using Hugging Face
      const emotionResult = await analyzeImageEmotion(base64Image);
      
      // Map emotion to mood tags for recipe recommendation
      const moodTags = mapEmotionToMoodTags(emotionResult.emotion);
      
      // Get recommended recipes
      const recommendedRecipes = await storage.getRecipesByMood(moodTags[0]);
      const recipeIds = recommendedRecipes.slice(0, 6).map(recipe => recipe.id);
      
      // Store mood analysis
      const analysis = await storage.createMoodAnalysis({
        sessionId,
        detectionType: "image",
        inputData: { imagePath: "uploaded_image" }, // In production, store actual image path
        detectedMood: emotionResult.emotion,
        confidence: emotionResult.confidence.toString(),
        aiResponse: emotionResult.rawResponse,
        recommendedRecipes: recipeIds,
      });

      res.json({
        analysisId: analysis.id,
        sessionId,
        detectedMood: emotionResult.emotion,
        confidence: emotionResult.confidence,
        moodTags,
        recommendedRecipes: recommendedRecipes.slice(0, 6),
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      res.status(500).json({ message: "Error analyzing image mood" });
    }
  });

  // Analyze mood from text
  app.post("/api/mood/analyze-text", async (req, res) => {
    try {
      const validationResult = textAnalysisSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid request data", errors: validationResult.error.errors });
      }

      const { text, sessionId: providedSessionId } = validationResult.data;
      const sessionId = providedSessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Analyze sentiment using Hugging Face
      const sentimentResult = await analyzeTextSentiment(text);
      
      // Map emotion to mood tags for recipe recommendation
      const moodTags = mapEmotionToMoodTags(sentimentResult.emotion);
      
      // Get recommended recipes
      const recommendedRecipes = await storage.getRecipesByMood(moodTags[0]);
      const recipeIds = recommendedRecipes.slice(0, 6).map(recipe => recipe.id);
      
      // Store mood analysis
      const analysis = await storage.createMoodAnalysis({
        sessionId,
        detectionType: "text",
        inputData: { text },
        detectedMood: sentimentResult.emotion,
        confidence: sentimentResult.confidence.toString(),
        aiResponse: sentimentResult.rawResponse,
        recommendedRecipes: recipeIds,
      });

      res.json({
        analysisId: analysis.id,
        sessionId,
        detectedMood: sentimentResult.emotion,
        confidence: sentimentResult.confidence,
        moodTags,
        recommendedRecipes: recommendedRecipes.slice(0, 6),
      });
    } catch (error) {
      console.error("Error analyzing text:", error);
      res.status(500).json({ message: "Error analyzing text mood" });
    }
  });

  // Get recipes with optional filtering
  app.get("/api/recipes", async (req, res) => {
    try {
      const filterResult = recipeFilterSchema.safeParse(req.query);
      if (!filterResult.success) {
        return res.status(400).json({ message: "Invalid filter parameters" });
      }

      const recipes = await storage.getRecipes(filterResult.data);
      res.json(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      res.status(500).json({ message: "Error fetching recipes" });
    }
  });

  // Get a specific recipe by ID
  app.get("/api/recipes/:id", async (req, res) => {
    try {
      const recipe = await storage.getRecipe(req.params.id);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json(recipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      res.status(500).json({ message: "Error fetching recipe" });
    }
  });

  // Search recipes
  app.get("/api/recipes/search/:query", async (req, res) => {
    try {
      const { query } = req.params;
      if (!query || query.trim().length === 0) {
        return res.status(400).json({ message: "Search query is required" });
      }

      const recipes = await storage.searchRecipes(query);
      res.json(recipes);
    } catch (error) {
      console.error("Error searching recipes:", error);
      res.status(500).json({ message: "Error searching recipes" });
    }
  });

  // Get recipes by mood
  app.get("/api/recipes/mood/:mood", async (req, res) => {
    try {
      const { mood } = req.params;
      const recipes = await storage.getRecipesByMood(mood);
      res.json(recipes);
    } catch (error) {
      console.error("Error fetching recipes by mood:", error);
      res.status(500).json({ message: "Error fetching recipes by mood" });
    }
  });

  // Get mood analysis by session
  app.get("/api/mood/session/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const analyses = await storage.getMoodAnalysisBySession(sessionId);
      res.json(analyses);
    } catch (error) {
      console.error("Error fetching mood analysis:", error);
      res.status(500).json({ message: "Error fetching mood analysis" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
