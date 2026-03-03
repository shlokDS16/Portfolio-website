import React from "react";
import { motion } from "framer-motion";
import { Trophy, GraduationCap, Award, Users } from "lucide-react";
import { achievements, skillCategories } from "../data/portfolio";
import SkillTag from "../components/shared/SkillTag";
import GlassCard from "../components/ui/glass-card";

const awardCards = achievements.filter((a) => a.type === "award");
const education = achievements.filter((a) => a.type === "education");
const certifications = achievements.filter((a) => a.type === "certification");
const extracurricular = achievements.filter((a) => a.type === "extracurricular");

const awardIcons = [
  <Trophy size={24} className="text-amber-400" />,
  <Trophy size={24} className="text-amber-400" />,
  <GraduationCap size={24} className="text-neon-cyan" />,
  <Award size={24} className="text-neon-purple" />,
];

const Achievements: React.FC = () => {
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
          — Milestones
        </p>
        <h1 className="text-4xl md:text-6xl font-heading font-black gradient-text mb-4">
          Achievements
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg">
          Hackathon wins, academic excellence, patents, certifications, and community leadership.
        </p>
      </motion.div>

      {/* A. Awards */}
      <section className="mb-20">
        <SectionTitle>Awards & Recognition</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {awardCards.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard hover3D className="p-6 h-full">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{awardIcons[i]}</div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-white mb-1">{ach.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{ach.subtitle}</p>
                    {ach.details && (
                      <div className="flex flex-wrap gap-2">
                        {ach.details.map((d) => (
                          <span key={d} className="text-xs font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-gray-300">
                            {d}
                          </span>
                        ))}
                      </div>
                    )}
                    {ach.year && (
                      <p className="text-xs text-gray-600 font-mono mt-2">{ach.year}</p>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* B. Education */}
      <section className="mb-20">
        <SectionTitle>Education</SectionTitle>
        <div className="relative">
          <div
            className="absolute left-4 top-0 bottom-0 w-0.5"
            style={{ background: "linear-gradient(180deg, #00FFFF, #3B82F6)", opacity: 0.3 }}
          />
          <div className="space-y-6 pl-12">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-12 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-neon-cyan"
                  style={{ background: "linear-gradient(135deg, #00FFFF, #3B82F6)", boxShadow: "0 0 10px #00FFFF40" }}
                />
                <GlassCard className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-heading font-bold text-white">{edu.title}</h3>
                      <p className="text-gray-400 text-sm">{edu.subtitle}</p>
                      {edu.details && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {edu.details.map((d) => (
                            <span key={d} className="text-xs font-mono text-neon-cyan/80 border border-neon-cyan/20 px-2 py-0.5 rounded-full">
                              {d}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {edu.year && (
                      <span className="text-xs font-mono text-gray-500 whitespace-nowrap">{edu.year}</span>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* C. Skills */}
      <section className="mb-20">
        <SectionTitle>Skills & Tech Stack</SectionTitle>
        <div className="space-y-5">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <GlassCard className="p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <h3
                    className="text-sm font-heading font-semibold uppercase tracking-wider w-32 shrink-0"
                    style={{ color: cat.gradient[0] }}
                  >
                    {cat.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <SkillTag
                        key={skill}
                        name={skill}
                        gradientFrom={cat.gradient[0]}
                        gradientTo={cat.gradient[1]}
                        size="sm"
                      />
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* D. Certifications */}
      <section className="mb-20">
        <SectionTitle>Certifications</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <GlassCard className="p-4 flex items-center gap-4">
                <div
                  className="w-2 h-8 rounded-full shrink-0"
                  style={{ background: "linear-gradient(180deg, #00FFFF, #3B82F6)" }}
                />
                <div>
                  <p className="text-white font-medium text-sm">{cert.title}</p>
                  <p className="text-gray-500 text-xs font-mono mt-0.5">{cert.subtitle}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* E. Extracurriculars */}
      <section>
        <SectionTitle>Extracurriculars</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {extracurricular.map((extra, i) => (
            <motion.div
              key={extra.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard hover3D className="p-5 h-full">
                <div className="flex items-start gap-3">
                  <Users size={18} className="text-neon-cyan mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-sm font-heading font-bold text-white mb-1">{extra.title}</h3>
                    <p className="text-gray-500 text-xs mb-3">{extra.subtitle}</p>
                    {extra.details && (
                      <ul className="space-y-1">
                        {extra.details.map((d) => (
                          <li key={d} className="text-xs text-gray-400 flex items-start gap-1.5">
                            <span className="text-neon-cyan mt-0.5">›</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.h2
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="text-2xl font-heading font-bold text-white mb-6 flex items-center gap-3"
  >
    <span
      className="w-2 h-6 rounded-full"
      style={{ background: "linear-gradient(180deg, #00FFFF, #FF00FF)" }}
    />
    {children}
  </motion.h2>
);

export default Achievements;
