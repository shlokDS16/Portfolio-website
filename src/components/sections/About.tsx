import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import StatCounter from "../shared/StatCounter";
import { stats } from "../../data/portfolio";

const statGradients: [string, string][] = [
  ["#00FFFF", "#3B82F6"],
  ["#a955ff", "#ea51ff"],
  ["#80FF72", "#7EE8FA"],
  ["#FF9966", "#FF5E62"],
];

const About: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="py-20 md:py-32 px-4 max-w-7xl mx-auto" id="about">
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        {/* Left — intro text (3/5) */}
        <motion.div
          className="md:col-span-3"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <p className="text-sm font-mono text-neon-cyan tracking-widest uppercase mb-4">
            — About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6 leading-tight">
            Building the future with{" "}
            <span className="gradient-text">AI & Innovation</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-4">
            I'm Shlok Kumar Goenka — a 3rd-year B.Tech Data Science & Engineering student at VIT Vellore,
            originally from Nepal, passionate about building intelligent systems that solve real-world problems.
          </p>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-4">
            My work spans AI/ML, computer vision, privacy-preserving computing, and quantum-inspired architectures.
            I've filed 2 patents (cleared VIT Stage 4) and have 4 more in progress — all as an undergraduate.
          </p>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Beyond tech, I'm also a CFA Level I Candidate (August 2026), bridging data science with quantitative
            finance. I believe in building things that are bold, impactful, and responsible.
          </p>
        </motion.div>

        {/* Right — stat counters (2/5) */}
        <motion.div
          className="md:col-span-2 grid grid-cols-2 gap-4"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {stats.map((stat, i) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              gradientFrom={statGradients[i][0]}
              gradientTo={statGradients[i][1]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
