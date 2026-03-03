import React from "react";

export interface GradientMenuItem {
  title: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  onClick?: () => void;
  href?: string;
}

interface GradientMenuProps {
  items: GradientMenuItem[];
  itemSize?: number;
  expandedWidth?: number;
  gap?: number;
  className?: string;
}

export const GradientPill: React.FC<{
  title: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  onClick?: () => void;
  href?: string;
  itemSize?: number;
  expandedWidth?: number;
  showTextAlways?: boolean;
  className?: string;
}> = ({
  title,
  icon,
  gradientFrom,
  gradientTo,
  onClick,
  href,
  itemSize = 60,
  expandedWidth = 180,
  showTextAlways = false,
  className = "",
}) => {
  const style = {
    "--gradient-from": gradientFrom,
    "--gradient-to": gradientTo,
    width: `${itemSize}px`,
    height: `${itemSize}px`,
  } as React.CSSProperties;

  const content = (
    <li
      style={style}
      className={`relative bg-dark-700 shadow-lg rounded-full flex items-center justify-center
        transition-all duration-500 cursor-pointer group border border-white/10
        hover:border-transparent ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      aria-label={title}
      // Override width on hover via inline style trick with a wrapper
    >
      <span
        className="absolute inset-0 rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(45deg, ${gradientFrom}, ${gradientTo})`,
        }}
      />
      <span
        className="absolute top-[10px] inset-x-0 h-full rounded-full -z-10 opacity-0 transition-all duration-500 group-hover:opacity-50"
        style={{
          background: `linear-gradient(45deg, ${gradientFrom}, ${gradientTo})`,
          filter: "blur(15px)",
        }}
      />
      {!showTextAlways && (
        <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0 flex items-center justify-center">
          <span className="text-2xl text-gray-400">{icon}</span>
        </span>
      )}
      <span
        className={`absolute text-white uppercase tracking-wide text-sm font-medium transition-all duration-500
          ${showTextAlways ? "scale-100 static relative z-10" : "scale-0 group-hover:scale-100 delay-150"}`}
      >
        {title}
      </span>
    </li>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="block"
        style={{ width: `${itemSize}px` }}
      >
        <ul className="p-0 m-0 list-none" style={{ width: `${expandedWidth}px` }}>
          {content}
        </ul>
      </a>
    );
  }

  return (
    <ul className="p-0 m-0 list-none" style={{ width: `${expandedWidth}px` }}>
      {content}
    </ul>
  );
};

export default function GradientMenu({ items, gap = 24, className = "" }: GradientMenuProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <ul
        className="flex list-none p-0 m-0"
        style={{ gap: `${gap}px` }}
      >
        {items.map(({ title, icon, gradientFrom, gradientTo, onClick, href }, idx) => (
          <li
            key={idx}
            style={
              {
                "--gradient-from": gradientFrom,
                "--gradient-to": gradientTo,
              } as React.CSSProperties
            }
            className="relative w-[60px] h-[60px] bg-dark-700 shadow-lg rounded-full flex items-center
              justify-center transition-all duration-500 hover:w-[180px] hover:shadow-none group cursor-pointer
              border border-white/10 hover:border-transparent"
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onClick?.()}
            aria-label={title}
          >
            {href ? (
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="absolute inset-0 z-20 rounded-full"
                aria-label={title}
              />
            ) : null}
            <span
              className="absolute inset-0 rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100"
              style={{
                background: `linear-gradient(45deg, ${gradientFrom}, ${gradientTo})`,
              }}
            />
            <span
              className="absolute top-[10px] inset-x-0 h-full rounded-full -z-10 opacity-0 transition-all duration-500 group-hover:opacity-50"
              style={{
                background: `linear-gradient(45deg, ${gradientFrom}, ${gradientTo})`,
                filter: "blur(15px)",
              }}
            />
            <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0 flex items-center justify-center">
              <span className="text-2xl text-gray-400">{icon}</span>
            </span>
            <span className="absolute text-white uppercase tracking-wide text-sm font-medium transition-all duration-500 scale-0 group-hover:scale-100 delay-150 z-10">
              {title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
