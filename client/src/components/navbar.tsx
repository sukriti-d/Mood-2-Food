import { Button } from "@/components/ui/button";
import { Utensils, Menu } from "lucide-react";
import { Link } from "wouter";

export default function Navbar() {
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3" data-testid="logo-link">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Utensils className="text-primary-foreground text-sm" />
            </div>
            <span className="text-xl font-bold text-foreground">Mood2Food</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-how-it-works">
              How it Works
            </a>
            <a href="#recipes" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-recipes">
              Recipes
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-about">
              About
            </a>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
              data-testid="button-get-started"
              onClick={() => {
                const moodSection = document.getElementById('mood-detection');
                moodSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Started
            </Button>
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
            <Menu className="text-foreground" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
