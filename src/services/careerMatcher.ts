interface IkigaiAnswers {
  love: string[];
  talent: string[];
  world: string[];
  market: string[];
}

interface CareerRecommendation {
  title: string;
  match: number;
  description: string;
  skills: { name: string; level: 'beginner' | 'intermediate' | 'advanced' }[];
  salary: { min: number; max: number };
  demand: 'high' | 'medium' | 'low';
  location: string[];
  ikigaiAlignment: {
    love: string;
    talent: string;
    world: string;
    market: string;
  };
  roadmap: {
    week: number;
    title: string;
    description: string;
    resources: string[];
  }[];
}

export class CareerMatcher {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getCareerRecommendations(answers: IkigaiAnswers): Promise<CareerRecommendation[]> {
    const prompt = `
    Based on the following Ikigai answers, recommend 3 specific career paths for an Indian student:

    What they LOVE: ${answers.love.join(', ')}
    What they're GOOD AT: ${answers.talent.join(', ')}
    What the WORLD NEEDS: ${answers.world.join(', ')}
    What they can be PAID FOR: ${answers.market.join(', ')}

    For each career, provide:
    1. Job title
    2. Match percentage (0-100)
    3. Description (2-3 sentences)
    4. Required skills with levels
    5. Salary range in India (LPA)
    6. Market demand (high/medium/low)
    7. Top job locations in India
    8. How it aligns with each Ikigai circle
    9. 6-week learning roadmap with resources

    Focus on realistic, in-demand careers in the Indian job market. Include both traditional and emerging roles.

    Return as valid JSON array.
    `;

    try {
      // For Google Cloud Vertex AI
      const response = await fetch('/api/vertex-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          temperature: 0.3,
          maxTokens: 2000
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI recommendations');
      }

      const data = await response.json();
      return this.parseAIResponse(data.response);
    } catch (error) {
      console.error('Error getting career recommendations:', error);
      // Fallback to mock data
      return this.getMockCareers();
    }
  }

  private parseAIResponse(aiResponse: string): CareerRecommendation[] {
    try {
      return JSON.parse(aiResponse);
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return this.getMockCareers();
    }
  }

  public getMockCareers(): CareerRecommendation[] {
    return [
      {
        title: 'Full-Stack Developer',
        match: 92,
        description: 'Build end-to-end web applications using modern technologies like React, Node.js, and cloud platforms.',
        skills: [
          { name: 'JavaScript/TypeScript', level: 'intermediate' },
          { name: 'React & Node.js', level: 'intermediate' },
          { name: 'Database Design', level: 'beginner' },
          { name: 'Cloud Deployment', level: 'beginner' }
        ],
        salary: { min: 6, max: 25 },
        demand: 'high',
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
      }
    ];
  }
}

// Perplexity AI Alternative (if not using Google Cloud)
export class GeminiCareerMatcher {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getCareerRecommendations(answers: IkigaiAnswers): Promise<CareerRecommendation[]> {
    const prompt = `Based on the following Ikigai answers, recommend 3 specific career paths for an Indian student:

What they LOVE: ${answers.love.join(', ')}
What they're GOOD AT: ${answers.talent.join(', ')}
What the WORLD NEEDS: ${answers.world.join(', ')}
What they can be PAID FOR: ${answers.market.join(', ')}

Return ONLY a valid JSON array with career recommendations including match percentage, skills, salary ranges, and roadmap.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 2048 }
        })
      });

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : new CareerMatcher('').getMockCareers();
    } catch (error) {
      return new CareerMatcher('').getMockCareers();
    }
  }
}