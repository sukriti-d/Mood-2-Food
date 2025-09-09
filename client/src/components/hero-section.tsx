import { Button } from "@/components/ui/button";
import { Camera, Search } from "lucide-react";
import MoodDetection from "./mood-detection";
import { useState } from "react";

export default function HeroSection() {
  const [showMoodDetection, setShowMoodDetection] = useState(false);

  const handleScrollToRecipes = () => {
    const recipesSection = document.getElementById('recipes-section');
    recipesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Your <span className="text-primary">Mood</span> Meets{" "}
            <span className="text-accent">Perfect Recipe</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            AI-powered recipe recommendations based on your current mood. Upload a selfie or describe how you feel, and we'll find the perfect dish to match your vibe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold hover:bg-primary/90 transform hover:scale-105 transition-all"
              onClick={() => setShowMoodDetection(true)}
              data-testid="button-detect-mood"
            >
              <Camera className="mr-2" />
              Detect My Mood
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-secondary text-secondary-foreground px-8 py-4 text-lg font-semibold hover:bg-secondary/90"
              onClick={handleScrollToRecipes}
              data-testid="button-browse-recipes"
            >
              <Search className="mr-2" />
              Browse Recipes
            </Button>
          </div>
        </div>

        {showMoodDetection && (
          <div id="mood-detection">
            <MoodDetection onClose={() => setShowMoodDetection(false)} />
          </div>
        )}
      </div>
    </section>
  );
}
