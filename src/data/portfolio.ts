import type { Project, Patent, Achievement, SkillCategory, Stat } from "../types";

export const projects: Project[] = [
  {
    id: "argus",
    name: "ARGUS",
    tagline: "AI-Powered Digital Forensics Platform",
    description:
      "Multi-modal forensics pipeline for automated cyber harassment and identity theft investigation with verifiable forensic chain of custody.",
    tag: "Hackathon Winner",
    tagGradient: ["#FF9966", "#FF5E62"],
    tech: ["Next.js", "FastAPI", "spaCy", "ResNet-18", "NetworkX", "Gemini 2.0", "SHA-256"],
    metrics: ["92.4% authorship attribution", "94.8% deepfake detection", "<1.5s processing"],
    githubUrl: "https://github.com/shlokDS16/ARGUS",
    featured: true,
  },
  {
    id: "citadel",
    name: "C.I.T.A.D.E.L.",
    tagline: "Civic Intelligence & Transparency Platform",
    description:
      "Dual-portal civic platform integrating RAG-powered policy navigation, real-time traffic violation detection, and administrative automation.",
    tag: "Hackathon Project",
    tagGradient: ["#a955ff", "#ea51ff"],
    tech: ["React", "FastAPI", "YOLOv8", "DeepSORT", "EasyOCR", "Gemini Pro 1.5", "Llama 3.2", "Supabase"],
    metrics: ["80%+ RAG confidence", "94.7% detection accuracy", "<1.5s OCR"],
    githubUrl: "https://github.com/shlokDS16/CITADEL",
    featured: true,
  },
  {
    id: "privacyguard",
    name: "PrivacyGuard Analytics",
    tagline: "Privacy-Preserving Healthcare",
    description:
      "Full-stack platform enforcing k-anonymity and l-diversity on healthcare datasets with cryptographic audit trails.",
    tag: "Academic Project",
    tagGradient: ["#00FFFF", "#3B82F6"],
    tech: ["Next.js 14", "FastAPI", "PostgreSQL", "SQLAlchemy", "Docker", "Ed25519"],
    metrics: ["Violations 45→5", "64.2% data utility", "sub-60ms P95 latency"],
    githubUrl: "https://github.com/shlokDS16/Privacy-guard-",
  },
  {
    id: "carbon-scheduler",
    name: "Carbon-Aware Cloud Scheduler",
    tagline: "Sustainable Computing",
    description:
      "Patent-pending ACEI algorithm dynamically routing workloads across 10 global datacenters using real-time carbon data from 200+ countries.",
    tag: "Research / Patent",
    tagGradient: ["#80FF72", "#7EE8FA"],
    tech: ["Java 17", "CloudSimPlus", "Apache Commons CSV", "JFreeChart"],
    metrics: ["15-25% carbon reduction", "8-12% cost savings", "5-10% latency optimization"],
    githubUrl: null,
  },
];

export const patents: Patent[] = [
  {
    id: "patent-1",
    title:
      "A System and Method for Enforcing Privacy-Safe Execution of Database Queries with Cryptographically Verifiable Audit Control",
    summary:
      "Framework enforcing k-anonymity/l-diversity on SQL queries with Ed25519-signed cryptographic audit trails for healthcare environments.",
    tags: ["Healthcare", "Cryptography", "Privacy", "SQL"],
    status: "filed",
  },
  {
    id: "patent-2",
    title:
      "Carbon-Aware Cloud Scheduling System with Adaptive Carbon Efficiency Index (ACEI)",
    summary:
      "Method for dynamically routing cloud workloads across global datacenters using real-time carbon intensity data with automatic failover and SLA compliance.",
    tags: ["Cloud Computing", "Sustainability", "Optimization"],
    status: "filed",
  },
  {
    id: "patent-3",
    title:
      "Hardware-Interfaced Spatio-Temporal Control Gating Apparatus for Agricultural Machinery",
    summary:
      "Cyber-physical control system integrating temporal gating with adaptive actuator enforcement for precision agricultural automation.",
    tags: ["Agriculture", "IoT", "Cyber-Physical Systems"],
    status: "in_progress",
  },
  {
    id: "patent-4",
    title: "Quantum-Inspired Adaptive Decision Routing (QIADR)",
    summary:
      "Deep learning architecture leveraging quantum-inspired superposition-based routing for dynamic neural network path selection.",
    tags: ["Quantum Computing", "Deep Learning", "Neural Architecture"],
    status: "in_progress",
  },
  {
    id: "patent-5",
    title:
      "Resource-Adaptive Entropy-Gated Tiered Diagnostic Prediction Apparatus",
    summary:
      "Multi-tiered diagnostic system with entropy-based gating for intelligent model selection and explainable AI in clinical workflows.",
    tags: ["Healthcare", "Clinical AI", "Explainable AI"],
    status: "in_progress",
  },
  {
    id: "patent-6",
    title: "AI-Driven Forensic Intelligence",
    summary:
      "Multi-modal analysis pipeline for automated cyber harassment investigation and digital evidence chain-of-custody verification.",
    tags: ["Digital Forensics", "NLP", "Computer Vision"],
    status: "in_progress",
  },
];

