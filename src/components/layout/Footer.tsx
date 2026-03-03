import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    label: "GitHub",
    icon: <Github size={18} />,
    href: "https://github.com/shlokDS16",
    from: "#80FF72",
    to: "#7EE8FA",
  },
  {
    label: "LinkedIn",
    icon: <Linkedin size={18} />,
    href: "https://www.linkedin.com/in/shlokgoenka/",
    from: "#56CCF2",
    to: "#2F80ED",
  },
  {
    label: "Email",
    icon: <Mail size={18} />,
    href: "mailto:shlokgoenka77@gmail.com",
    from: "#FF9966",
    to: "#FF5E62",
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-dark-800/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          © 2026 <span className="text-gray-300 font-medium">Shlok Kumar Goenka</span>
        </p>
        <p className="text-gray-600 text-xs hidden md:block">
          Built with React + Framer Motion
        </p>
        <div className="flex gap-3">
          {socialLinks.map(({ label, icon, href, from, to }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="group relative w-9 h-9 rounded-full border border-white/10 flex items-center justify-center
                text-gray-500 hover:text-white transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(45deg, ${from}, ${to})` }}
              />
              <span
                className="absolute inset-0 -z-10 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                style={{ background: `linear-gradient(45deg, ${from}, ${to})` }}
              />
              <span className="relative z-10">{icon}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
