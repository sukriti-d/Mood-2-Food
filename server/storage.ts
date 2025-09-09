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
      },
      {
        title: "Mediterranean Chickpea Salad",
        description: "Fresh and vibrant salad perfect for sunny moods",
        imageUrl: "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        cookTime: 15,
        difficulty: "easy",
        cuisine: "mediterranean",
        category: "lunch",
        ingredients: [
          "2 cans chickpeas, drained",
          "1 cucumber, diced",
          "1 cup cherry tomatoes, halved",
          "1/2 red onion, thinly sliced",
          "1/2 cup kalamata olives",
          "1/2 cup feta cheese, crumbled",
          "1/4 cup olive oil",
          "2 tbsp lemon juice",
          "1 tsp oregano",
          "Fresh parsley"
        ],
        instructions: [
          "Combine chickpeas, cucumber, tomatoes, and onion",
          "Add olives and feta cheese",
          "Whisk olive oil, lemon juice, and oregano",
          "Toss salad with dressing",
          "Garnish with fresh parsley",
          "Serve immediately or chill"
        ],
        nutrition: {
          calories: 290,
          protein: 12,
          carbs: 32,
          fat: 14
        },
        dietaryTags: ["vegetarian", "gluten-free"],
        moodTags: ["happy", "fresh", "energetic"]
      },
      {
        title: "Spicy Lentil Curry",
        description: "Warming and satisfying curry for when you need comfort",
        imageUrl: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        cookTime: 45,
        difficulty: "medium",
        cuisine: "indian",
        category: "dinner",
        ingredients: [
          "1 cup red lentils",
          "1 onion, diced",
          "3 cloves garlic, minced",
          "1 tbsp ginger, minced",
          "1 can coconut milk",
          "1 can diced tomatoes",
          "2 tsp curry powder",
          "1 tsp turmeric",
          "1 tsp cumin",
          "Salt and pepper to taste",
          "Fresh cilantro"
        ],
        instructions: [
          "Rinse lentils and cook in water until tender",
          "Sauté onion until golden",
          "Add garlic, ginger, and spices",
          "Add tomatoes and coconut milk",
          "Stir in cooked lentils",
          "Simmer for 15 minutes",
          "Garnish with cilantro"
        ],
        nutrition: {
          calories: 340,
          protein: 18,
          carbs: 45,
          fat: 12
        },
        dietaryTags: ["vegetarian", "vegan", "gluten-free"],
        moodTags: ["stressed", "comfort", "warming"]
      },
      {
        title: "Green Goddess Smoothie",
        description: "Nutrient-packed smoothie to energize your morning",
        imageUrl: "https://images.unsplash.com/photo-1553779151-d6cb2c02b6b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        cookTime: 5,
        difficulty: "easy",
        cuisine: "healthy",
        category: "breakfast",
        ingredients: [
          "1 banana",
          "1 cup spinach",
          "1/2 avocado",
          "1 cup almond milk",
          "1 tbsp almond butter",
          "1 tsp honey",
          "1/2 cup ice",
          "1 tbsp chia seeds"
        ],
        instructions: [
          "Add all ingredients to blender",
          "Blend until smooth and creamy",
          "Add more almond milk if needed",
          "Pour into glass",
          "Sprinkle with chia seeds"
        ],
        nutrition: {
          calories: 285,
          protein: 8,
          carbs: 35,
          fat: 15
        },
        dietaryTags: ["vegan", "gluten-free", "dairy-free"],
        moodTags: ["energetic", "fresh", "motivated"]
      },
      {
        title: "Classic Mac and Cheese",
        description: "Ultimate comfort food for stressful days",
        imageUrl: "https://images.unsplash.com/photo-1543826173-1ad4b5c50b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        cookTime: 25,
        difficulty: "easy",
        cuisine: "american",
        category: "dinner",
        ingredients: [
          "1 lb elbow macaroni",
          "4 tbsp butter",
          "1/4 cup flour",
          "2 cups milk",
          "2 cups cheddar cheese, shredded",
          "1/2 cup parmesan cheese",
          "1/2 tsp salt",
          "1/4 tsp pepper",
          "1/4 tsp paprika"
        ],
        instructions: [
          "Cook macaroni according to package directions",
          "Melt butter in large saucepan",
          "Whisk in flour, cook for 1 minute",
          "Gradually add milk, whisk until smooth",
          "Add cheeses and seasonings",
          "Stir in cooked macaroni",
          "Serve hot"
        ],
        nutrition: {
          calories: 450,
          protein: 20,
          carbs: 55,
          fat: 18
        },
        dietaryTags: ["vegetarian"],
        moodTags: ["stressed", "comfort", "nostalgic"]
      },
      {
        title: "Buddha Bowl",
        description: "Balanced and nourishing bowl for inner peace",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        cookTime: 30,
        difficulty: "easy",
        cuisine: "healthy",
        category: "lunch",
        ingredients: [
          "1 cup brown rice",
          "1 sweet potato, cubed",
          "1 cup broccoli",
          "1 cup edamame",
          "1 avocado, sliced",
          "2 tbsp sesame seeds",
          "2 tbsp tahini",
          "1 tbsp soy sauce",
          "1 tbsp rice vinegar",
          "1 tsp sesame oil"
        ],
        instructions: [
          "Cook brown rice",
          "Roast sweet potato and broccoli",
          "Steam edamame",
          "Mix tahini, soy sauce, vinegar, and sesame oil",
          "Arrange all ingredients in bowl",
          "Drizzle with dressing",
          "Sprinkle with sesame seeds"
        ],
        nutrition: {
          calories: 420,
          protein: 15,
          carbs: 58,
          fat: 16
        },
        dietaryTags: ["vegetarian", "vegan", "gluten-free"],
        moodTags: ["calm", "balanced", "peaceful"]
      },
      {
        title: "Chocolate Avocado Mousse",
        description: "Guilt-free chocolate indulgence for happy moments",
        imageUrl: "https://images.unsplash.com/photo-1551024739-98bcf4f2e5e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        cookTime: 10,
        difficulty: "easy",
        cuisine: "healthy",
        category: "dessert",
        ingredients: [
          "2 ripe avocados",
          "1/4 cup cocoa powder",
          "1/4 cup maple syrup",
          "2 tbsp almond milk",
          "1 tsp vanilla extract",
          "Pinch of salt",
          "Fresh berries for topping"
        ],
        instructions: [
          "Blend all ingredients until smooth",
          "Taste and adjust sweetness",
          "Chill for 2 hours",
          "Serve in glasses",
          "Top with fresh berries"
        ],
        nutrition: {
          calories: 180,
          protein: 4,
          carbs: 22,
          fat: 12
        },
        dietaryTags: ["vegan", "gluten-free", "dairy-free"],
        moodTags: ["happy", "indulgent", "satisfied"]
      },
      {
        title: "Miso Ramen Bowl",
        description: "Warming and umami-rich noodles for comfort",
        imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        cookTime: 35,
        difficulty: "medium",
        cuisine: "japanese",
        category: "dinner",
        ingredients: [
          "2 packs ramen noodles",
          "4 cups vegetable broth",
          "3 tbsp miso paste",
          "2 soft-boiled eggs",
          "1 cup mushrooms, sliced",
          "2 green onions, sliced",
          "1 sheet nori, cut",
          "1 tbsp sesame oil",
          "1 tsp garlic, minced"
        ],
        instructions: [
          "Cook ramen noodles according to package",
          "Heat broth and whisk in miso paste",
          "Sauté mushrooms until golden",
          "Prepare soft-boiled eggs",
          "Divide noodles between bowls",
          "Pour hot miso broth over noodles",
          "Top with eggs, mushrooms, green onions, and nori"
        ],
        nutrition: {
          calories: 380,
          protein: 16,
          carbs: 48,
          fat: 14
        },
        dietaryTags: ["vegetarian"],
        moodTags: ["stressed", "comfort", "warming"]
      },
      {
        title: "Acai Energy Bowl",
        description: "Antioxidant-rich bowl to boost your energy",
        imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        cookTime: 10,
        difficulty: "easy",
        cuisine: "healthy",
        category: "breakfast",
        ingredients: [
          "1 frozen acai packet",
          "1/2 banana",
          "1/2 cup blueberries",
          "1/4 cup coconut milk",
          "1 tbsp granola",
          "1 tbsp coconut flakes",
          "1 tbsp chia seeds",
          "Fresh fruit for topping"
        ],
        instructions: [
          "Blend acai, banana, and blueberries",
          "Add coconut milk gradually",
          "Pour into bowl",
          "Top with granola and coconut flakes",
          "Add fresh fruit and chia seeds",
          "Serve immediately"
        ],
        nutrition: {
          calories: 220,
          protein: 6,
          carbs: 42,
          fat: 8
        },
        dietaryTags: ["vegan", "gluten-free", "dairy-free"],
        moodTags: ["energetic", "happy", "fresh"]
      },
      {
        title: "Herbal Tea Blend",
        description: "Calming tea blend for relaxation and peace",
        imageUrl: "https://images.unsplash.com/photo-1558618666-5a006271c560?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        cookTime: 5,
        difficulty: "easy",
        cuisine: "herbal",
        category: "beverage",
        ingredients: [
          "1 tsp chamomile",
          "1 tsp lavender",
          "1/2 tsp lemon balm",
          "1/2 tsp passionflower",
          "2 cups hot water",
          "Honey to taste"
        ],
        instructions: [
          "Mix all herbs in tea infuser",
          "Pour hot water over herbs",
          "Steep for 5-7 minutes",
          "Remove infuser",
          "Add honey if desired",
          "Sip slowly and relax"
        ],
        nutrition: {
          calories: 5,
          protein: 0,
          carbs: 1,
          fat: 0
        },
        dietaryTags: ["vegan", "gluten-free", "caffeine-free"],
        moodTags: ["calm", "relaxed", "peaceful"]
      },
      {
        title: "Protein Power Pancakes",
        description: "High-protein pancakes to fuel your workout",
        imageUrl: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        cookTime: 15,
        difficulty: "easy",
        cuisine: "healthy",
        category: "breakfast",
        ingredients: [
          "1 cup oats",
          "1 banana",
          "2 eggs",
          "1/4 cup protein powder",
          "1/2 cup milk",
          "1 tsp baking powder",
          "1 tsp vanilla",
          "Berries for topping"
        ],
        instructions: [
          "Blend oats into flour",
          "Add banana, eggs, and milk",
          "Mix in protein powder and baking powder",
          "Heat pan over medium heat",
          "Pour batter to form pancakes",
          "Cook until bubbles form, then flip",
          "Serve with berries"
        ],
        nutrition: {
          calories: 350,
          protein: 25,
          carbs: 48,
          fat: 8
        },
        dietaryTags: ["high-protein", "gluten-free"],
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
