import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  MapPin, 
  Clock, 
  BookOpen, 
  ExternalLink,
  Download,
  Star,
  Users,
  DollarSign 
} from 'lucide-react';

interface Career {
  id: string;
  title: string;
  match: number;
  description: string;
  skills: { name: string; level: 'beginner' | 'intermediate' | 'advanced' }[];
  salary: { min: number; max: number };
  demand: 'high' | 'medium' | 'low';
  location: string[];
  roadmap: {
    week: number;
    title: string;
    description: string;
    resources: string[];
  }[];
  ikigaiAlignment: {
    love: string;
    talent: string;
    world: string;
    market: string;
  };
}

interface ResultsPageProps {
  careers: Career[];
  onExportPlan: (career: Career) => void;
  onRestartJourney: () => void;
}

const ResultsPage = ({ careers, onExportPlan, onRestartJourney }: ResultsPageProps) => {
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'roadmap' | 'ikigai'>('overview');

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-orange-400 bg-orange-400/10';
      default: return 'text-muted-foreground';
    }
  };

  const getSkillColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-400/20 text-green-400';
      case 'intermediate': return 'bg-yellow-400/20 text-yellow-400';
      case 'advanced': return 'bg-red-400/20 text-red-400';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Your <span className="cosmic-text">Career Matches</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Based on your Ikigai profile, here are careers that align with your passions, 
            skills, and market opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Career Cards */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Top Recommendations</h2>
            {careers.map((career) => (
              <Card
                key={career.id}
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-card ${
                  selectedCareer?.id === career.id 
                    ? 'border-primary shadow-cosmic' 
                    : 'hover:border-primary/50'
                }`}
                onClick={() => setSelectedCareer(career)}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{career.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {career.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{career.match}%</span>
                      </div>
                      <div className="text-xs text-muted-foreground">match</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <Badge className={getDemandColor(career.demand)}>
                      {career.demand} demand
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span>₹{career.salary.min}L-{career.salary.max}L</span>
                    </div>
                  </div>

                  <Progress value={career.match} className="h-2" />
                </div>
              </Card>
            ))}

            <Button
              variant="outline"
              onClick={onRestartJourney}
              className="w-full mt-6"
            >
              Retake Assessment
            </Button>
          </div>

          {/* Career Details */}
          <div className="lg:col-span-2">
            {selectedCareer ? (
              <div className="space-y-6">
                {/* Career Header */}
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{selectedCareer.title}</h2>
                      <p className="text-muted-foreground">{selectedCareer.description}</p>
                    </div>
                    <Button
                      onClick={() => onExportPlan(selectedCareer)}
                      className="bg-gradient-cosmic"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Plan
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{selectedCareer.match}%</div>
                      <div className="text-sm text-muted-foreground">Ikigai Match</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">₹{selectedCareer.salary.min}L-{selectedCareer.salary.max}L</div>
                      <div className="text-sm text-muted-foreground">Salary Range</div>
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${getDemandColor(selectedCareer.demand).split(' ')[0]}`}>
                        {selectedCareer.demand.toUpperCase()}
                      </div>
                      <div className="text-sm text-muted-foreground">Market Demand</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{selectedCareer.roadmap.length}</div>
                      <div className="text-sm text-muted-foreground">Week Plan</div>
                    </div>
                  </div>
                </Card>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-border">
                  {[
                    { id: 'overview', label: 'Overview', icon: Users },
                    { id: 'roadmap', label: '12-Week Roadmap', icon: BookOpen },
                    { id: 'ikigai', label: 'Ikigai Alignment', icon: Star }
                  ].map(tab => {
                    const Icon = tab.icon;
                    return (
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? 'default' : 'ghost'}
                        onClick={() => setActiveTab(tab.id as any)}
                        className="rounded-b-none"
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {tab.label}
                      </Button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                  {activeTab === 'overview' && (
                    <>
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Required Skills</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedCareer.skills.map((skill, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                              <span className="font-medium">{skill.name}</span>
                              <Badge className={getSkillColor(skill.level)}>
                                {skill.level}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </Card>

                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Job Market Insights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-primary" />
                            <div>
                              <div className="font-medium">Top Locations</div>
                              <div className="text-sm text-muted-foreground">
                                {selectedCareer.location.join(', ')}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            <div>
                              <div className="font-medium">Growth Rate</div>
                              <div className="text-sm text-muted-foreground">
                                15% annually
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </>
                  )}

                  {activeTab === 'roadmap' && (
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold mb-6">12-Week Learning Path</h3>
                      <div className="space-y-4">
                        {selectedCareer.roadmap.slice(0, 6).map((week) => (
                          <div key={week.week} className="flex gap-4 p-4 rounded-lg bg-muted/30">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="font-bold text-primary">{week.week}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold mb-2">{week.title}</h4>
                              <p className="text-sm text-muted-foreground mb-3">{week.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {week.resources.map((resource, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    <ExternalLink className="w-3 h-3 mr-1" />
                                    {resource}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="text-center pt-4">
                          <p className="text-sm text-muted-foreground">
                            + {selectedCareer.roadmap.length - 6} more weeks in the full plan
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}

                  {activeTab === 'ikigai' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-6 border-ikigai-love/30">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-4 h-4 rounded-full bg-ikigai-love" />
                          <h3 className="font-semibold">What You Love</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {selectedCareer.ikigaiAlignment.love}
                        </p>
                      </Card>

                      <Card className="p-6 border-ikigai-talent/30">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-4 h-4 rounded-full bg-ikigai-talent" />
                          <h3 className="font-semibold">What You're Good At</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {selectedCareer.ikigaiAlignment.talent}
                        </p>
                      </Card>

                      <Card className="p-6 border-ikigai-world/30">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-4 h-4 rounded-full bg-ikigai-world" />
                          <h3 className="font-semibold">What the World Needs</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {selectedCareer.ikigaiAlignment.world}
                        </p>
                      </Card>

                      <Card className="p-6 border-ikigai-market/30">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-4 h-4 rounded-full bg-ikigai-market" />
                          <h3 className="font-semibold">What You Can Be Paid For</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {selectedCareer.ikigaiAlignment.market}
                        </p>
                      </Card>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="cosmic-text text-6xl mb-4">✨</div>
                <h3 className="text-xl font-semibold mb-2">Select a Career</h3>
                <p className="text-muted-foreground">
                  Choose a career from the left to see detailed information and your personalized roadmap.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;