import { Card, CardContent } from "@/components/ui/card";
import { Brain, Heart, User, Clock, Smartphone, Database } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Advanced machine learning models analyze your facial expressions and text sentiment with 94% accuracy to understand your true mood.",
    color: "bg-gradient-to-br from-primary/20 to-primary/10 text-primary",
  },
  {
    icon: Heart,
    title: "Emotional Well-being",
    description: "Our recipes are scientifically selected to boost mood, reduce stress, and enhance emotional balance through food psychology.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: User,
    title: "Personalized Experience", 
    description: "Learn your preferences over time and customize recommendations based on dietary restrictions and taste preferences.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Clock,
    title: "Quick & Easy",
    description: "Get mood analysis and recipe recommendations in under 3 seconds. Perfect for busy lifestyles and instant meal inspiration.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Fully responsive design works perfectly on all devices. Take photos, analyze moods, and cook anywhere, anytime.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Database,
    title: "Rich Recipe Database",
    description: "Over 10,000 carefully curated recipes from global cuisines, all tagged with mood-enhancing properties and nutritional benefits.",
    color: "bg-accent/10 text-accent",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">Why Choose Mood2Food?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            More than just recipe recommendations - we understand the connection between food and emotions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="bg-card/80 backdrop-blur-sm rounded-3xl professional-shadow hover:scale-105 transition-all duration-500 border-0 group"
                data-testid={`feature-card-${index}`}
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-6 group-hover:text-primary transition-colors duration-300" data-testid={`feature-title-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid={`feature-description-${index}`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
