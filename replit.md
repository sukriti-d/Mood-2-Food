# Overview

This is a mood-based recipe recommendation application called "Mood2Food" that uses AI to analyze users' emotional states and suggest appropriate recipes. The application combines computer vision and natural language processing to detect mood from uploaded images or text input, then provides personalized recipe recommendations that match the user's emotional state.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **File Upload**: Native HTML5 file input with multer processing on backend

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for server bundling, Vite for client builds
- **API Pattern**: RESTful endpoints with JSON responses
- **Error Handling**: Centralized error middleware with status code mapping

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Connection**: Neon Database serverless driver
- **Schema Management**: Drizzle Kit for migrations and schema synchronization
- **Development Storage**: In-memory storage implementation for development/testing
- **Session Handling**: PostgreSQL session store with connect-pg-simple

## Database Schema Design
- **Users**: Basic authentication with username/password
- **Recipes**: Comprehensive recipe data with mood tags, dietary tags, and nutritional information
- **Mood Analysis**: Stores AI analysis results with session tracking and recipe recommendations
- **User Preferences**: Dietary restrictions and personalization settings

## AI Integration Pattern
- **Image Analysis**: Hugging Face models for facial emotion recognition
- **Text Analysis**: Sentiment analysis using Hugging Face NLP models
- **Fallback Strategy**: Mock data generation when AI services are unavailable
- **Mood Mapping**: Custom algorithm to map emotions to recipe mood tags

## Authentication & Sessions
- **Session-based**: Uses session IDs for anonymous users
- **User Authentication**: Optional user accounts with password-based login
- **Cross-request Persistence**: Session storage for maintaining analysis history

# External Dependencies

## AI/ML Services
- **Hugging Face API**: Primary AI service for emotion detection and sentiment analysis
- **Models Used**: Computer vision models for facial emotion recognition, NLP models for text sentiment

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection Pooling**: Built-in connection management through Neon driver

## Development Tools
- **Replit Integration**: Custom plugins for development environment
- **Vite Plugins**: Error overlay and cartographer for enhanced development experience

## UI Component Libraries
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Additional icon sets for social media and branding

## Build & Development Dependencies
- **TypeScript**: Static type checking across frontend and backend
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **PostCSS**: CSS processing with autoprefixer
- **Drizzle Kit**: Database schema management and migration tools