export type ProjectImage = {
  id: string;
  project_id: string;
  url: string;
  alt: string | null;
  sort_order: number;
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  description: string | null;
  category: string | null;
  tech: string[];
  metrics: string[];
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
  hackathon_win: boolean;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  project_images?: ProjectImage[];
};

export type Patent = {
  id: string;
  title: string;
  application_number: string | null;
  filed_date: string | null;
  abstract: string | null;
  tags: string[];
  status: string;
  sort_order: number;
  published: boolean;
  created_at: string;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string | null;
  issued_year: string | null;
  valid_until: string | null;
  note: string | null;
  credential_id: string | null;
  image_url: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
};

export type Achievement = {
  id: string;
  title: string;
  subtitle: string | null;
  type: string | null;
  period: string | null;
  details: string[];
  sort_order: number;
  published: boolean;
  created_at: string;
};

export type SkillGroup = {
  id: string;
  name: string;
  skills: string[];
  sort_order: number;
};

export type ContactMessage = {
  id: string;
  name: string | null;
  email: string | null;
  subject: string | null;
  message: string | null;
  is_read: boolean;
  created_at: string;
};

export type SiteSettings = {
  hero?: {
    eyebrow?: string;
    roles?: string[];
    name?: string[];
    lede?: string;
    location?: string;
    school?: string;
    availability?: string;
  };
  stats?: { n: string; unit?: string; k: string }[];
  socials?: {
    github?: string;
    linkedin?: string;
    email?: string;
    phone?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
    location?: string;
    formspree?: string;
  };
  resume?: { path?: string; url?: string };
  ticker?: string[];
};
