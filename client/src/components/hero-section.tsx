import { Button } from "@/components/ui/button";
import { Camera, Search, Smile, Zap, Heart, Brain } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRecipesByMood } from "@/lib/api";
import RecipeCard from "@/components/recipe-card";
import { Card, CardContent } from "@/components/ui/card";
import MoodDetection from "@/components/mood-detection";

const quickMoods = [
  { id: 'happy', name: 'Happy', icon: Smile, color: 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-600', emoji: '😊' },
  { id: 'energetic', name: 'Energetic', icon: Zap, color: 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-600', emoji: '⚡' },
  { id: 'stressed', name: 'Stressed', icon: Heart, color: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-600', emoji: '😰' },
  { id: 'calm', name: 'Calm', icon: Brain, color: 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-600', emoji: '😌' }
];

export default function HeroSection() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showMoodDetection, setShowMoodDetection] = useState(false);

  const { data: recipes = [], isLoading } = useQuery({
    queryKey: ['/api/recipes/mood', selectedMood],
    queryFn: () => fetchRecipesByMood(selectedMood!),
    enabled: !!selectedMood,
  });

  const handleScrollToRecipes = () => {
    const recipesSection = document.getElementById('recipes-section');
    recipesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background via-50% to-accent/5 py-24 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Your <span className="text-primary">Mood</span> Meets{" "}
            <span className="text-accent">Perfect Recipe</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            AI-powered recipe recommendations based on your current mood. Choose your mood below or use AI detection for personalized suggestions.
          </p>
          
          {/* Quick Mood Selector */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-6">How are you feeling today?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              {quickMoods.map((mood) => {
                const IconComponent = mood.icon;
                return (
                  <Button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    variant="ghost"
                    className={`h-24 p-4 rounded-2xl border-2 transition-all duration-300 ${
                      selectedMood === mood.id 
                        ? `${mood.color} border-current scale-105 shadow-lg` 
                        : `${mood.color.replace('hover:', '')} border-transparent hover:scale-105 hover:shadow-md`
                    }`}
                    data-testid={`quick-mood-${mood.id}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{mood.emoji}</div>
                      <div className="font-semibold">{mood.name}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="text-center mb-8">
            <p className="text-muted-foreground mb-4">Or use AI-powered mood detection</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold hover:bg-primary/90 transform hover:scale-105 transition-all shadow-lg"
                onClick={() => setShowMoodDetection(true)}
                data-testid="button-detect-mood"
              >
                <Camera className="mr-2" />
                AI Mood Detection
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-secondary text-secondary-foreground px-8 py-4 text-lg font-semibold hover:bg-secondary/90 transform hover:scale-105 transition-all shadow-lg"
                onClick={handleScrollToRecipes}
                data-testid="button-browse-recipes"
              >
                <Search className="mr-2" />
                Browse All Recipes
              </Button>
            </div>
          </div>
        </div>

        {/* Recipe Results */}
        {selectedMood && (
          <div className="mt-16">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-center text-foreground mb-8">
                  Perfect Recipes for Your {quickMoods.find(m => m.id === selectedMood)?.name} Mood
                </h3>
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="loading-spinner mx-auto mb-4" />
                    <p className="text-muted-foreground">Finding perfect recipes for you...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.slice(0, 6).map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} showMoodTags={false} />
                    ))}
                  </div>
                )}
                <div className="text-center mt-8">
                  <Button
                    onClick={() => setSelectedMood(null)}
                    variant="outline"
                    className="border-2 hover:bg-background/50"
                  >
                    Try Different Mood
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {showMoodDetection && (
          <div id="mood-detection" className="mt-16">
            <MoodDetection onClose={() => setShowMoodDetection(false)} />
          </div>
        )}
      </div>
    </section>
  );
}
