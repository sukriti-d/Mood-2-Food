import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Camera, MessageCircle, Brain, X } from "lucide-react";
import { analyzeImageMood, analyzeTextMood, MoodAnalysisResult } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import MoodResults from "@/components/mood-results";

type DetectionMethod = 'camera' | 'text';

interface MoodDetectionProps {
  onClose: () => void;
}

export default function MoodDetection({ onClose }: MoodDetectionProps) {
  const [activeTab, setActiveTab] = useState<DetectionMethod>('camera');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [moodText, setMoodText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<MoodAnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeMood = async (method: DetectionMethod) => {
    setIsLoading(true);
    
    try {
      let result: MoodAnalysisResult;
      
      if (method === 'camera') {
        if (!selectedImage) {
          toast({
            title: "No image selected",
            description: "Please select an image to analyze your mood.",
            variant: "destructive",
          });
          return;
        }
        result = await analyzeImageMood(selectedImage);
      } else {
        if (!moodText.trim()) {
          toast({
            title: "No text provided",
            description: "Please describe how you're feeling.",
            variant: "destructive",
          });
          return;
        }
        result = await analyzeTextMood(moodText);
      }
      
      setAnalysisResult(result);
      toast({
        title: "Mood analyzed successfully!",
        description: `Detected mood: ${result.detectedMood} with ${Math.round(result.confidence * 100)}% confidence`,
      });
    } catch (error) {
      console.error('Error analyzing mood:', error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your mood. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setSelectedImage(null);
    setImagePreview(null);
    setMoodText('');
    setIsLoading(false);
  };

  if (analysisResult) {
    return (
      <MoodResults 
        result={analysisResult} 
        onTryAgain={resetAnalysis}
        onClose={onClose}
      />
    );
  }

  return (
    <Card className="max-w-4xl mx-auto professional-shadow bg-card/95 backdrop-blur-sm border-0 rounded-3xl" data-testid="mood-detection-card">
      <CardContent className="p-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI Mood Detection
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="hover:bg-destructive/10 hover:text-destructive rounded-full transition-all duration-300"
            data-testid="button-close-mood-detection"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Detection Method Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted/50 rounded-2xl p-2 flex shadow-inner">
            <Button
              variant="ghost"
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'camera' 
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
              onClick={() => setActiveTab('camera')}
              data-testid="tab-camera"
            >
              <Camera className="mr-3 h-5 w-5" />
              Upload Selfie
            </Button>
            <Button
              variant="ghost"
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'text' 
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
              onClick={() => setActiveTab('text')}
              data-testid="tab-text"
            >
              <MessageCircle className="mr-3 h-5 w-5" />
              Describe Mood
            </Button>
          </div>
        </div>

        {/* Camera Upload Interface */}
        {activeTab === 'camera' && (
          <div className="text-center" data-testid="camera-interface">
            {!imagePreview ? (
              <div 
                className="upload-zone bg-gradient-to-br from-muted/20 to-muted/10 rounded-3xl p-16 mb-8 cursor-pointer border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-all duration-500 group"
                onClick={() => fileInputRef.current?.click()}
                data-testid="upload-zone"
              >
                <Camera className="mx-auto text-muted-foreground mb-6 h-20 w-20 group-hover:text-primary transition-colors duration-300" />
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">Upload Your Selfie</h3>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed max-w-md mx-auto">
                  Our AI will analyze your facial expression to detect your mood with advanced computer vision
                </p>
                <Button 
                  className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold px-8 py-3 rounded-full"
                  data-testid="button-choose-photo"
                >
                  Choose Photo
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  data-testid="file-input"
                />
              </div>
            ) : (
              <div className="mb-8" data-testid="image-preview">
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 inline-block professional-shadow border border-border/50">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-64 h-64 object-cover rounded-xl mb-6 shadow-lg"
                    data-testid="preview-image"
                  />
                  <Button
                    onClick={() => handleAnalyzeMood('camera')}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold w-full py-3 rounded-full"
                    data-testid="button-analyze-image"
                  >
                    {isLoading ? (
                      <div className="loading-spinner mr-3" />
                    ) : (
                      <Brain className="mr-3 h-5 w-5" />
                    )}
                    {isLoading ? 'Analyzing Your Mood...' : 'Analyze My Mood'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Text Input Interface */}
        {activeTab === 'text' && (
          <div className="max-w-2xl mx-auto" data-testid="text-interface">
            <Textarea
              placeholder="Tell us how you're feeling today... (e.g., 'I'm feeling stressed after a long day at work' or 'I'm excited about the weekend!')"
              value={moodText}
              onChange={(e) => setMoodText(e.target.value)}
              className="w-full h-40 p-6 border border-border/50 rounded-2xl bg-background/50 backdrop-blur-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-lg"
              data-testid="mood-text-input"
            />
            <Button
              onClick={() => handleAnalyzeMood('text')}
              disabled={isLoading || !moodText.trim()}
              className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold w-full mt-6 py-4 rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              data-testid="button-analyze-text"
            >
              {isLoading ? (
                <div className="loading-spinner mr-3" />
              ) : (
                <Brain className="mr-3 h-5 w-5" />
              )}
              {isLoading ? 'Analyzing Your Mood...' : 'Analyze My Mood'}
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12 animate-fade-in" data-testid="loading-state">
            <div className="loading-spinner mx-auto mb-6" />
            <p className="text-muted-foreground text-lg">Analyzing your mood with AI...</p>
            <p className="text-sm text-muted-foreground/80 mt-2">This may take a few seconds</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
