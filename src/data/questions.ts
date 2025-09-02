export interface Question {
  id: string;
  circle: 'love' | 'talent' | 'world' | 'market';
  question: string;
  placeholder: string;
  options: string[];
}

export const questions: Question[] = [
  {
    id: 'love',
    circle: 'love',
    question: 'What activities make you lose track of time?',
    placeholder: 'Enter something you love doing...',
    options: [
      'Creating digital content and designs',
      'Solving complex problems with data',
      'Building and coding applications',
      'Teaching and mentoring others',
      'Analyzing market trends and patterns',
      'Writing and storytelling',
      'Organizing events and projects',
      'Researching new technologies'
    ]
  },
  {
    id: 'talent',
    circle: 'talent',
    question: 'What do people often ask for your help with?',
    placeholder: 'Enter a skill you excel at...',
    options: [
      'Technical troubleshooting and debugging',
      'Creative design and visual thinking',
      'Data analysis and interpretation',
      'Communication and presentation',
      'Leadership and team coordination',
      'Mathematical and logical reasoning',
      'Language and writing skills',
      'Strategic planning and organization'
    ]
  },
  {
    id: 'world',
    circle: 'world',
    question: 'What problems in society would you like to solve?',
    placeholder: 'Enter a problem you care about...',
    options: [
      'Improving education accessibility',
      'Making technology more user-friendly',  
      'Reducing environmental impact',
      'Enhancing healthcare delivery',
      'Bridging the digital divide',
      'Supporting mental health awareness',
      'Promoting financial literacy',
      'Creating inclusive digital experiences'
    ]
  },
  {
    id: 'market',
    circle: 'market',
    question: 'Which skills do you think have strong earning potential?',
    placeholder: 'Enter a marketable skill...',
    options: [
      'Full-stack web development',
      'Data science and machine learning',
      'Digital marketing and SEO',
      'Cloud computing and DevOps',
      'UI/UX design and user research',
      'Mobile app development',
      'Cybersecurity and ethical hacking',
      'Product management and strategy'
    ]
  }
];