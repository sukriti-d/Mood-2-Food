import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchRecipe } from "@/lib/api";
import { ArrowLeft, Clock, Users, Star, Heart } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data: recipe, isLoading, error } = useQuery({
    queryKey: ['/api/recipes', id],
    queryFn: () => fetchRecipe(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="loading-spinner mx-auto mb-4" />
            <p className="text-muted-foreground">Loading recipe...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-12">
              <h1 className="text-2xl font-bold text-foreground mb-4">Recipe Not Found</h1>
              <p className="text-muted-foreground mb-6">The recipe you're looking for doesn't exist.</p>
              <Link href="/">
                <Button>Return Home</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Recipes
          </Button>
        </Link>

        {/* Recipe Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="relative">
            <img 
              src={recipe.imageUrl} 
              alt={recipe.title}
              className="w-full h-64 md:h-80 object-cover"
              data-testid="recipe-hero-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.moodTags.slice(0, 3).map((tag) => (
                  <Badge 
                    key={tag} 
                    className="bg-primary/80 text-primary-foreground"
                    data-testid={`mood-tag-${tag}`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="recipe-title">
                {recipe.title}
              </h1>
              <p className="text-lg opacity-90" data-testid="recipe-description">
                {recipe.description}
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recipe Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Cook Time</p>
                    <p className="font-semibold" data-testid="cook-time">{recipe.cookTime} min</p>
                  </div>
                  <div>
                    <Users className="h-6 w-6 mx-auto mb-2 text-secondary" />
                    <p className="text-sm text-muted-foreground">Difficulty</p>
                    <p className="font-semibold capitalize" data-testid="difficulty">{recipe.difficulty}</p>
                  </div>
                  <div>
                    <Star className="h-6 w-6 mx-auto mb-2 text-accent fill-current" />
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <p className="font-semibold" data-testid="rating">{recipe.rating}/5</p>
                  </div>
                  <div>
                    <Heart className="h-6 w-6 mx-auto mb-2 text-destructive" />
                    <p className="text-sm text-muted-foreground">Reviews</p>
                    <p className="font-semibold" data-testid="review-count">{recipe.reviewCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Ingredients</h2>
                <ul className="space-y-2" data-testid="ingredients-list">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li 
                      key={index} 
                      className="flex items-start space-x-3"
                      data-testid={`ingredient-${index}`}
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-foreground">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Instructions</h2>
                <ol className="space-y-4" data-testid="instructions-list">
                  {recipe.instructions.map((instruction, index) => (
                    <li 
                      key={index} 
                      className="flex space-x-4"
                      data-testid={`instruction-${index}`}
                    >
                      <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </span>
                      <p className="text-foreground pt-1">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Nutrition Info */}
            {recipe.nutrition && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Nutrition Facts</h3>
                  <div className="space-y-3">
                    {recipe.nutrition.calories && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Calories</span>
                        <span className="font-semibold" data-testid="calories">{recipe.nutrition.calories}</span>
                      </div>
                    )}
                    {recipe.nutrition.protein && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Protein</span>
                        <span className="font-semibold" data-testid="protein">{recipe.nutrition.protein}g</span>
                      </div>
                    )}
                    {recipe.nutrition.carbs && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Carbs</span>
                        <span className="font-semibold" data-testid="carbs">{recipe.nutrition.carbs}g</span>
                      </div>
                    )}
                    {recipe.nutrition.fat && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fat</span>
                        <span className="font-semibold" data-testid="fat">{recipe.nutrition.fat}g</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Dietary Tags */}
            {recipe.dietaryTags && recipe.dietaryTags.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Dietary Information</h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.dietaryTags?.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        data-testid={`dietary-tag-${tag}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid="button-save-recipe"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Save Recipe
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    data-testid="button-share-recipe"
                  >
                    Share Recipe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
