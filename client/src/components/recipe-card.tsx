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
    <Card className="recipe-card bg-card rounded-2xl professional-shadow overflow-hidden group" data-testid={`recipe-card-${recipe.id}`}>
      <div className="overflow-hidden rounded-t-2xl">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title}
          className="recipe-card-image w-full h-48 object-cover"
          data-testid={`recipe-image-${recipe.id}`}
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          {showMoodTags && primaryMoodTag && (
            <Badge 
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border-0 ${getMoodTagColor(primaryMoodTag)} shadow-sm`}
              data-testid={`mood-tag-${recipe.id}`}
            >
              {primaryMoodTag}
            </Badge>
          )}
          <div className="flex items-center text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
            <Star className="text-accent mr-1.5 h-4 w-4 fill-current" />
            <span className="text-sm font-medium" data-testid={`rating-${recipe.id}`}>
              {recipe.rating} ({recipe.reviewCount})
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300" data-testid={`recipe-title-${recipe.id}`}>
          {recipe.title}
        </h3>
        <p className="text-muted-foreground mb-6 line-clamp-2 leading-relaxed" data-testid={`recipe-description-${recipe.id}`}>
          {recipe.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center bg-muted/50 px-2 py-1 rounded-lg" data-testid={`cook-time-${recipe.id}`}>
              <Clock className="mr-1.5 h-3.5 w-3.5 text-primary" />
              <span className="font-medium">{recipe.cookTime} min</span>
            </span>
            {recipe.dietaryTags && recipe.dietaryTags.length > 0 && (
              <span className="flex items-center bg-muted/50 px-2 py-1 rounded-lg" data-testid={`dietary-tag-${recipe.id}`}>
                <Utensils className="mr-1.5 h-3.5 w-3.5 text-secondary" />
                <span className="font-medium">{recipe.dietaryTags?.[0]}</span>
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300 rounded-full"
              data-testid={`favorite-button-${recipe.id}`}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Link href={`/recipe/${recipe.id}`}>
              <Button 
                size="sm"
                className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold px-4"
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
