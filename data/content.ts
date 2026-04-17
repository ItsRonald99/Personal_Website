export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  youtubeId?: string;
  imageUrl?: string;
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
  bio: "I'm a software engineer passionate about taking concepts and turning them into real products. I enjoy exploring machine learning and building tools that I find useful for my personal pain points.",
  email: "r3ma@uwaterloo.ca",
  github: "https://github.com/ItsRonald99",
  linkedin: "https://linkedin.com/ronald-ma99",

  projects: [
    {
      id: "project-1",
      title: "AI Task Manager",
      description: "A smart task management app powered by an LLM that auto-prioritizes your to-dos based on context and deadlines.",
      longDescription: "Built with Next.js and the Claude API, this app takes your natural-language task descriptions and automatically categorizes, prioritizes, and schedules them. It features drag-and-drop reordering, deadline tracking, and a clean, minimal interface inspired by calm productivity tools.",
      tags: ["Next.js", "TypeScript", "Claude API", "Tailwind CSS"],
      githubUrl: "https://github.com/ItsRonald99",
      imageUrl: "/images/project-placeholder.svg",
    },
    {
      id: "project-2",
      title: "Pixel Weather",
      description: "A retro pixel-art weather app that visualizes forecasts with charming 8-bit animations for each weather condition.",
      longDescription: "Consumed the OpenWeatherMap API and mapped each condition code to a hand-crafted pixel-art scene. Built in React with canvas-based animations. The interface changes color palette based on time of day, creating a living weather dashboard.",
      tags: ["React", "TypeScript", "Canvas API", "OpenWeatherMap"],
      githubUrl: "https://github.com/ItsRonald99",
      youtubeId: "dQw4w9WgXcQ",
    },
  ],

  interests: [
    { id: "int-1", label: "Machine Learning", icon: "🧠" },
    { id: "int-2", label: "Pixel Art", icon: "🎨" },
    { id: "int-3", label: "Gaming", icon: "🎮" },
    { id: "int-4", label: "Open Source", icon: "🌐" },
    { id: "int-5", label: "Hiking", icon: "🏔️" },
    { id: "int-6", label: "Music Production", icon: "🎵" },
    { id: "int-7", label: "Language Learning", icon: "📖" },
    { id: "int-8", label: "Video Editing", icon: "📷" },
    { id: "int-9", label: "Coffee", icon: "☕" },
    { id: "int-10", label: "Reading", icon: "📚" },
  ],

  education: [
    {
      id: "edu-1",
      degree: "BASc. Management Engineering",
      institution: "University of Waterloo",
      location: "Waterloo, Canada",
      period: "2022 – 2027",
      description: "With a focus on software engineering, statistics, and machine learning.",
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
