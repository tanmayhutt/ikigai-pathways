import { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import IkigaiCircles from './IkigaiCircles';

interface ConvergencePageProps {
  onContinue: () => void;
}

const ConvergencePage = ({ onContinue }: ConvergencePageProps) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const stages = [
      () => setStage(1), // Show convergence
      () => setStage(2), // Show intersections
      () => setStage(3), // Show final ikigai
    ];

    stages.forEach((stageFunc, index) => {
      setTimeout(stageFunc, (index + 1) * 1500);
    });
  }, []);

  const intersections = [
    {
      title: 'Passion',
      description: 'What you love + What you\'re good at',
      colors: 'from-ikigai-love to-ikigai-talent',
      delay: '0s'
    },
    {
      title: 'Mission', 
      description: 'What you love + What the world needs',
      colors: 'from-ikigai-love to-ikigai-world',
      delay: '0.5s'
    },
    {
      title: 'Profession',
      description: 'What you\'re good at + What you can be paid for',
      colors: 'from-ikigai-talent to-ikigai-market',
      delay: '1s'
    },
    {
      title: 'Vocation',
      description: 'What the world needs + What you can be paid for',
      colors: 'from-ikigai-world to-ikigai-market',
      delay: '1.5s'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Your Circles Are{' '}
            <span className="cosmic-text">Converging</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Discovering where your answers intersect
          </p>
        </div>

        {/* Circles Animation */}
        <div className="relative">
          <IkigaiCircles step={4} converging={stage >= 1} />
        </div>

        {/* Intersections */}
        {stage >= 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {intersections.map((intersection, index) => (
              <div
                key={intersection.title}
                className="hero-card p-6 text-left animate-fade-in"
                style={{ animationDelay: intersection.delay }}
              >
                <div 
                  className={`w-full h-2 rounded-full bg-gradient-to-r ${intersection.colors} mb-4`}
                />
                <h3 className="text-lg font-semibold mb-2">{intersection.title}</h3>
                <p className="text-sm text-muted-foreground">{intersection.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Final Message */}
        {stage >= 3 && (
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '2s' }}>
            <div className="hero-card p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">
                Your Ikigai Profile is Complete!
              </h2>
              <p className="text-muted-foreground mb-6">
                We've analyzed your answers and identified where all four circles 
                intersect. Now let's find careers that align with your unique Ikigai.
              </p>
              <Button
                onClick={onContinue}
                size="lg"
                className="bg-gradient-cosmic hover:shadow-cosmic group"
              >
                Discover Your Career Path
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConvergencePage;