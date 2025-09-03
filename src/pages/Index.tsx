import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import QuestionStep from '@/components/QuestionStep';
import ConvergencePage from '@/components/ConvergencePage';
import ResultsPage from '@/components/ResultsPage';
import { questions } from '@/data/questions';
import { CareerMatcher, GeminiCareerMatcher } from '@/services/careerMatcher';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, Key } from 'lucide-react';

type AppState = 'landing' | 'questions' | 'convergence' | 'results' | 'api-setup';

interface IkigaiAnswers {
  love: string[];
  talent: string[];
  world: string[];
  market: string[];
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<IkigaiAnswers>({
    love: [],
    talent: [],
    world: [],
    market: []
  });
  const [apiKey, setApiKey] = useState('');
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  console.log('App state:', currentState);
  console.log('Current question index:', currentQuestionIndex);

  // Mock career data - in real app, this would come from AI analysis
  const mockCareers = [
    {
      id: '1',
      title: 'Full-Stack Developer',
      match: 92,
      description: 'Build end-to-end web applications using modern technologies like React, Node.js, and cloud platforms.',
      skills: [
        { name: 'JavaScript/TypeScript', level: 'intermediate' as const },
        { name: 'React & Node.js', level: 'intermediate' as const },
        { name: 'Database Design', level: 'beginner' as const },
        { name: 'Cloud Deployment', level: 'beginner' as const }
      ],
      salary: { min: 6, max: 25 },
      demand: 'high' as const,
      location: ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad'],
      roadmap: [
        { week: 1, title: 'HTML/CSS Fundamentals', description: 'Master the building blocks of web development', resources: ['FreeCodeCamp', 'MDN Docs'] },
        { week: 2, title: 'JavaScript Essentials', description: 'Learn core JavaScript concepts and ES6+ features', resources: ['JavaScript.info', 'Codecademy'] },
        { week: 3, title: 'React Basics', description: 'Build your first React components and understand state', resources: ['React Tutorial', 'Scrimba'] },
        { week: 4, title: 'Backend with Node.js', description: 'Create APIs and server-side applications', resources: ['Node.js Guide', 'Express.js'] },
        { week: 5, title: 'Database Integration', description: 'Connect your app to MongoDB/PostgreSQL', resources: ['MongoDB University', 'PostgreSQL Tutorial'] },
        { week: 6, title: 'Full-Stack Project', description: 'Build a complete CRUD application', resources: ['Project Ideas', 'GitHub'] }
      ],
      ikigaiAlignment: {
        love: 'Building digital solutions and coding applications aligns with your passion for technology',
        talent: 'Your problem-solving skills and logical thinking make you naturally suited for development',
        world: 'Creates user-friendly technology that improves digital experiences for millions',
        market: 'High demand with excellent salary growth and remote work opportunities'
      }
    },
    {
      id: '2',
      title: 'Data Scientist',
      match: 87,
      description: 'Extract insights from data using statistical analysis, machine learning, and visualization techniques.',
      skills: [
        { name: 'Python/R Programming', level: 'intermediate' as const },
        { name: 'Statistics & Mathematics', level: 'intermediate' as const },
        { name: 'Machine Learning', level: 'beginner' as const },
        { name: 'Data Visualization', level: 'beginner' as const }
      ],
      salary: { min: 8, max: 30 },
      demand: 'high' as const,
      location: ['Bangalore', 'Mumbai', 'Pune', 'Chennai'],
      roadmap: [
        { week: 1, title: 'Python for Data Science', description: 'Learn Python libraries like Pandas and NumPy', resources: ['Python.org', 'Kaggle Learn'] },
        { week: 2, title: 'Statistics Fundamentals', description: 'Understand descriptive and inferential statistics', resources: ['Khan Academy', 'StatQuest'] },
        { week: 3, title: 'Data Visualization', description: 'Create compelling charts with Matplotlib and Seaborn', resources: ['Plotly', 'Seaborn Tutorial'] },
        { week: 4, title: 'Machine Learning Basics', description: 'Implement your first ML algorithms', resources: ['Scikit-learn', 'Coursera ML'] },
        { week: 5, title: 'Real-world Projects', description: 'Work on Kaggle competitions and datasets', resources: ['Kaggle', 'UCI ML Repository'] },
        { week: 6, title: 'Portfolio Development', description: 'Build a data science portfolio on GitHub', resources: ['GitHub Pages', 'Portfolio Examples'] }
      ],
      ikigaiAlignment: {
        love: 'Analyzing patterns and solving complex problems with data matches your analytical interests',
        talent: 'Your mathematical reasoning and problem-solving abilities are perfect for data science',
        world: 'Helps organizations make better decisions that can improve lives and society',
        market: 'Extremely high demand with top-tier compensation across all industries'
      }
    },
    {
      id: '3',
      title: 'UX/UI Designer',
      match: 79,
      description: 'Design user-centered digital experiences that are both beautiful and functional.',
      skills: [
        { name: 'Design Thinking', level: 'intermediate' as const },
        { name: 'Figma/Sketch', level: 'beginner' as const },
        { name: 'User Research', level: 'beginner' as const },
        { name: 'Prototyping', level: 'beginner' as const }
      ],
      salary: { min: 5, max: 20 },
      demand: 'medium' as const,
      location: ['Bangalore', 'Mumbai', 'Delhi', 'Pune'],
      roadmap: [
        { week: 1, title: 'Design Fundamentals', description: 'Learn color theory, typography, and layout principles', resources: ['Adobe Color', 'Typography.com'] },
        { week: 2, title: 'User Research Methods', description: 'Conduct interviews and usability testing', resources: ['IDEO Design Kit', 'UserTesting'] },
        { week: 3, title: 'Wireframing & Prototyping', description: 'Create low and high-fidelity mockups', resources: ['Figma Academy', 'Balsamiq'] },
        { week: 4, title: 'UI Design Systems', description: 'Build consistent and scalable design systems', resources: ['Material Design', 'Design Systems'] },
        { week: 5, title: 'User Testing & Iteration', description: 'Test designs with real users and iterate', resources: ['UsabilityHub', 'Maze'] },
        { week: 6, title: 'Portfolio Creation', description: 'Showcase your design process and case studies', resources: ['Behance', 'Dribbble'] }
      ],
      ikigaiAlignment: {
        love: 'Creating beautiful and functional designs aligns with your creative passions',
        talent: 'Your visual thinking and attention to detail make you naturally suited for design',
        world: 'Makes technology more accessible and user-friendly for everyone',
        market: 'Growing demand as companies prioritize user experience and digital transformation'
      }
    }
  ];

  const handleStartJourney = () => {
    setCurrentState('questions');
  };

  const handleQuestionAnswer = (questionAnswers: string[]) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.circle]: questionAnswers
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentState('convergence');
    }
  };

  const handleBackToQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleConvergenceComplete = async () => {
    if (!apiKey) {
      setCurrentState('api-setup');
      return;
    }

    setLoading(true);
    try {
      // Use Perplexity API for real AI recommendations  
      const matcher = new GeminiCareerMatcher(apiKey);
      const recommendations = await matcher.getCareerRecommendations(answers);
      setCareers(recommendations);
      setCurrentState('results');
    } catch (error) {
      console.error('Error getting recommendations:', error);
      // Fallback to mock data
      const matcher = new CareerMatcher('');
      setCareers(matcher.getMockCareers());
      setCurrentState('results');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPlan = (career: any) => {
    // In real app, this would generate and download a PDF
    console.log('Exporting plan for:', career.title);
  };

  const handleRestartJourney = () => {
    setCurrentState('landing');
    setCurrentQuestionIndex(0);
    setAnswers({ love: [], talent: [], world: [], market: [] });
  };

  return (
    <div>
      {currentState === 'landing' && (
        <LandingPage onStartJourney={handleStartJourney} />
      )}
      
      {currentState === 'questions' && (
        <QuestionStep
          question={questions[currentQuestionIndex]}
          stepNumber={currentQuestionIndex + 1}
          onNext={handleQuestionAnswer}
          onBack={currentQuestionIndex > 0 ? handleBackToQuestion : undefined}
        />
      )}
      
      {currentState === 'convergence' && (
        <ConvergencePage onContinue={handleConvergenceComplete} />
      )}

      {currentState === 'api-setup' && (
        <div className="min-h-screen flex items-center justify-center p-6">
          <Card className="max-w-md w-full p-8 text-center">
            <div className="mb-6">
              <Key className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">AI Configuration</h2>
              <p className="text-muted-foreground">
                Enter your Perplexity API key to get AI-powered career recommendations
              </p>
            </div>
            
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter Perplexity API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="w-4 h-4" />
                <span>Your API key is stored locally and never shared</span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCareers(mockCareers);
                    setCurrentState('results');
                  }}
                  className="flex-1"
                >
                  Use Mock Data
                </Button>
                <Button
                  onClick={handleConvergenceComplete}
                  disabled={!apiKey || loading}
                  className="flex-1"
                >
                  {loading ? 'Analyzing...' : 'Get AI Recommendations'}
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                Get your free API key at{' '}
                <a href="https://perplexity.ai" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  perplexity.ai
                </a>
              </p>
            </div>
          </Card>
        </div>
      )}
      
      {currentState === 'results' && (
        <ResultsPage
          careers={careers.length > 0 ? careers : mockCareers}
          onExportPlan={handleExportPlan}
          onRestartJourney={handleRestartJourney}
        />
      )}
    </div>
  );
};

export default Index;
