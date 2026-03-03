import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Eye, Download, Mail, Trophy, BookOpen, Code2, Cpu } from "lucide-react";
import { ContainerScroll } from "../ui/container-scroll-animation";

const ParticleBackground = lazy(() => import("../ui/particle-background"));

// Bento Grid Dashboard for the 3D scroll card
const BentoDashboard: React.FC = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-2 h-full">
    {/* Patents — large */}
    <div className="col-span-1 row-span-1 glass-card p-4 flex flex-col items-center justify-center group hover:scale-105 transition-transform duration-300"
      style={{ background: "linear-gradient(135deg, rgba(0,255,255,0.05), rgba(59,130,246,0.05))" }}>
      <span className="text-3xl md:text-5xl font-heading font-black"
        style={{ background: "linear-gradient(135deg, #00FFFF, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        6
      </span>
      <span className="text-gray-400 text-xs mt-1 font-mono text-center">Patents</span>
      <Cpu size={16} className="text-neon-cyan mt-2 opacity-60" />
    </div>

    {/* Hackathon Wins */}
    <div className="col-span-1 glass-card p-4 flex flex-col items-center justify-center group hover:scale-105 transition-transform duration-300"
      style={{ background: "linear-gradient(135deg, rgba(169,85,255,0.05), rgba(234,81,255,0.05))" }}>
      <Trophy size={20} className="mb-1" style={{ color: "#a955ff" }} />
      <span className="text-3xl md:text-5xl font-heading font-black"
        style={{ background: "linear-gradient(135deg, #a955ff, #ea51ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        2
      </span>
      <span className="text-gray-400 text-xs mt-1 font-mono text-center">Hackathon Wins</span>
    </div>

    {/* CGPA */}
    <div className="col-span-1 glass-card p-4 flex flex-col items-center justify-center group hover:scale-105 transition-transform duration-300"
      style={{ background: "linear-gradient(135deg, rgba(128,255,114,0.05), rgba(126,232,250,0.05))" }}>
      <BookOpen size={20} className="mb-1" style={{ color: "#80FF72" }} />
      <span className="text-2xl md:text-4xl font-heading font-black"
        style={{ background: "linear-gradient(135deg, #80FF72, #7EE8FA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        8.76
      </span>
      <span className="text-gray-400 text-xs mt-1 font-mono text-center">CGPA / 10</span>
    </div>

    {/* Projects — wide */}
    <div className="col-span-2 glass-card p-4 flex items-center justify-between group hover:scale-[1.02] transition-transform duration-300"
      style={{ background: "linear-gradient(135deg, rgba(255,153,102,0.05), rgba(255,94,98,0.05))" }}>
      <div>
        <span className="text-2xl md:text-4xl font-heading font-black"
          style={{ background: "linear-gradient(135deg, #FF9966, #FF5E62)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          4+
        </span>
        <p className="text-gray-400 text-xs font-mono mt-1">Major Projects</p>
      </div>
      <Code2 size={32} className="opacity-20 text-orange-400" />
    </div>

    {/* Tech stack row */}
    <div className="col-span-1 glass-card p-4 flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(135deg, rgba(86,204,242,0.05), rgba(47,128,237,0.05))" }}>
      <span className="text-xs text-gray-500 font-mono mb-2">Stack</span>
      <div className="flex flex-col gap-1 items-center">
        {["Python", "React", "FastAPI"].map((tech) => (
          <span key={tech} className="text-xs font-mono text-neon-cyan/80 border border-neon-cyan/20 px-2 py-0.5 rounded-full">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const HeroCTAButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  from: string;
  to: string;
  to_route?: string;
  href?: string;
  download?: boolean;
}> = ({ label, icon, from, to, to_route, href, download }) => {
  const baseClass = `relative flex items-center gap-3 px-5 py-3 rounded-full font-medium text-sm
    transition-all duration-300 border border-white/10 group overflow-hidden text-white cursor-pointer`;

  const inner = (
    <>
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(45deg, ${from}, ${to})` }}
      />
      <span
        className="absolute inset-0 -z-10 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"
        style={{ background: `linear-gradient(45deg, ${from}, ${to})` }}
      />
      <span className="relative z-10" style={{ color: from }}>{icon}</span>
      <span className="relative z-10">{label}</span>
    </>
  );

  if (to_route) {
    return (
      <Link to={to_route} className={baseClass}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={href} download={download || undefined} target={download ? undefined : "_blank"} rel="noopener noreferrer" className={baseClass}>
      {inner}
    </a>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-dark-900">
      {/* Particles */}
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-5 blur-[100px]"
          style={{ background: "radial-gradient(circle, #00FFFF, transparent)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-5 blur-[100px]"
          style={{ background: "radial-gradient(circle, #FF00FF, transparent)" }}
        />
      </div>

      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center gap-4 mb-4">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card px-4 py-2 rounded-full border border-neon-cyan/20 text-xs font-mono text-neon-cyan/80 tracking-widest uppercase"
            >
              {"< Data Science • AI/ML • Patent Holder >"}
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight gradient-text"
            >
              SHLOK KUMAR GOENKA
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-mono text-neon-cyan text-lg md:text-2xl h-8"
            >
              <TypeAnimation
                sequence={[
                  "Data Scientist", 2000,
                  "AI Researcher", 2000,
                  "Patent Innovator", 2000,
                  "Full-Stack Developer", 2000,
                  "CFA Level I Candidate", 2000,
                ]}
                speed={50}
                repeat={Infinity}
              />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-3 mt-2"
            >
              <HeroCTAButton
                label="View Projects"
                icon={<Eye size={18} />}
                from="#00FFFF"
                to="#3B82F6"
                to_route="/projects"
              />
              <HeroCTAButton
                label="Download Resume"
                icon={<Download size={18} />}
                from="#a955ff"
                to="#ea51ff"
                href="/Shlok_Kumar_Goenka_Resume.pdf"
                download
              />
              <HeroCTAButton
                label="Contact Me"
                icon={<Mail size={18} />}
                from="#FF9966"
                to="#FF5E62"
                to_route="/contact"
              />
            </motion.div>
          </div>
        }
      >
        <BentoDashboard />
      </ContainerScroll>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 border-2 border-gray-700 rounded-full flex items-start justify-center pt-1">
          <motion.div
            className="w-1 h-2 bg-neon-cyan rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
