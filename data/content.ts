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
  tagline: "Building clean, thoughtful software — one commit at a time.",
  bio: "I'm a software engineer passionate about crafting elegant solutions to complex problems. I enjoy working across the full stack, exploring machine learning, and building tools that genuinely help people.",
  email: "ronnyouacapps@gmail.com",
  github: "https://github.com/ItsRonald99",
  linkedin: "https://linkedin.com",

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
    {
      id: "project-3",
      title: "DevLink",
      description: "A lightweight bookmarking CLI tool for developers — tag, search, and share your most-used resources from the terminal.",
      longDescription: "Written in Go, DevLink stores bookmarks in a local SQLite database and provides fuzzy search, tag filtering, and clipboard copy. Supports exporting to Markdown for sharing. Installable via Homebrew on macOS.",
      tags: ["Go", "SQLite", "CLI", "Homebrew"],
      githubUrl: "https://github.com/ItsRonald99",
      imageUrl: "/images/project-placeholder.svg",
    },
    {
      id: "project-4",
      title: "Study Companion",
      description: "A Pomodoro-based study tracker with spaced repetition flashcards and session analytics.",
      longDescription: "Combines the Pomodoro technique with spaced repetition (SM-2 algorithm) to help students study more effectively. Features a clean dashboard with heatmap activity, session history, and exportable notes. Built with SvelteKit and local storage for zero-backend simplicity.",
      tags: ["SvelteKit", "TypeScript", "Algorithms", "CSS"],
      githubUrl: "https://github.com/ItsRonald99",
      imageUrl: "/images/project-placeholder.svg",
    },
    {
      id: "project-5",
      title: "ML Digit Recognizer",
      description: "A handwritten digit recognition model trained on MNIST, served via a FastAPI endpoint with a live canvas demo.",
      longDescription: "Trained a convolutional neural network on MNIST achieving 99.1% test accuracy. Quantized the model for fast inference and wrapped it in a FastAPI service. The frontend provides a draw-on-canvas interface with real-time predictions. Deployed on Railway.",
      tags: ["Python", "PyTorch", "FastAPI", "CNN"],
      githubUrl: "https://github.com/ItsRonald99",
      youtubeId: "dQw4w9WgXcQ",
    },
    {
      id: "project-6",
      title: "Open Source Contributions",
      description: "Various contributions to open-source projects — bug fixes, documentation improvements, and feature additions.",
      longDescription: "Active contributor to several open-source repositories. Key contributions include improving TypeScript types in a popular UI library, fixing a parser edge case in a CLI tool, and writing comprehensive documentation for an API client package.",
      tags: ["Open Source", "TypeScript", "Documentation", "Community"],
      githubUrl: "https://github.com/ItsRonald99",
    },
  ],

  interests: [
    { id: "int-1", label: "Machine Learning", icon: "🧠" },
    { id: "int-2", label: "Pixel Art", icon: "🎨" },
    { id: "int-3", label: "Game Dev", icon: "🎮" },
    { id: "int-4", label: "Open Source", icon: "🌐" },
    { id: "int-5", label: "Hiking", icon: "🏔️" },
    { id: "int-6", label: "Music Production", icon: "🎵" },
    { id: "int-7", label: "Language Learning", icon: "📖" },
    { id: "int-8", label: "Photography", icon: "📷" },
    { id: "int-9", label: "Coffee", icon: "☕" },
    { id: "int-10", label: "Reading", icon: "📚" },
  ],

  education: [
    {
      id: "edu-1",
      degree: "B.S. Computer Science",
      institution: "University of Technology",
      location: "California, USA",
      period: "2021 – 2025",
      description: "Focused on software engineering, algorithms, and machine learning. Graduated with honors.",
      courses: [
        { name: "Data Structures & Algorithms", grade: "A" },
        { name: "Operating Systems", grade: "A-" },
        { name: "Machine Learning", grade: "A" },
        { name: "Database Systems", grade: "A" },
        { name: "Computer Networks", grade: "B+" },
        { name: "Software Engineering", grade: "A" },
      ],
    },
  ],
};

export default content;
