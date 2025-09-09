import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const recipes = pgTable("recipes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  cookTime: integer("cook_time").notNull(), // in minutes
  difficulty: varchar("difficulty", { length: 20 }).notNull(), // easy, medium, hard
  cuisine: text("cuisine"),
  category: text("category"), // breakfast, lunch, dinner, snack, dessert
  ingredients: jsonb("ingredients").$type<string[]>().notNull(),
  instructions: jsonb("instructions").$type<string[]>().notNull(),
  nutrition: jsonb("nutrition").$type<{
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  }>(),
  dietaryTags: jsonb("dietary_tags").$type<string[]>().default([]), // vegan, vegetarian, gluten-free, etc.
  moodTags: jsonb("mood_tags").$type<string[]>().notNull(), // happy, sad, stressed, energetic, calm, etc.
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  reviewCount: integer("review_count").default(0),
  isActive: boolean("is_active").default(true),
});

export const moodAnalysis = pgTable("mood_analysis", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id"),
  detectionType: varchar("detection_type", { length: 20 }).notNull(), // 'image' or 'text'
  inputData: jsonb("input_data"), // stores image path or text content
  detectedMood: text("detected_mood").notNull(),
  confidence: decimal("confidence", { precision: 5, scale: 4 }).notNull(),
  aiResponse: jsonb("ai_response"), // full AI response for debugging
  recommendedRecipes: jsonb("recommended_recipes").$type<string[]>(), // recipe IDs
  createdAt: varchar("created_at").default(sql`now()`),
});

export const userPreferences = pgTable("user_preferences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  sessionId: text("session_id"), // for anonymous users
  dietaryRestrictions: jsonb("dietary_restrictions").$type<string[]>().default([]),
  allergies: jsonb("allergies").$type<string[]>().default([]),
  preferredCuisines: jsonb("preferred_cuisines").$type<string[]>().default([]),
  dislikedIngredients: jsonb("disliked_ingredients").$type<string[]>().default([]),
  favoriteRecipes: jsonb("favorite_recipes").$type<string[]>().default([]),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertRecipeSchema = createInsertSchema(recipes).omit({
  id: true,
  rating: true,
  reviewCount: true,
  isActive: true,
});

export const insertMoodAnalysisSchema = createInsertSchema(moodAnalysis).omit({
  id: true,
  createdAt: true,
});

export const insertUserPreferencesSchema = createInsertSchema(userPreferences).omit({
  id: true,
});

// Mood detection request schemas
export const imageAnalysisSchema = z.object({
  imageData: z.string(), // base64 encoded image
  sessionId: z.string().optional(),
});

export const textAnalysisSchema = z.object({
  text: z.string().min(1, "Text cannot be empty"),
  sessionId: z.string().optional(),
});

export const recipeFilterSchema = z.object({
  mood: z.string().optional(),
  cuisine: z.string().optional(),
  dietaryTags: z.array(z.string()).optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  maxCookTime: z.number().optional(),
  category: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type Recipe = typeof recipes.$inferSelect;
export type InsertMoodAnalysis = z.infer<typeof insertMoodAnalysisSchema>;
export type MoodAnalysis = typeof moodAnalysis.$inferSelect;
export type InsertUserPreferences = z.infer<typeof insertUserPreferencesSchema>;
export type UserPreferences = typeof userPreferences.$inferSelect;
export type ImageAnalysisRequest = z.infer<typeof imageAnalysisSchema>;
export type TextAnalysisRequest = z.infer<typeof textAnalysisSchema>;
export type RecipeFilter = z.infer<typeof recipeFilterSchema>;
