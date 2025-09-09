import { Card, CardContent } from "@/components/ui/card";
import { Camera, Brain, Utensils, Eye, MessageCircle, Bot, TrendingUp } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-20 bg-muted/30" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How Mood2Food Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI combines computer vision and natural language processing to understand your mood and recommend the perfect recipes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div className="text-center" data-testid="step-capture-mood">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Camera className="text-primary h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">1. Capture Your Mood</h3>
            <p className="text-muted-foreground">
              Upload a selfie or describe how you're feeling. Our AI analyzes facial expressions or text sentiment to detect your current mood.
            </p>
          </div>

          <div className="text-center" data-testid="step-ai-analysis">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="text-secondary h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">2. AI Analysis</h3>
            <p className="text-muted-foreground">
              Advanced machine learning models process your input using computer vision and NLP to accurately identify your emotional state.
            </p>
          </div>

          <div className="text-center" data-testid="step-perfect-recipes">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Utensils className="text-accent h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">3. Perfect Recipes</h3>
            <p className="text-muted-foreground">
              Get personalized recipe recommendations that match your mood - from comfort foods to energizing meals.
            </p>
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="bg-card rounded-2xl p-8 shadow-lg">
          <CardContent className="p-0">
            <h3 className="text-2xl font-bold text-center text-foreground mb-8">Powered by Advanced AI</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div data-testid="tech-computer-vision">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Eye className="text-primary h-6 w-6" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Computer Vision</h4>
                <p className="text-sm text-muted-foreground">DeepFace emotion recognition</p>
              </div>
              <div data-testid="tech-nlp-analysis">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="text-secondary h-6 w-6" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">NLP Analysis</h4>
                <p className="text-sm text-muted-foreground">DistilBERT sentiment analysis</p>
              </div>
              <div data-testid="tech-hugging-face">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Bot className="text-accent h-6 w-6" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Hugging Face</h4>
                <p className="text-sm text-muted-foreground">AI model inference</p>
              </div>
              <div data-testid="tech-recommendation">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="text-primary h-6 w-6" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Recommendation</h4>
                <p className="text-sm text-muted-foreground">Smart mood mapping</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
