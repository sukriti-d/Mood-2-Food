import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Camera, MessageCircle, Brain, X } from "lucide-react";
import { analyzeImageMood, analyzeTextMood, MoodAnalysisResult } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import MoodResults from "./mood-results";

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
    <Card className="max-w-4xl mx-auto shadow-xl" data-testid="mood-detection-card">
      <CardContent className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-center text-foreground">
            How are you feeling today?
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            data-testid="button-close-mood-detection"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Detection Method Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted rounded-xl p-1 flex">
            <Button
              variant={activeTab === 'camera' ? 'default' : 'ghost'}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'camera' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('camera')}
              data-testid="tab-camera"
            >
              <Camera className="mr-2 h-4 w-4" />
              Upload Selfie
            </Button>
            <Button
              variant={activeTab === 'text' ? 'default' : 'ghost'}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'text' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('text')}
              data-testid="tab-text"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Describe Mood
            </Button>
          </div>
        </div>

        {/* Camera Upload Interface */}
        {activeTab === 'camera' && (
          <div className="text-center" data-testid="camera-interface">
            {!imagePreview ? (
              <div 
                className="upload-zone bg-muted/30 rounded-2xl p-12 mb-6 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                data-testid="upload-zone"
              >
                <Camera className="mx-auto text-4xl text-muted-foreground mb-4 h-16 w-16" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">Upload Your Selfie</h3>
                <p className="text-muted-foreground mb-4">
                  Our AI will analyze your facial expression to detect your mood
                </p>
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
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
              <div className="mb-6" data-testid="image-preview">
                <div className="bg-card rounded-xl p-4 inline-block shadow-lg">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-48 h-48 object-cover rounded-lg mb-4"
                    data-testid="preview-image"
                  />
                  <Button
                    onClick={() => handleAnalyzeMood('camera')}
                    disabled={isLoading}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium w-full"
                    data-testid="button-analyze-image"
                  >
                    {isLoading ? (
                      <div className="loading-spinner mr-2" />
                    ) : (
                      <Brain className="mr-2 h-4 w-4" />
                    )}
                    {isLoading ? 'Analyzing...' : 'Analyze My Mood'}
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
              className="w-full h-32 p-4 border border-border rounded-xl bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              data-testid="mood-text-input"
            />
            <Button
              onClick={() => handleAnalyzeMood('text')}
              disabled={isLoading || !moodText.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium w-full mt-4"
              data-testid="button-analyze-text"
            >
              {isLoading ? (
                <div className="loading-spinner mr-2" />
              ) : (
                <Brain className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Analyzing...' : 'Analyze My Mood'}
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8" data-testid="loading-state">
            <div className="loading-spinner mx-auto mb-4" />
            <p className="text-muted-foreground">Analyzing your mood with AI...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