export const achievements: Achievement[] = [
  {
    id: "hack-1",
    title: "Hackathon Winner",
    subtitle: "36-Hour Cyber Forensics Hack-a-Thon",
    type: "award",
    year: "2025",
    details: ["Project ARGUS", "1st Place"],
  },
  {
    id: "hack-2",
    title: "Hackathon Winner",
    subtitle: "AI Hackathon 2026: Intelligent Innovation Challenge",
    type: "award",
    year: "2026",
    details: ["Project C.I.T.A.D.E.L.", "1st Place"],
  },
  {
    id: "acad-1",
    title: "Academic Excellence",
    subtitle: "CGPA 8.76/10.0 — VIT Vellore",
    type: "award",
    year: "2023–2027",
    details: ["Top percentile", "Data Science & Engineering"],
  },
  {
    id: "research-1",
    title: "Early Research Innovation",
    subtitle: "6 Patents — 2 Filed, 4 In Progress",
    type: "award",
    year: "2024–2026",
    details: ["3rd-year undergraduate", "Multiple domains"],
  },
  {
    id: "edu-vit",
    title: "VIT Vellore",
    subtitle: "B.Tech Data Science & Engineering",
    type: "education",
    year: "2023–2027",
    details: ["CGPA: 8.76", "CFA Level I Candidate (August 2026)"],
  },
  {
    id: "edu-xii",
    title: "Class XII CBSE",
    subtitle: "Senior Secondary",
    type: "education",
    year: "2023",
    details: ["90.02%"],
  },
  {
    id: "edu-x",
    title: "Class X CBSE",
    subtitle: "Secondary",
    type: "education",
    year: "2021",
    details: ["93.00%"],
  },
  {
    id: "cert-1",
    title: "100 Days of Code: Complete Python Pro Bootcamp",
    subtitle: "Udemy",
    type: "certification",
  },
  {
    id: "cert-2",
    title: "Complete Full-Stack Web Development Bootcamp",
    subtitle: "Udemy",
    type: "certification",
  },
  {
    id: "cert-3",
    title: "CFA Level I Candidate",
    subtitle: "CFA Institute — August 2026",
    type: "certification",
  },
  {
    id: "cert-4",
    title: "Quantum Computing VAC",
    subtitle: "VIT Vellore (Ongoing)",
    type: "certification",
  },
  {
    id: "extra-1",
    title: "IoT in Everyday Life Club — Board Member",
    subtitle: "VIT Vellore",
    type: "extracurricular",
    details: [
      'Co-organized "Smart Campus Challenge" IoT hackathon (80+ participants)',
      'Led "IoT Meets AI" workshop series',
    ],
  },
  {
    id: "extra-2",
    title: "Student Mentor — Freshman Orientation",
    subtitle: "VIT Vellore",
    type: "extracurricular",
    details: ["Mentored 30+ incoming students"],
  },
  {
    id: "extra-3",
    title: "Tech Literacy Drive",
    subtitle: "Vellore Community",
    type: "extracurricular",
    details: ["Tech education for underprivileged students in Vellore"],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "AI / ML",
    gradient: ["#00FFFF", "#3B82F6"],
    skills: ["Python", "PyTorch", "TensorFlow", "scikit-learn", "spaCy", "HuggingFace", "LangChain", "RAG"],
  },
  {
    name: "Computer Vision",
    gradient: ["#a955ff", "#ea51ff"],
    skills: ["OpenCV", "YOLOv8", "ResNet-18", "DeepSORT", "EasyOCR"],
  },
  {
    name: "Full-Stack Dev",
    gradient: ["#80FF72", "#7EE8FA"],
    skills: ["React", "Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Docker", "Supabase"],
  },
  {
    name: "Cloud & Infra",
    gradient: ["#FF9966", "#FF5E62"],
    skills: ["AWS", "GCP", "CloudSimPlus", "Java 17", "SQLAlchemy"],
  },
  {
    name: "Automation & AI Agents",
    gradient: ["#ffa9c6", "#f434e2"],
    skills: ["n8n", "Make (Integromat)", "Zapier", "AI Agents", "Workflow Automation", "API Integration", "Webhooks"],
  },
  {
    name: "Finance & Quant",
    gradient: ["#56CCF2", "#2F80ED"],
    skills: ["CFA Level I", "Financial Modeling", "Quantitative Analysis", "Data Visualization"],
  },
];

export const stats: Stat[] = [
  { value: "6", label: "Patents Filed & In Progress" },
  { value: "2", label: "Hackathons Won" },
  { value: "8.76", label: "CGPA" },
  { value: "4", label: "Major Projects", suffix: "+" },
];
