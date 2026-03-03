import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/shared/ProjectCard";
import { projects } from "../data/portfolio";

const Projects: React.FC = () => {
  return (
    <main className="pt-28 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-sm font-mono text-neon-cyan tracking-widest uppercase mb-3">
          — Portfolio
        </p>
        <h1 className="text-4xl md:text-6xl font-heading font-black gradient-text mb-4">
          Projects
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg">
          From hackathon-winning forensics platforms to privacy-preserving healthcare systems — each project
          pushes the boundaries of what's possible.
        </p>
      </motion.div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </main>
  );
};

export default Projects;
