import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import RecipeCard from "./recipe-card";
import { fetchRecipesByMood } from "@/lib/api";
import { Smile, Leaf, Heart, Zap } from "lucide-react";

type MoodCategory = 'happy' | 'calm' | 'stressed' | 'energetic';

const moodCategories = [
  {
    id: 'happy' as MoodCategory,
    name: 'Happy',
    description: 'Bright & energizing',
    icon: Smile,
    color: 'bg-primary/10 hover:bg-primary/20 text-primary',
  },
  {
    id: 'calm' as MoodCategory,
    name: 'Calm',
    description: 'Peaceful & soothing',
    icon: Leaf,
    color: 'bg-secondary/10 hover:bg-secondary/20 text-secondary',
  },
  {
    id: 'stressed' as MoodCategory,
    name: 'Stressed',
    description: 'Comforting & warm',
    icon: Heart,
    color: 'bg-accent/10 hover:bg-accent/20 text-accent',
  },
  {
    id: 'energetic' as MoodCategory,
    name: 'Energetic',
    description: 'Power-packed meals',
    icon: Zap,
    color: 'bg-primary/10 hover:bg-primary/20 text-primary',
  },
];

export default function RecipeCollection() {
  const [selectedMood, setSelectedMood] = useState<MoodCategory>('happy');

  const { data: recipes = [], isLoading } = useQuery({
    queryKey: ['/api/recipes/mood', selectedMood],
    queryFn: () => fetchRecipesByMood(selectedMood),
  });

  return (
    <section className="py-24 bg-gradient-to-br from-muted/10 via-background to-muted/20" id="recipes-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">Recipe Collection</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Recipes organized by your current mood
          </p>
        </div>

        {/* Mood Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {moodCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                onClick={() => setSelectedMood(category.id)}
                variant="ghost"
                className={`rounded-2xl p-6 h-auto flex flex-col items-center transition-all group ${
                  selectedMood === category.id 
                    ? `${category.color} border-2 border-current` 
                    : `${category.color.replace('text-', 'hover:text-')} border-2 border-transparent`
                }`}
                data-testid={`mood-category-${category.id}`}
              >
                <IconComponent className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-1">{category.name}</h3>
                <p className="text-sm opacity-80">{category.description}</p>
              </Button>
            );
          })}
        </div>

        {/* Recipe Grid */}
        {isLoading ? (
          <div className="text-center py-12" data-testid="recipes-loading">
            <div className="loading-spinner mx-auto mb-4" />
            <p className="text-muted-foreground">Loading recipes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="recipe-collection-grid">
            {recipes.slice(0, 4).map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} showMoodTags={false} />
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold px-10 py-4 rounded-full"
            data-testid="button-browse-all-recipes"
          >
            Browse All Recipes
          </Button>
        </div>
      </div>
    </section>
  );
}
