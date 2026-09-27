import expenseTracker from '../assets/projects/expense-tracker.jpg';
import aiSandbox from '../assets/projects/ai-sandbox.jpg';
import clearcare from '../assets/projects/clearcare.jpg';
import ultimateRide from '../assets/projects/ultimate-ride.jpg';

// live is optional. Leave it out and no live link renders.
export const projects = [
  {
    name: 'Expense Tracker',
    stack: 'MongoDB, Express, React, Node',
    year: 2025,
    description:
      'A MERN app for personal finances. Add, edit, and delete income and expenses, see a live balance, and read spending patterns off a dashboard. Sign-in and persistent storage included.',
    github: 'https://github.com/OwenNyo/Expense-Tracker',
    image: expenseTracker,
    imageAlt: 'Expense Tracker dashboard showing balance and recent transactions',
  },
  {
    name: 'Unified AI Sandbox',
    stack: 'React, Flask, SQL',
    year: 2025,
    description:
      'A React and Flask platform where instructors configure a chatbot per module and students get on-demand academic help. Handles users, credits, and the instructor workflows around them.',
    github: 'https://github.com/huisotong/ICT2214-ITP',
    image: aiSandbox,
    imageAlt: 'Unified AI Sandbox chat interface with module bots listed on the left',
  },
  {
    name: 'ClearCare',
    stack: 'C#, ASP.NET',
    year: 2024,
    description:
      'Coordinates and schedules pre-discharge services for hospital patients. Role-based access for providers, one place for patient data, service scheduling, and home safety assessments.',
    github: 'https://github.com/OwenNyo/ICT2112-Software-Design-SD',
    image: clearcare,
    imageAlt: 'ClearCare scheduling screen for pre-discharge services',
  },
  {
    name: 'Ultimate Ride',
    stack: 'Python, Flask',
    year: 2024,
    description:
      'Plans shuttle routes from the airport to hotels, minimising time, cost, distance, and CO2. Commuters book a seat and register through the app.',
    github: 'https://github.com/OwenNyo/INF1008-DSA',
    image: ultimateRide,
    imageAlt: 'Ultimate Ride route map from the airport to hotels',
  },
];
