import React from "react";
import { motion } from "framer-motion";
import type { Patent } from "../../types";

interface PatentTimelineItemProps {
  patent: Patent;
  index: number;
  isLeft?: boolean;
}

const PatentTimelineItem: React.FC<PatentTimelineItemProps> = ({
  patent,
  index,
  isLeft = false,
}) => {
  const statusColor =
    patent.status === "filed"
      ? { from: "#80FF72", to: "#7EE8FA", label: "Filed — IPR Verification Ongoing" }
      : { from: "#FF9966", to: "#FF5E62", label: "In Progress — 2026" };

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex ${isLeft ? "md:flex-row-reverse" : "md:flex-row"} flex-col items-center md:gap-8 mb-12`}
    >
      {/* Card */}
      <div className={`w-full md:w-[calc(50%-2rem)] glass-card p-6 group`}>
        {/* Status badge */}
        <span
          className="inline-block text-xs font-mono px-3 py-1 rounded-full mb-3 font-semibold uppercase tracking-wider"
          style={{
            background: `linear-gradient(45deg, ${statusColor.from}20, ${statusColor.to}20)`,
            color: statusColor.from,
            border: `1px solid ${statusColor.from}40`,
          }}
        >
          {statusColor.label}
        </span>

        <h3 className="text-base md:text-lg font-heading font-bold text-white mb-3 leading-snug">
          {patent.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{patent.summary}</p>

        <div className="flex flex-wrap gap-1.5">
          {patent.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full font-mono border"
              style={{
                borderColor: `${statusColor.from}40`,
                color: statusColor.from,
                background: `${statusColor.from}10`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline dot — hidden on mobile, shown on md+ */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-neon-cyan items-center justify-center z-10"
        style={{
          background: `linear-gradient(135deg, ${statusColor.from}, ${statusColor.to})`,
          boxShadow: `0 0 15px ${statusColor.from}60`,
        }}
      >
        <div className="w-2 h-2 rounded-full bg-dark-900" />
      </div>

      {/* Spacer */}
      <div className="hidden md:block w-[calc(50%-2rem)]" />
    </motion.div>
  );
};

export default PatentTimelineItem;
