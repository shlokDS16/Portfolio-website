export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tag: string;
  tagGradient: [string, string];
  tech: string[];
  metrics: string[];
  githubUrl: string | null;
  liveUrl?: string;
  featured?: boolean;
}

export interface Patent {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  status: "filed" | "in_progress";
}

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  type: "award" | "education" | "certification" | "extracurricular";
  year?: string;
  details?: string[];
}

export interface SkillCategory {
  name: string;
  gradient: [string, string];
  skills: string[];
}

export interface Stat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}
