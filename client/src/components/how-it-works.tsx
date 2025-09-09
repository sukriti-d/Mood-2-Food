import { Card, CardContent } from "@/components/ui/card";
import { Camera, Brain, Utensils, Eye, MessageCircle, Bot, TrendingUp } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-br from-muted/20 via-background to-muted/30" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">How Mood2Food Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our AI combines computer vision and natural language processing to understand your mood and recommend the perfect recipes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div className="text-center group" data-testid="step-capture-mood">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-300 shadow-lg">
              <Camera className="text-primary h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-6">1. Capture Your Mood</h3>
            <p className="text-muted-foreground leading-relaxed">
              Upload a selfie or describe how you're feeling. Our AI analyzes facial expressions or text sentiment to detect your current mood.
            </p>
          </div>

          <div className="text-center group" data-testid="step-ai-analysis">
            <div className="w-20 h-20 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-300 shadow-lg">
              <Brain className="text-secondary h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-6">2. AI Analysis</h3>
            <p className="text-muted-foreground leading-relaxed">
              Advanced machine learning models process your input using computer vision and NLP to accurately identify your emotional state.
            </p>
          </div>

          <div className="text-center group" data-testid="step-perfect-recipes">
            <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-300 shadow-lg">
              <Utensils className="text-accent h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-6">3. Perfect Recipes</h3>
            <p className="text-muted-foreground leading-relaxed">
              Get personalized recipe recommendations that match your mood - from comfort foods to energizing meals.
            </p>
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="bg-card/80 backdrop-blur-sm rounded-3xl p-10 professional-shadow border-0">
          <CardContent className="p-0">
            <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-12">Powered by Advanced AI</h3>
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
