import { apiRequest } from "./queryClient";
import { Recipe, RecipeFilter } from "@shared/schema";

export interface MoodAnalysisResult {
  analysisId: string;
  sessionId: string;
  detectedMood: string;
  confidence: number;
  moodTags: string[];
  recommendedRecipes: Recipe[];
}

export async function analyzeImageMood(file: File, sessionId?: string): Promise<MoodAnalysisResult> {
  const formData = new FormData();
  formData.append('image', file);
  if (sessionId) {
    formData.append('sessionId', sessionId);
  }

  const response = await fetch('/api/mood/analyze-image', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to analyze image: ${error}`);
  }

  return response.json();
}

export async function analyzeTextMood(text: string, sessionId?: string): Promise<MoodAnalysisResult> {
  const response = await apiRequest('POST', '/api/mood/analyze-text', {
    text,
    sessionId,
  });

  return response.json();
}

export async function fetchRecipes(filter?: RecipeFilter): Promise<Recipe[]> {
  const params = new URLSearchParams();
  if (filter) {
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v));
        } else {
          params.append(key, value.toString());
        }
      }
    });
  }

  const url = `/api/recipes${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await apiRequest('GET', url);
  return response.json();
}

export async function fetchRecipe(id: string): Promise<Recipe> {
  const response = await apiRequest('GET', `/api/recipes/${id}`);
  return response.json();
}

export async function fetchRecipesByMood(mood: string): Promise<Recipe[]> {
  const response = await apiRequest('GET', `/api/recipes/mood/${mood}`);
  return response.json();
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  const response = await apiRequest('GET', `/api/recipes/search/${encodeURIComponent(query)}`);
  return response.json();
}
