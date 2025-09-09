import { Button } from "@/components/ui/button";
import { Utensils } from "lucide-react";
import { SiX, SiInstagram, SiGithub } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Utensils className="text-primary-foreground h-4 w-4" />
              </div>
              <span className="text-xl font-bold text-foreground">Mood2Food</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              AI-powered recipe recommendations that understand your mood and enhance your well-being through food.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="w-10 h-10 bg-muted rounded-lg text-muted-foreground hover:text-primary transition-colors"
                data-testid="social-twitter"
              >
                <SiX className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="w-10 h-10 bg-muted rounded-lg text-muted-foreground hover:text-primary transition-colors"
                data-testid="social-instagram"
              >
                <SiInstagram className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="w-10 h-10 bg-muted rounded-lg text-muted-foreground hover:text-primary transition-colors"
                data-testid="social-github"
              >
                <SiGithub className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a></li>
              <li><a href="#recipes" className="hover:text-primary transition-colors">Recipes</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Mood2Food. All rights reserved. 
          </p>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground mt-4 md:mt-0">
            <span>Built with MERN Stack</span>
            <span>•</span>
            <span>Powered by Hugging Face</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
