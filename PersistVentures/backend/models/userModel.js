import mongoose from 'mongoose';

const skillEnum = [
  'JavaScript',
  'Python',
  'React',
  'Node.js',
  'Angular',
  'Vue.js',
  'MongoDB',
  'SQL',
  'Java',
  'C++',
  'TypeScript',
  'HTML',
  'CSS',
  'Git',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GCP',
  'RESTful APIs',
  'GraphQL',
  'Express.js',
  'Django',
  'Flask',
  'Spring Boot',
  'Ruby on Rails',
  'Swift',
  'Kotlin',
  'Data Structures',
  'Algorithms',
  'Testing (Jest, Mocha, JUnit, etc.)',
  'CI/CD',
  'Agile',
  'Scrum',
  'Project Management',
  'Communication',
  'Problem Solving',
  'UI/UX Design',
  'Database Management',
  'Cloud Computing',
  'Machine Learning',
  'Deep Learning',
  'Data Analysis',
  'DevOps',
  'System Design',
  'Mobile Development',
  'Frontend Development',
  'Backend Development',
  'Fullstack Development',
  'API Development',
  'Security',
  'Network Administration',
  'Linux',
  'Windows',
  'Data Science',
  'Quality Assurance',
  'Technical Writing',
  'Version Control',
  'Cloud Security',
  'Cybersecurity',
  'Containerization',
  'Microservices',
  'Serverless Computing',
];

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    phoneNumber: { type: String, require: true },
    linkedInUrl: { type: String },
    skills: {
      type: [
        {
          type: String,
          enum: skillEnum,
        },
      ],
      require: true,
    },
    jobsApplied: {
      type: [
        {
          type: String,
        },
      ],
    },
    jobsSaved: {
      type: [
        {
          type: String,
        },
      ],
    },
    experience: { type: String, require: true },
    professionalSummary: { type: String },
    isRecruiter: { type: Boolean },
  },
  { timestamps: true }
);

const userModel = mongoose.model.user || mongoose.model('user', userSchema);

export { userModel, skillEnum };
