import React, { useCallback, useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

interface ParticleBackgroundProps {
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ className = "" }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options = {
    background: { color: "transparent" },
    fpsLimit: 60,
    particles: {
      number: {
        value: isMobile ? 25 : 60,
        density: { enable: true, area: 800 },
      },
      color: { value: ["#00FFFF", "#FF00FF", "#3B82F6"] },
      links: {
        enable: !isMobile,
        color: "#00FFFF",
        opacity: 0.12,
        distance: 150,
      },
      move: {
        enable: true,
        speed: 0.6,
        direction: "none" as const,
        outModes: { default: "bounce" as const },
      },
      size: { value: { min: 1, max: 2.5 } },
      opacity: { value: { min: 0.1, max: 0.4 } },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      // @ts-ignore - type mismatch in library versions
      init={particlesInit}
      options={options}
      className={`absolute inset-0 ${className}`}
    />
  );
};

export default ParticleBackground;
