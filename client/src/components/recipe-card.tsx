import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Recipe } from "@shared/schema";
import { Clock, Star, Heart, Utensils } from "lucide-react";
import { Link } from "wouter";

interface RecipeCardProps {
  recipe: Recipe;
  showMoodTags?: boolean;
}

const getMoodTagColor = (tag: string) => {
  const colors: Record<string, string> = {
    happy: "bg-primary/20 text-primary-foreground",
    energetic: "bg-accent/20 text-accent-foreground",
    comfort: "bg-amber-100 text-amber-800",
    calm: "bg-secondary/20 text-secondary-foreground",
    fresh: "bg-green-100 text-green-800",
    stressed: "bg-orange-100 text-orange-800",
    celebratory: "bg-pink-100 text-pink-800",
  };
  return colors[tag] || "bg-muted text-muted-foreground";
};

export default function RecipeCard({ recipe, showMoodTags = true }: RecipeCardProps) {
  const primaryMoodTag = recipe.moodTags[0];
  
  return (
    <Card className="recipe-card bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300" data-testid={`recipe-card-${recipe.id}`}>
      <img 
        src={recipe.imageUrl} 
        alt={recipe.title}
        className="w-full h-48 object-cover"
        data-testid={`recipe-image-${recipe.id}`}
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          {showMoodTags && primaryMoodTag && (
            <Badge 
              className={`px-3 py-1 rounded-full text-sm font-medium ${getMoodTagColor(primaryMoodTag)}`}
              data-testid={`mood-tag-${recipe.id}`}
            >
              {primaryMoodTag}
            </Badge>
          )}
          <div className="flex items-center text-muted-foreground">
            <Star className="text-accent mr-1 h-4 w-4 fill-current" />
            <span className="text-sm" data-testid={`rating-${recipe.id}`}>
              {recipe.rating} ({recipe.reviewCount})
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-2" data-testid={`recipe-title-${recipe.id}`}>
          {recipe.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2" data-testid={`recipe-description-${recipe.id}`}>
          {recipe.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center" data-testid={`cook-time-${recipe.id}`}>
              <Clock className="mr-1 h-4 w-4" />
              {recipe.cookTime} min
            </span>
            {recipe.dietaryTags && recipe.dietaryTags.length > 0 && (
              <span className="flex items-center" data-testid={`dietary-tag-${recipe.id}`}>
                <Utensils className="mr-1 h-4 w-4" />
                {recipe.dietaryTags?.[0]}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-muted-foreground hover:text-destructive transition-colors"
              data-testid={`favorite-button-${recipe.id}`}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Link href={`/recipe/${recipe.id}`}>
              <Button 
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                data-testid={`view-recipe-button-${recipe.id}`}
              >
                View Recipe
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
