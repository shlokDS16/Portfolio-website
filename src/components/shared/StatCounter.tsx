import React from "react";
import { useCountUp } from "../../hooks/useCountUp";

interface StatCounterProps {
  value: string;
  label: string;
  suffix?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const StatCounter: React.FC<StatCounterProps> = ({
  value,
  label,
  suffix = "",
  gradientFrom = "#00FFFF",
  gradientTo = "#3B82F6",
}) => {
  const isDecimal = value.includes(".");
  const numericValue = parseFloat(value);
  const decimals = isDecimal ? value.split(".")[1]?.length || 0 : 0;
  const { count, ref } = useCountUp(numericValue, 2000, decimals);

  return (
    <div
      ref={ref as unknown as React.RefObject<HTMLDivElement>}
      className="glass-card p-6 text-center group cursor-default transition-all duration-300 hover:scale-105"
    >
      <div
        className="text-4xl md:text-5xl font-heading font-black mb-2"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
        {suffix}
      </div>
      <p className="text-gray-400 text-sm font-body">{label}</p>
    </div>
  );
};

export default StatCounter;
