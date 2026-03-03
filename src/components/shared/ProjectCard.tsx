import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "../../types";
import SkillTag from "./SkillTag";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.01 }}
      style={{ perspective: "1000px" }}
      className="glass-card gradient-border-animated group relative overflow-hidden flex flex-col h-full"
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${project.tagGradient[0]}, ${project.tagGradient[1]})`,
        }}
      />

      <div className="p-6 flex flex-col h-full">
        {/* Category tag */}
        <span
          className="inline-block self-start text-xs font-mono px-3 py-1 rounded-full mb-4 font-semibold uppercase tracking-widest"
          style={{
            background: `linear-gradient(45deg, ${project.tagGradient[0]}25, ${project.tagGradient[1]}25)`,
            color: project.tagGradient[0],
            border: `1px solid ${project.tagGradient[0]}40`,
          }}
        >
          {project.tag}
        </span>

        {/* Name */}
        <h3 className="text-xl font-heading font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors duration-300">
          {project.name}
        </h3>
        <p
          className="text-sm font-medium mb-3"
          style={{ color: project.tagGradient[0] }}
        >
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.metrics.map((m, i) => (
            <span
              key={i}
              className="text-xs bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-gray-300 font-mono"
            >
              {m}
            </span>
          ))}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <SkillTag
              key={t}
              name={t}
              gradientFrom={project.tagGradient[0]}
              gradientTo={project.tagGradient[1]}
              size="sm"
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-auto">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                border border-white/15 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5"
            >
              <Github size={15} />
              GitHub
            </a>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
              border border-white/10 text-gray-500 bg-white/3 cursor-default">
              Private Research
            </span>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: `linear-gradient(45deg, ${project.tagGradient[0]}, ${project.tagGradient[1]})`,
                color: "white",
              }}
            >
              <ExternalLink size={15} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
