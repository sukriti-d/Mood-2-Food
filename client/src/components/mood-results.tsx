import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoodAnalysisResult } from "@/lib/api";
import { Smile, Brain, Clock, RotateCcw, X } from "lucide-react";
import RecipeCard from "@/components/recipe-card";

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
        <Card className="professional-shadow max-w-3xl mx-auto bg-card/95 backdrop-blur-sm border-0 rounded-3xl">
          <CardContent className="p-10">
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
            
            <div className="mb-8">
              <div className="mood-badge inline-block bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/30 text-primary px-8 py-4 rounded-full text-xl font-bold mb-6 shadow-lg">
                <span className="mr-3 text-3xl" data-testid="mood-icon">
                  {getMoodIcon(result.detectedMood)}
                </span>
                <span className="capitalize" data-testid="detected-mood">
                  {result.detectedMood}
                </span>
              </div>
              <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto" data-testid="mood-description">
                {getMoodDescription(result.detectedMood)}
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center bg-muted/50 px-4 py-2 rounded-full">
                <Brain className="mr-2 text-primary h-5 w-5" />
                <span className="font-medium">
                  AI Confidence: <span className="font-bold text-foreground" data-testid="confidence-score">
                    {Math.round(result.confidence * 100)}%
                  </span>
                </span>
              </div>
              <div className="flex items-center bg-muted/50 px-4 py-2 rounded-full">
                <Clock className="mr-2 text-secondary h-5 w-5" />
                <span className="font-medium">Processed instantly</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recipe Recommendations */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">Perfect Recipes for Your Mood</h2>
        <p className="text-xl text-muted-foreground leading-relaxed">Handpicked by AI to match your current vibe</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="recommended-recipes">
        {result.recommendedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* Try Again Button */}
      <div className="text-center mt-16">
        <Button
          onClick={onTryAgain}
          variant="outline"
          className="border-2 border-primary/30 text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-300 font-semibold px-10 py-4 rounded-full shadow-lg"
          data-testid="button-try-again"
        >
          <RotateCcw className="mr-3 h-5 w-5" />
          Try Different Mood
        </Button>
      </div>
    </div>
  );
}
