import { Button } from "@/components/ui/button";
import { Utensils, Menu } from "lucide-react";
import { Link } from "wouter";

export default function Navbar() {
  return (
    <nav className="bg-card/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <Link href="/" className="flex items-center space-x-3 group" data-testid="logo-link">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Utensils className="text-white text-lg" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Mood2Food</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105" data-testid="link-how-it-works">
              How it Works
            </a>
            <a href="#recipes" className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105" data-testid="link-recipes">
              Recipes
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105" data-testid="link-about">
              About
            </a>
            <Button 
              className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold px-6 py-2 rounded-full"
              data-testid="button-get-started"
              onClick={() => {
                const moodSection = document.getElementById('mood-detection');
                moodSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Started
            </Button>
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary/10 rounded-full" data-testid="button-mobile-menu">
            <Menu className="text-foreground" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
