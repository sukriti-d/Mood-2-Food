import { Card, CardContent } from "@/components/ui/card";
import { Brain, Heart, User, Clock, Smartphone, Database } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Advanced machine learning models analyze your facial expressions and text sentiment with 94% accuracy to understand your true mood.",
    color: "bg-primary/10 text-primary",
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
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Mood2Food?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            More than just recipe recommendations - we understand the connection between food and emotions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                data-testid={`feature-card-${index}`}
              >
                <CardContent className="p-8">
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4" data-testid={`feature-title-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`feature-description-${index}`}>
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
