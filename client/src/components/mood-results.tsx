import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoodAnalysisResult } from "@/lib/api";
import { Smile, Brain, Clock, RotateCcw, X } from "lucide-react";
import RecipeCard from "./recipe-card";

interface MoodResultsProps {
  result: MoodAnalysisResult;
  onTryAgain: () => void;
  onClose: () => void;
}

const getMoodIcon = (mood: string) => {
  const icons: Record<string, string> = {
    happy: "😊",
    sad: "😢",
    energetic: "⚡",
    stressed: "😰",
    calm: "😌",
    excited: "🤩",
    tired: "😴",
    angry: "😠",
    neutral: "😐",
  };
  return icons[mood] || "😊";
};

const getMoodDescription = (mood: string) => {
  const descriptions: Record<string, string> = {
    happy: "You're feeling great! Perfect energy for trying something new and exciting.",
    sad: "We understand you're feeling down. Let's find some comfort food to lift your spirits.",
    energetic: "You're bursting with energy! Time for some power-packed, nutritious meals.",
    stressed: "Feeling overwhelmed? Let's prepare something soothing and comforting.",
    calm: "You're in a peaceful state. Perfect for mindful cooking and light, fresh meals.",
    excited: "Your excitement is contagious! Let's channel that into some fun, vibrant dishes.",
    tired: "You need some nourishment. Easy, comforting meals to restore your energy.",
    angry: "Take a deep breath. Cooking can be therapeutic - let's find something calming.",
    neutral: "Balanced and steady. A great time to explore new flavors and balanced nutrition.",
  };
  return descriptions[mood] || "You're feeling balanced today!";
};

export default function MoodResults({ result, onTryAgain, onClose }: MoodResultsProps) {
  return (
    <div className="space-y-8" data-testid="mood-results">
      {/* Mood Detection Result */}
      <div className="text-center">
        <Card className="shadow-lg max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1" />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                data-testid="button-close-results"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mb-6">
              <div className="mood-badge inline-block bg-primary/10 text-primary px-6 py-3 rounded-full text-lg font-semibold mb-4">
                <span className="mr-2 text-2xl" data-testid="mood-icon">
                  {getMoodIcon(result.detectedMood)}
                </span>
                <span className="capitalize" data-testid="detected-mood">
                  {result.detectedMood}
                </span>
              </div>
              <p className="text-muted-foreground text-lg" data-testid="mood-description">
                {getMoodDescription(result.detectedMood)}
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Brain className="mr-2 text-primary h-4 w-4" />
                <span>
                  AI Confidence: <span className="font-semibold" data-testid="confidence-score">
                    {Math.round(result.confidence * 100)}%
                  </span>
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 text-secondary h-4 w-4" />
                <span>Processed instantly</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recipe Recommendations */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Perfect Recipes for Your Mood</h2>
        <p className="text-lg text-muted-foreground">Handpicked by AI to match your current vibe</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="recommended-recipes">
        {result.recommendedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* Try Again Button */}
      <div className="text-center mt-12">
        <Button
          onClick={onTryAgain}
          variant="secondary"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-medium px-8 py-3"
          data-testid="button-try-again"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Try Different Mood
        </Button>
      </div>
    </div>
  );
}
