import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/how-it-works";
import RecipeCollection from "@/components/recipe-collection";
import Features from "@/components/features";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <RecipeCollection />
      <Features />
      <Footer />
    </div>
  );
}
