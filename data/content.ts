export type ProjectMediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "youtube"; id: string };

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  /** @deprecated Use `media` instead */
  youtubeId?: string;
  /** @deprecated Use `media` instead */
  imageUrl?: string;
  media?: ProjectMediaItem[];
}

export interface Interest {
  id: string;
  label: string;
  icon: string;
}

export interface Course {
  name: string;
  grade?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  courses: Course[];
}

export interface SiteContent {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  projects: Project[];
  interests: Interest[];
  education: Education[];
}

const content: SiteContent = {
  name: "Ronald",
  role: "Software Engineer",
  tagline: "Turning problems into solutions, one commit at a time.",
  bio: "I'm passionate about taking concepts and turning them into real products. I enjoy exploring machine learning and building tools that I find useful for my personal life.",
  email: "r3ma@uwaterloo.ca",
  github: "https://github.com/ItsRonald99",
  linkedin: "https://linkedin.com/ronald-ma99",

  projects: [
    {
      id: "project-1",
      title: "Our Turn - Housemate Chore Tracker App",
      description: "A chore management app for my housemates and I to track and assign chores.",
      longDescription: "Our Turn is a full-stack household chore management app that lets users create or join shared house groups, assign tasks with flexible scheduling (manual, rotation, recurring), and track completion through a visual dashboard. It features secure authentication (JWT-based), role-based permissions, invitations, and automated email + in-app reminders for overdue chores.",
      tags: ["React (Vite)", "Node.js", "Drizzle ORM", "SQLite"],
      githubUrl: "https://github.com/ItsRonald99/Our_Turn",
      media: [
        { type: "image", src: "/images/OurTurn_Landing.png", alt: "Our Turn landing page" },
        { type: "image", src: "/images/OurTurn_HouseGroup.png", alt: "Our Turn group view" },
      ],
    },
    {
      id: "project-2",
      title: "CallMe - QR-Based Contact Sharing App",
      description: "A modern app that lets users share their contact information instantly via a personal QR code.",
      longDescription: "CallMe is a full-stack web application that enables users to create a private, customizable contact profile and share it seamlessly through a generated QR code or direct link. Users can manage multiple contact methods (phone, email, social links, custom URLs) with per-item visibility controls, ensuring privacy and flexibility. The app features secure authentication via Clerk, a responsive dashboard for profile management, and public profile pages that require no login to view, making real-world networking frictionless.",
      tags: ["Next.js 15", "PostgreSQL", "Prisma ORM", "Clerk Auth", "Tailwind CSS"],
      githubUrl: "https://github.com/ItsRonald99/CallMe", // update if different
      media: [
        { type: "image", src: "/images/CallMe_Landing.png", alt: "CallMe landing page" },
        { type: "image", src: "/images/CallMe_Dashboard.png", alt: "CallMe dashboard view" },
      ],
    },
    {
      id: "project-3",
      title: "WordMax - AI Vocabulary Learning App",
      description: "A vocabulary learning app that helps users capture new words, practice them with AI-generated exercises, and retain them using spaced repetition.",
      longDescription: "WordMax is a full-stack AI-powered vocabulary learning app that lets users build a personal dictionary by saving words with context and example sentences. It automatically generates diverse practice exercises (fill-in-the-blank, real-world usage, sentence rewrites) using OpenAI, and reinforces retention through a spaced repetition system that adapts based on user performance. The app includes secure authentication, a structured practice workflow, and a dashboard for tracking learning progress.",
      tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Supabase (PostgreSQL + Auth)", "OpenAI GPT-4o-mini", "Vercel"],
      githubUrl: "https://github.com/ItsRonald99/WordMax",
      media: [
        {
          type: "image",
          src: "/images/WordMax_Landing.png",
          alt: "WordMax dashboard view"
        },
        {
          type: "image",
          src: "/images/WordMax_Practice.png",
          alt: "WordMax practice session interface"
        }
      ],
    }
  ],

  interests: [
    { id: "int-2", label: "Exercising", icon: "🏋️" },
    { id: "int-3", label: "Gaming", icon: "🎮" },
    { id: "int-5", label: "Nature Walks", icon: "🏔️" },
    { id: "int-6", label: "Playing Guitar", icon: "🎸" },
    { id: "int-8", label: "Content Creation", icon: "📷" },
    { id: "int-9", label: "Coffee", icon: "☕" },
  ],

  education: [
    {
      id: "edu-1",
      degree: "BASc. Management Engineering",
      institution: "University of Waterloo",
      location: "Waterloo, Canada",
      period: "2022 – 2027",
      description: "3x Dean's List Recipient | 3.83 GPA",
      courses: [
        { name: "Data Structures & Algorithms", grade: "A" },
        { name: "Introduction to Machine Learning", grade: "A" },
        { name: "Principles of Software Engineering", grade: "A" },
        { name: "Computational Statistics", grade: "B+" }
      ],
    },
  ],
};

export default content;
