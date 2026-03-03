import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import ProjectCard from "../shared/ProjectCard";
import { projects } from "../../data/portfolio";

const FeaturedProjects: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto" ref={ref} id="featured-projects">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="text-sm font-mono text-neon-cyan tracking-widest uppercase mb-4 text-center">
          — Featured Work
        </p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white text-center mb-12">
          Highlight <span className="gradient-text">Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/projects"
            className="group relative flex items-center gap-3 px-6 py-3 rounded-full font-medium text-sm
              transition-all duration-300 border border-neon-cyan/30 text-neon-cyan hover:text-dark-900
              overflow-hidden cursor-pointer"
          >
            <span className="absolute inset-0 rounded-full bg-neon-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className="relative z-10">View All Projects</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedProjects;
