import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover3D?: boolean;
  gradientBorder?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  hover3D = false,
  gradientBorder = false,
  gradientFrom = "#00FFFF",
  gradientTo = "#FF00FF",
  onClick,
}) => {
  const hoverProps = hover3D
    ? {
        whileHover: { y: -8, scale: 1.02 },
        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
      }
    : {};

  return (
    <motion.div
      {...hoverProps}
      onClick={onClick}
      className={`glass-card relative overflow-hidden ${gradientBorder ? "gradient-border-animated" : ""} ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {gradientBorder && (
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom}15, transparent, ${gradientTo}15)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
};

export default GlassCard;
