import honestReturns from '../assets/projects/honest-returns.jpg';
import dailyCynthia from '../assets/projects/daily-cynthia.jpg';
import expenseTracker from '../assets/projects/expense-tracker.jpg';
import aiSandbox from '../assets/projects/ai-sandbox.svg';
import clearcare from '../assets/projects/clearcare.jpg';
import ultimateRide from '../assets/projects/ultimate-ride.jpg';

// live is optional. Leave it out and no live link renders.
export const projects = [
  {
    name: 'Honest Returns',
    stack: 'React, TypeScript, Hono, Cloudflare Workers, D1',
    year: 2026,
    description:
      'A free web app for Singapore investors holding US assets. Upload a broker statement and it works out your real return in SGD, time-weighted next to XIRR, and explains why the two differ. The maths runs in your browser.',
    github: 'https://github.com/OwenNyo/honest-returns',
    live: 'https://honest-returns.owennyo.com',
    image: honestReturns,
    imageAlt: 'Honest Returns home page comparing a time-weighted return of 21.5% with an XIRR of 14.6%',
  },
  {
    name: 'Daily Cynthia',
    stack: 'Preact, TypeScript, Pokemon Showdown engine, Cloudflare Workers',
    year: 2026,
    description:
      'A daily Pokemon puzzle. Everyone gets the same random team of six and one official battle against Champion Cynthia from Platinum, with a global leaderboard and a shareable result grid.',
    github: 'https://github.com/OwenNyo/daily-cynthia',
    live: 'https://daily-cynthia.owennyo.com',
    image: dailyCynthia,
    imageAlt: 'Daily Cynthia battle screen with Wailord facing Spiritomb inside a DS-style frame',
  },
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
    imageAlt: 'A friendly tutor robot in a sandbox, with a speech bubble and a stack of books',
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
