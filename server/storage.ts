import { type User, type InsertUser, type Recipe, type InsertRecipe, type MoodAnalysis, type InsertMoodAnalysis, type UserPreferences, type InsertUserPreferences, type RecipeFilter } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Recipe operations
  getRecipe(id: string): Promise<Recipe | undefined>;
  getRecipes(filter?: RecipeFilter): Promise<Recipe[]>;
  getRecipesByMood(mood: string): Promise<Recipe[]>;
  createRecipe(recipe: InsertRecipe): Promise<Recipe>;
  searchRecipes(query: string): Promise<Recipe[]>;

  // Mood analysis operations
  getMoodAnalysis(id: string): Promise<MoodAnalysis | undefined>;
  createMoodAnalysis(analysis: InsertMoodAnalysis): Promise<MoodAnalysis>;
  getMoodAnalysisBySession(sessionId: string): Promise<MoodAnalysis[]>;

  // User preferences operations
  getUserPreferences(userId?: string, sessionId?: string): Promise<UserPreferences | undefined>;
  createUserPreferences(preferences: InsertUserPreferences): Promise<UserPreferences>;
  updateUserPreferences(id: string, preferences: Partial<InsertUserPreferences>): Promise<UserPreferences | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private recipes: Map<string, Recipe>;
  private moodAnalyses: Map<string, MoodAnalysis>;
  private userPreferences: Map<string, UserPreferences>;

  constructor() {
    this.users = new Map();
    this.recipes = new Map();
    this.moodAnalyses = new Map();
    this.userPreferences = new Map();
    this.seedRecipes();
  }

  private seedRecipes() {
    const sampleRecipes: InsertRecipe[] = [
      {
        title: "Rainbow Energy Bowl",
        description: "A vibrant smoothie bowl packed with superfoods to boost your energy and mood",
        imageUrl: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        cookTime: 15,
        difficulty: "easy",
        cuisine: "healthy",
        category: "breakfast",
        ingredients: [
          "1 frozen banana",
          "1/2 cup frozen mango",
          "1/2 cup frozen berries",
          "1 cup coconut milk",
          "1 tbsp chia seeds",
          "1 tbsp honey",
          "Fresh fruits for topping",
          "Granola for topping"
        ],
        instructions: [
          "Blend frozen fruits with coconut milk until smooth",
          "Pour into a bowl",
          "Top with fresh fruits, chia seeds, and granola",
          "Drizzle with honey and serve immediately"
        ],
        nutrition: {
          calories: 380,
          protein: 8,
          carbs: 65,
          fat: 12
        },
        dietaryTags: ["vegan", "gluten-free", "dairy-free"],
        moodTags: ["happy", "energetic", "excited"]
      },
      {
        title: "Garden Fresh Stir-Fry",
        description: "Quick and colorful veggie stir-fry that matches your vibrant energy",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        cookTime: 20,
        difficulty: "easy",
        cuisine: "asian",
        category: "lunch",
        ingredients: [
          "2 cups broccoli florets",
          "1 bell pepper, sliced",
          "1 carrot, julienned",
          "1 cup snap peas",
          "2 cloves garlic, minced",
          "2 tbsp soy sauce",
          "1 tbsp sesame oil",
          "1 tsp ginger, grated",
          "2 tbsp vegetable oil"
        ],
        instructions: [
          "Heat vegetable oil in a wok or large pan",
          "Add garlic and ginger, stir-fry for 30 seconds",
          "Add harder vegetables first (broccoli, carrots)",
          "Add remaining vegetables and stir-fry for 3-4 minutes",
          "Add soy sauce and sesame oil, toss to combine",
          "Serve hot over rice or noodles"
        ],
        nutrition: {
          calories: 180,
          protein: 6,
          carbs: 20,
          fat: 8
        },
        dietaryTags: ["vegetarian", "vegan", "low-calorie"],
        moodTags: ["happy", "energetic", "fresh"]
      },
      {
        title: "Chocolate Bliss Balls",
        description: "Healthy chocolate energy balls perfect for your happy mood",
        imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        cookTime: 10,
        difficulty: "easy",
        cuisine: "healthy",
        category: "snack",
        ingredients: [
          "1 cup dates, pitted",
          "1/2 cup almonds",
          "2 tbsp cocoa powder",
          "2 tbsp almond butter",
          "1 tsp vanilla extract",
          "Pinch of salt",
          "Coconut flakes for rolling"
        ],
        instructions: [
          "Process dates and almonds in food processor until fine",
          "Add cocoa powder, almond butter, vanilla, and salt",
          "Process until mixture holds together",
          "Roll into balls and coat with coconut flakes",
          "Refrigerate for 30 minutes before serving"
        ],
        nutrition: {
          calories: 95,
          protein: 3,
          carbs: 12,
          fat: 5
        },
        dietaryTags: ["vegan", "gluten-free", "no-bake"],
        moodTags: ["happy", "satisfied", "comfort"]
      },
      {
        title: "Cozy Vegetable Soup",
        description: "Hearty and warming soup perfect for stressful days",
        imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        cookTime: 35,
        difficulty: "easy",
        cuisine: "comfort",
        category: "dinner",
        ingredients: [
          "2 cups vegetable broth",
          "1 onion, diced",
          "2 carrots, diced",
          "2 celery stalks, diced",
          "1 potato, cubed",
          "1 can diced tomatoes",
          "1 cup green beans",
          "2 cloves garlic, minced",
          "1 tsp dried herbs",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Sauté onion, carrots, and celery until soft",
          "Add garlic and cook for 1 minute",
          "Add broth, tomatoes, and potato",
          "Simmer for 20 minutes",
          "Add green beans and herbs",
          "Cook for 10 more minutes",
          "Season with salt and pepper"
        ],
        nutrition: {
          calories: 140,
          protein: 4,
          carbs: 30,
          fat: 1
        },
        dietaryTags: ["vegetarian", "vegan", "low-fat"],
        moodTags: ["stressed", "comfort", "calm"]
      },
      {
        title: "Fluffy Berry Pancakes",
        description: "Start your day with joy - perfect fluffy pancakes with fresh berries",
        imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        cookTime: 25,
        difficulty: "medium",
        cuisine: "american",
        category: "breakfast",
        ingredients: [
          "2 cups all-purpose flour",
          "2 tbsp sugar",
          "2 tsp baking powder",
          "1 tsp salt",
          "2 eggs",
          "1 3/4 cups milk",
          "1/4 cup melted butter",
          "1 cup mixed berries",
          "Maple syrup for serving"
        ],
        instructions: [
          "Mix dry ingredients in a large bowl",
          "Whisk eggs, milk, and melted butter in another bowl",
          "Combine wet and dry ingredients until just mixed",
          "Heat griddle or pan over medium heat",
          "Pour batter and add berries on top",
          "Cook until bubbles form, then flip",
          "Serve hot with maple syrup"
        ],
        nutrition: {
          calories: 320,
          protein: 12,
          carbs: 52,
          fat: 8
        },
        dietaryTags: ["vegetarian"],
        moodTags: ["happy", "excited", "celebratory"]
      },
      {
        title: "Power Quinoa Bowl",
        description: "Protein-rich quinoa bowl to fuel your active day",
        imageUrl: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        cookTime: 30,
        difficulty: "medium",
        cuisine: "healthy",
        category: "lunch",
        ingredients: [
          "1 cup quinoa",
          "2 cups vegetable broth",
          "1 avocado, sliced",
          "1 cup roasted chickpeas",
          "2 cups spinach",
          "1/2 cup cherry tomatoes",
          "1/4 cup pumpkin seeds",
          "2 tbsp tahini",
          "1 lemon, juiced",
          "1 tbsp olive oil"
        ],
        instructions: [
          "Cook quinoa in vegetable broth until tender",
          "Roast chickpeas with olive oil and spices",
          "Mix tahini with lemon juice for dressing",
          "Assemble bowl with quinoa as base",
          "Top with spinach, tomatoes, and avocado",
          "Add roasted chickpeas and pumpkin seeds",
          "Drizzle with tahini dressing"
        ],
        nutrition: {
          calories: 520,
          protein: 20,
          carbs: 58,
          fat: 22
        },
        dietaryTags: ["vegetarian", "vegan", "gluten-free", "high-protein"],
        moodTags: ["energetic", "motivated", "focused"]
      }
    ];

    sampleRecipes.forEach(recipe => {
      const id = randomUUID();
      this.recipes.set(id, { 
        ...recipe, 
        id, 
        rating: "4.7", 
        reviewCount: Math.floor(Math.random() * 500) + 50, 
        isActive: true,
        cuisine: recipe.cuisine ?? null,
        category: recipe.category ?? null,
        dietaryTags: recipe.dietaryTags ?? []
      });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getRecipe(id: string): Promise<Recipe | undefined> {
    return this.recipes.get(id);
  }

  async getRecipes(filter?: RecipeFilter): Promise<Recipe[]> {
    let recipes = Array.from(this.recipes.values()).filter(recipe => recipe.isActive);

    if (filter) {
      if (filter.mood) {
        recipes = recipes.filter(recipe => 
          recipe.moodTags.includes(filter.mood!)
        );
      }
      if (filter.cuisine) {
        recipes = recipes.filter(recipe => recipe.cuisine === filter.cuisine);
      }
      if (filter.dietaryTags?.length) {
        recipes = recipes.filter(recipe =>
          filter.dietaryTags!.some(tag => recipe.dietaryTags?.includes(tag))
        );
      }
      if (filter.difficulty) {
        recipes = recipes.filter(recipe => recipe.difficulty === filter.difficulty);
      }
      if (filter.maxCookTime) {
        recipes = recipes.filter(recipe => recipe.cookTime <= filter.maxCookTime!);
      }
      if (filter.category) {
        recipes = recipes.filter(recipe => recipe.category === filter.category);
      }
    }

    return recipes;
  }

  async getRecipesByMood(mood: string): Promise<Recipe[]> {
    return Array.from(this.recipes.values()).filter(recipe => 
      recipe.isActive && recipe.moodTags.includes(mood)
    );
  }

  async createRecipe(insertRecipe: InsertRecipe): Promise<Recipe> {
    const id = randomUUID();
    const recipe: Recipe = { 
      ...insertRecipe, 
      id, 
      rating: "0", 
      reviewCount: 0, 
      isActive: true,
      cuisine: insertRecipe.cuisine ?? null,
      category: insertRecipe.category ?? null,
      dietaryTags: insertRecipe.dietaryTags ?? []
    };
    this.recipes.set(id, recipe);
    return recipe;
  }

  async searchRecipes(query: string): Promise<Recipe[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.recipes.values()).filter(recipe =>
      recipe.isActive && (
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm)) ||
        recipe.moodTags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    );
  }

  async getMoodAnalysis(id: string): Promise<MoodAnalysis | undefined> {
    return this.moodAnalyses.get(id);
  }

  async createMoodAnalysis(insertAnalysis: InsertMoodAnalysis): Promise<MoodAnalysis> {
    const id = randomUUID();
    const analysis: MoodAnalysis = { 
      ...insertAnalysis, 
      id, 
      createdAt: new Date().toISOString(),
      sessionId: insertAnalysis.sessionId ?? null,
      inputData: insertAnalysis.inputData ?? null,
      aiResponse: insertAnalysis.aiResponse ?? null,
      recommendedRecipes: insertAnalysis.recommendedRecipes ?? null
    };
    this.moodAnalyses.set(id, analysis);
    return analysis;
  }

  async getMoodAnalysisBySession(sessionId: string): Promise<MoodAnalysis[]> {
    return Array.from(this.moodAnalyses.values()).filter(
      analysis => analysis.sessionId === sessionId
    );
  }

  async getUserPreferences(userId?: string, sessionId?: string): Promise<UserPreferences | undefined> {
    return Array.from(this.userPreferences.values()).find(
      pref => (userId && pref.userId === userId) || (sessionId && pref.sessionId === sessionId)
    );
  }

  async createUserPreferences(insertPreferences: InsertUserPreferences): Promise<UserPreferences> {
    const id = randomUUID();
    const preferences: UserPreferences = { 
      ...insertPreferences, 
      id,
      sessionId: insertPreferences.sessionId ?? null,
      userId: insertPreferences.userId ?? null,
      dietaryRestrictions: insertPreferences.dietaryRestrictions ?? null,
      allergies: insertPreferences.allergies ?? null,
      preferredCuisines: insertPreferences.preferredCuisines ?? null,
      dislikedIngredients: insertPreferences.dislikedIngredients ?? null,
      favoriteRecipes: insertPreferences.favoriteRecipes ?? null
    };
    this.userPreferences.set(id, preferences);
    return preferences;
  }

  async updateUserPreferences(id: string, updateData: Partial<InsertUserPreferences>): Promise<UserPreferences | undefined> {
    const existing = this.userPreferences.get(id);
    if (!existing) return undefined;

    const updated: UserPreferences = { 
      ...existing, 
      ...updateData,
      sessionId: updateData.sessionId ?? existing.sessionId,
      userId: updateData.userId ?? existing.userId,
      dietaryRestrictions: updateData.dietaryRestrictions ?? existing.dietaryRestrictions,
      allergies: updateData.allergies ?? existing.allergies,
      preferredCuisines: updateData.preferredCuisines ?? existing.preferredCuisines,
      dislikedIngredients: updateData.dislikedIngredients ?? existing.dislikedIngredients,
      favoriteRecipes: updateData.favoriteRecipes ?? existing.favoriteRecipes
    };
    this.userPreferences.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
