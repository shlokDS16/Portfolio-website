import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import SkillTag from "../shared/SkillTag";
import { skillCategories } from "../../data/portfolio";

const SkillsPreview: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const displayCategories = skillCategories.slice(0, 3);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto" ref={ref} id="skills">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="text-sm font-mono text-neon-cyan tracking-widest uppercase mb-4 text-center">
          — Skills
        </p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white text-center mb-12">
          Tech <span className="gradient-text">Arsenal</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {displayCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card p-6 group hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${cat.gradient[0]}, ${cat.gradient[1]})` }}
                />
                <h3
                  className="text-sm font-heading font-semibold uppercase tracking-wider"
                  style={{ color: cat.gradient[0] }}
                >
                  {cat.name}
                </h3>
              </div>
              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.slice(0, 6).map((skill) => (
                  <SkillTag
                    key={skill}
                    name={skill}
                    gradientFrom={cat.gradient[0]}
                    gradientTo={cat.gradient[1]}
                    size="sm"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* See All button */}
        <div className="flex justify-center">
          <Link
            to="/achievements"
            className="group relative flex items-center gap-3 px-6 py-3 rounded-full font-medium text-sm
              transition-all duration-300 border border-neon-cyan/30 text-neon-cyan hover:text-dark-900
              overflow-hidden cursor-pointer"
          >
            <span className="absolute inset-0 rounded-full bg-neon-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className="relative z-10">See All Skills & Certifications</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsPreview;
