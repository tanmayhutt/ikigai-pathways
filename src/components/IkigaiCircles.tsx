import { useState, useEffect } from 'react';
import { Heart, Lightbulb, Globe, DollarSign } from 'lucide-react';

interface IkigaiCirclesProps {
  step: number;
  converging?: boolean;
}

const IkigaiCircles = ({ step, converging = false }: IkigaiCirclesProps) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (converging) {
      const timer = setTimeout(() => setAnimationStep(1), 500);
      return () => clearTimeout(timer);
    }
  }, [converging]);

  const circles = [
    {
      id: 'love',
      icon: Heart,
      title: 'What You Love',
      description: 'Your passion & interests',
      position: 'top-left',
      active: step >= 1
    },
    {
      id: 'talent', 
      icon: Lightbulb,
      title: 'What You\'re Good At',
      description: 'Your strengths & skills',
      position: 'top-right',
      active: step >= 2
    },
    {
      id: 'world',
      icon: Globe,
      title: 'What the World Needs',
      description: 'Your mission & impact',
      position: 'bottom-left',
      active: step >= 3
    },
    {
      id: 'market',
      icon: DollarSign,
      title: 'What You Can Be Paid For',
      description: 'Your profession & opportunities',
      position: 'bottom-right',
      active: step >= 4
    }
  ];

  const getCircleClasses = (circle: any) => {
    const baseClasses = `w-32 h-32 rounded-full relative overflow-hidden transition-all duration-700 hover:scale-110 backdrop-blur-sm border-2`;
    
    if (converging) {
      return `${baseClasses} animate-bounce`;
    }
    
    if (circle.active) {
      return `${baseClasses} opacity-100 shadow-lg`;
    }
    
    return `${baseClasses} opacity-30`;
  };

  const getPositionClasses = (position: string, converging: boolean) => {
    if (converging) {
      return 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
    }
    
    switch (position) {
      case 'top-left': return 'absolute top-8 left-8';
      case 'top-right': return 'absolute top-8 right-8';
      case 'bottom-left': return 'absolute bottom-8 left-8';
      case 'bottom-right': return 'absolute bottom-8 right-8';
      default: return '';
    }
  };

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      {circles.map((circle) => {
        const Icon = circle.icon;
        return (
          <div
            key={circle.id}
            className={`${getCircleClasses(circle)} ${getPositionClasses(circle.position, converging)} ${
              circle.id === 'love' ? 'bg-pink-500/20 border-pink-500' :
              circle.id === 'talent' ? 'bg-green-500/20 border-green-500' :
              circle.id === 'world' ? 'bg-yellow-500/20 border-yellow-500' :
              'bg-blue-500/20 border-blue-500'
            }`}
            style={{
              animationDelay: `${circles.indexOf(circle) * 0.2}s`
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <Icon className="w-8 h-8 mb-2 text-foreground" />
              <div className="text-xs font-medium text-foreground opacity-90">
                {circle.title}
              </div>
            </div>
            
            {circle.active && !converging && (
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-sm text-muted-foreground whitespace-nowrap">
                  {circle.description}
                </div>
              </div>
            )}
          </div>
        );
      })}
      
      {converging && animationStep >= 1 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent text-3xl font-bold animate-pulse">
            YOUR IKIGAI
          </div>
          <div className="text-center text-muted-foreground mt-2">
            Where all circles meet
          </div>
        </div>
      )}
    </div>
  );
};

export default IkigaiCircles;