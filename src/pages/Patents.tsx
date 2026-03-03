import React from "react";
import { motion } from "framer-motion";
import { patents } from "../data/portfolio";
import PatentTimelineItem from "../components/shared/PatentTimelineItem";

const Patents: React.FC = () => {
  const filed = patents.filter((p) => p.status === "filed");
  const inProgress = patents.filter((p) => p.status === "in_progress");

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
          — Intellectual Property
        </p>
        <h1 className="text-4xl md:text-6xl font-heading font-black gradient-text mb-4">
          Patents & IP
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg">
          6 patents spanning healthcare privacy, sustainable cloud computing, agricultural automation,
          quantum-inspired AI, and digital forensics.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <span className="glass-card px-4 py-2 text-sm font-mono text-emerald-400 border border-emerald-400/20">
            2 Filed — IPR Verification
          </span>
          <span className="glass-card px-4 py-2 text-sm font-mono text-amber-400 border border-amber-400/20">
            4 In Progress — 2026
          </span>
        </div>
      </motion.div>

      {/* Section A: Filed */}
      <div className="mb-16">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-heading font-bold text-white mb-8 flex items-center gap-3"
        >
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: "linear-gradient(135deg, #80FF72, #7EE8FA)", boxShadow: "0 0 10px #80FF7260" }}
          />
          Filed Patents
          <span className="text-sm font-mono text-gray-500 ml-2">(Cleared VIT Stage 4)</span>
        </motion.h2>

        {/* Timeline line */}
        <div className="relative">
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 hidden md:block"
            style={{
              background: "linear-gradient(180deg, #00FFFF, #FF00FF, #3B82F6)",
              opacity: 0.3,
            }}
          />
          {filed.map((patent, i) => (
            <PatentTimelineItem
              key={patent.id}
              patent={patent}
              index={i}
              isLeft={i % 2 === 0}
            />
          ))}
        </div>
      </div>

      {/* Section B: In Progress */}
      <div>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-heading font-bold text-white mb-8 flex items-center gap-3"
        >
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: "linear-gradient(135deg, #FF9966, #FF5E62)", boxShadow: "0 0 10px #FF996660" }}
          />
          Upcoming Patents
          <span className="text-sm font-mono text-gray-500 ml-2">(In Progress, 2026)</span>
        </motion.h2>

        <div className="relative">
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 hidden md:block"
            style={{
              background: "linear-gradient(180deg, #FF9966, #FF5E62)",
              opacity: 0.3,
            }}
          />
          {inProgress.map((patent, i) => (
            <PatentTimelineItem
              key={patent.id}
              patent={patent}
              index={i}
              isLeft={i % 2 === 0}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Patents;
