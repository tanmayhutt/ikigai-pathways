import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import IkigaiCircles from './IkigaiCircles';

interface LandingPageProps {
  onStartJourney: () => void;
}

const LandingPage = ({ onStartJourney }: LandingPageProps) => {
  const [hovering, setHovering] = useState(false);

  console.log('LandingPage rendered');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-20 w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-32 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Hero Content */}
      <div className="text-center space-y-8 max-w-4xl mx-auto px-6 z-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Powered by Google Cloud AI</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            Find Your{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              Ikigai
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover what you love, what you're good at, what the world needs, 
            and what you can be paid for — all in one personalized journey.
          </p>
        </div>

        {/* Interactive Circles Preview */}
        <div className="relative">
          <IkigaiCircles step={4} />
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <Button
            onClick={onStartJourney}
            size="lg"
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 transition-all duration-500 group"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            Start Your Ikigai Journey
            <ArrowRight 
              className={`w-5 h-5 ml-2 transition-transform duration-300 ${
                hovering ? 'translate-x-1' : ''
              }`} 
            />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Takes 3 minutes • Get personalized career recommendations
          </p>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default LandingPage;