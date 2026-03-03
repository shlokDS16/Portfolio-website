import React from "react";

interface SkillTagProps {
  name: string;
  gradientFrom: string;
  gradientTo: string;
  size?: "sm" | "md";
}

const SkillTag: React.FC<SkillTagProps> = ({
  name,
  gradientFrom,
  gradientTo,
  size = "md",
}) => {
  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <span
      className={`relative inline-flex items-center rounded-full border border-white/10 font-mono
        font-medium cursor-default transition-all duration-300 group ${sizeClasses}`}
      style={{ color: gradientFrom }}
    >
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(45deg, ${gradientFrom}20, ${gradientTo}20)` }}
      />
      <span
        className="absolute inset-0 rounded-full -z-10 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        style={{
          background: `linear-gradient(45deg, ${gradientFrom}, ${gradientTo})`,
          filter: "blur(8px)",
        }}
      />
      <span className="relative z-10 group-hover:text-white transition-colors duration-300">{name}</span>
    </span>
  );
};

export default SkillTag;
