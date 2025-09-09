import { Card, CardContent } from "@/components/ui/card";
import { Brain, ChefHat, Clock } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Mood Detection",
    description: "Advanced algorithms analyze facial expressions and text to understand your emotional state.",
    color: "bg-gradient-to-br from-primary/20 to-primary/10 text-primary",
  },
  {
    icon: ChefHat,
    title: "Smart Recommendations",
    description: "Get personalized recipes that match your current mood and energy levels.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Clock,
    title: "Instant Results",
    description: "Mood analysis and recipe suggestions delivered in seconds.",
    color: "bg-accent/10 text-accent",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">Why Choose Mood2Food?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI-powered recipe recommendations based on your mood
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
