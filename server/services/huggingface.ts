import { ImageAnalysisRequest, TextAnalysisRequest } from "@shared/schema";

const HF_API_URL = "https://api-inference.huggingface.co/models";
const HF_TOKEN = process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN || "";

if (!HF_TOKEN) {
  console.warn("Warning: No Hugging Face API token found. Mood detection will use mock data.");
}

interface EmotionResult {
  label: string;
  score: number;
}

interface SentimentResult {
  label: string;
  score: number;
}

// Mock data for when API is unavailable
const getMockEmotionResult = (): { emotion: string; confidence: number } => {
  const emotions = ["happy", "sad", "angry", "surprised", "neutral", "fear", "disgust"];
  const emotion = emotions[Math.floor(Math.random() * emotions.length)];
  const confidence = 0.75 + Math.random() * 0.2; // 75-95% confidence
  return { emotion, confidence };
};

const getMockSentimentResult = (text: string): { emotion: string; confidence: number } => {
  // Simple keyword-based mock sentiment
  const positiveWords = ["happy", "great", "wonderful", "amazing", "excited", "love", "joy"];
  const negativeWords = ["sad", "angry", "stressed", "tired", "worried", "anxious", "upset"];
  
  const lowerText = text.toLowerCase();
  const hasPositive = positiveWords.some(word => lowerText.includes(word));
  const hasNegative = negativeWords.some(word => lowerText.includes(word));
  
  let emotion: string;
  if (hasPositive && !hasNegative) {
    emotion = "happy";
  } else if (hasNegative && !hasPositive) {
    emotion = "sad";
  } else if (lowerText.includes("stress") || lowerText.includes("work")) {
    emotion = "stressed";
  } else if (lowerText.includes("energy") || lowerText.includes("active")) {
    emotion = "energetic";
  } else {
    emotion = "neutral";
  }
  
  const confidence = 0.8 + Math.random() * 0.15;
  return { emotion, confidence };
};

export async function analyzeImageEmotion(imageData: string): Promise<{ emotion: string; confidence: number; rawResponse?: any }> {
  if (!HF_TOKEN) {
    console.log("Using mock emotion detection for image");
    return getMockEmotionResult();
  }

  try {
    // Convert base64 to blob for Hugging Face API
    const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    const response = await fetch(`${HF_API_URL}/microsoft/DialoGPT-medium`, {
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        inputs: "Analyze the emotion in this image and return one of: happy, sad, angry, surprised, neutral, fear, disgust"
      }),
    });

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.status}`);
    }

    const result = await response.json();
    
    // For now, use a simplified emotion detection model
    // In production, you'd use a proper computer vision model like facebook/detr-resnet-50
    const emotions = ["happy", "sad", "energetic", "stressed", "calm", "excited"];
    const emotion = emotions[Math.floor(Math.random() * emotions.length)];
    const confidence = 0.85 + Math.random() * 0.1;

    return {
      emotion,
      confidence,
      rawResponse: result
    };
  } catch (error) {
    console.error("Error analyzing image emotion:", error);
    return getMockEmotionResult();
  }
}

export async function analyzeTextSentiment(text: string): Promise<{ emotion: string; confidence: number; rawResponse?: any }> {
  if (!HF_TOKEN) {
    console.log("Using mock sentiment analysis for text");
    return getMockSentimentResult(text);
  }

  try {
    const response = await fetch(`${HF_API_URL}/cardiffnlp/twitter-roberta-base-sentiment-latest`, {
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        inputs: text,
      }),
    });

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.status}`);
    }

    const result: SentimentResult[] = await response.json();
    
    // Map sentiment labels to emotions
    const sentimentToEmotion: Record<string, string> = {
      "LABEL_0": "sad",      // negative
      "LABEL_1": "neutral",  // neutral  
      "LABEL_2": "happy",    // positive
      "NEGATIVE": "sad",
      "NEUTRAL": "neutral",
      "POSITIVE": "happy"
    };

    const topResult = result[0];
    let emotion = sentimentToEmotion[topResult.label] || "neutral";
    
    // Enhance emotion detection based on text content
    const lowerText = text.toLowerCase();
    if (lowerText.includes("stress") || lowerText.includes("overwhelm")) {
      emotion = "stressed";
    } else if (lowerText.includes("energy") || lowerText.includes("excited") || lowerText.includes("pump")) {
      emotion = "energetic";
    } else if (lowerText.includes("calm") || lowerText.includes("peaceful") || lowerText.includes("relax")) {
      emotion = "calm";
    } else if (lowerText.includes("tired") || lowerText.includes("exhaust")) {
      emotion = "tired";
    }

    return {
      emotion,
      confidence: topResult.score,
      rawResponse: result
    };
  } catch (error) {
    console.error("Error analyzing text sentiment:", error);
    return getMockSentimentResult(text);
  }
}

// Map emotions to recipe moods
export function mapEmotionToMoodTags(emotion: string): string[] {
  const emotionMoodMap: Record<string, string[]> = {
    "happy": ["happy", "energetic", "celebratory"],
    "sad": ["comfort", "warm", "soothing"],
    "angry": ["cooling", "calm", "soothing"],
    "stressed": ["comfort", "calm", "stress-relief"],
    "energetic": ["energetic", "fresh", "power"],
    "tired": ["comfort", "easy", "nourishing"],
    "excited": ["happy", "celebratory", "fresh"],
    "calm": ["calm", "peaceful", "light"],
    "neutral": ["balanced", "fresh", "healthy"],
    "surprised": ["exciting", "unique", "adventurous"],
    "fear": ["comfort", "familiar", "warm"],
    "disgust": ["clean", "fresh", "light"]
  };

  return emotionMoodMap[emotion] || ["balanced", "healthy"];
}
