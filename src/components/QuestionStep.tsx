import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Plus, Check } from 'lucide-react';
import IkigaiCircles from './IkigaiCircles';

interface Question {
  id: string;
  circle: 'love' | 'talent' | 'world' | 'market';
  question: string;
  placeholder: string;
  options: string[];
}

interface QuestionStepProps {
  question: Question;
  stepNumber: number;
  onNext: (answers: string[]) => void;
  onBack?: () => void;
}

const QuestionStep = ({ question, stepNumber, onNext, onBack }: QuestionStepProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [customAnswer, setCustomAnswer] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleOptionSelect = (option: string) => {
    setSelectedAnswers(prev => 
      prev.includes(option) 
        ? prev.filter(a => a !== option)
        : [...prev, option]
    );
  };

  const handleAddCustom = () => {
    if (customAnswer.trim()) {
      setSelectedAnswers(prev => [...prev, customAnswer.trim()]);
      setCustomAnswer('');
      setShowCustomInput(false);
    }
  };

  const handleNext = () => {
    if (selectedAnswers.length > 0) {
      onNext(selectedAnswers);
    }
  };

  const getCircleColor = (circle: string) => {
    switch (circle) {
      case 'love': return 'border-ikigai-love bg-ikigai-love/10';
      case 'talent': return 'border-ikigai-talent bg-ikigai-talent/10';
      case 'world': return 'border-ikigai-world bg-ikigai-world/10';
      case 'market': return 'border-ikigai-market bg-ikigai-market/10';
      default: return 'border-border';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Header */}
      <div className="p-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">
              Step {stepNumber} of 4
            </div>
            <div className="text-sm text-muted-foreground">
              {Math.round((stepNumber / 4) * 100)}% Complete
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-cosmic h-2 rounded-full transition-all duration-500"
              style={{ width: `${(stepNumber / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Question Content */}
        <div className="flex-1 p-6">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">{question.question}</h2>
              <p className="text-muted-foreground">
                Select all that apply, or add your own
              </p>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, index) => (
                <Card
                  key={index}
                  className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-card ${
                    selectedAnswers.includes(option)
                      ? `${getCircleColor(question.circle)} shadow-card`
                      : 'hover:border-primary'
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {selectedAnswers.includes(option) && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Custom Answer Section */}
            <div className="space-y-4">
              {!showCustomInput ? (
                <Button
                  variant="outline"
                  onClick={() => setShowCustomInput(true)}
                  className="w-full border-dashed"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your Own Answer
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Input
                    value={customAnswer}
                    onChange={(e) => setCustomAnswer(e.target.value)}
                    placeholder={question.placeholder}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCustom()}
                    className="flex-1"
                  />
                  <Button onClick={handleAddCustom} disabled={!customAnswer.trim()}>
                    Add
                  </Button>
                </div>
              )}
            </div>

            {/* Selected Answers */}
            {selectedAnswers.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">
                  Your Selections:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAnswers.map((answer, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${getCircleColor(question.circle)}`}
                    >
                      {answer}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-8">
              {onBack && (
                <Button variant="outline" onClick={onBack}>
                  Back
                </Button>
              )}
              <div className="ml-auto">
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswers.length === 0}
                  className="bg-gradient-cosmic"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Circles Visualization */}
        <div className="w-96 p-6 border-l border-border">
          <div className="sticky top-6">
            <h3 className="text-lg font-semibold mb-4 text-center">Your Ikigai Journey</h3>
            <IkigaiCircles step={stepNumber} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionStep;