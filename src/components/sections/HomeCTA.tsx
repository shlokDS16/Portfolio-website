import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send } from "lucide-react";

const HomeCTA: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section className="py-20 px-4 relative overflow-hidden" ref={ref}>
      {/* Aurora */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,255,255,0.04) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-[0.03] blur-[80px]"
          style={{ background: "#FF00FF" }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-[0.03] blur-[80px]"
          style={{ background: "#00FFFF" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <div className="glass-card p-10 md:p-16 border border-white/5">
          <p className="text-sm font-mono text-neon-cyan tracking-widest uppercase mb-4">
            — Let's Collaborate
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            Let's build something{" "}
            <span className="gradient-text">extraordinary</span> together
          </h2>
          <p className="text-gray-400 mb-8 text-base md:text-lg">
            Whether it's AI research, a new product, or an exciting collaboration — I'm always open to great ideas.
          </p>
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base
              text-dark-900 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #00FFFF, #3B82F6)" }}
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #3B82F6, #FF00FF)" }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <Send size={18} />
              Get In Touch
            </span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default HomeCTA;
