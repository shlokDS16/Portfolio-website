import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, FolderOpen, FileText, Trophy, Mail, Menu, X } from "lucide-react";

const navItems = [
  { title: "Home", path: "/", icon: <Home size={18} />, from: "#00FFFF", to: "#3B82F6" },
  { title: "Projects", path: "/projects", icon: <FolderOpen size={18} />, from: "#a955ff", to: "#ea51ff" },
  { title: "Patents", path: "/patents", icon: <FileText size={18} />, from: "#80FF72", to: "#7EE8FA" },
  { title: "Achievements", path: "/achievements", icon: <Trophy size={18} />, from: "#FF9966", to: "#FF5E62" },
  { title: "Contact", path: "/contact", icon: <Mail size={18} />, from: "#56CCF2", to: "#2F80ED" },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300
          ${scrolled
            ? "bg-dark-800/80 backdrop-blur-2xl border border-white/10 shadow-xl"
            : "bg-dark-800/50 backdrop-blur-xl border border-white/5"
          }`}
      >
        {/* Logo */}
        <Link to="/" className="font-heading font-bold text-xl">
          <span
            style={{
              background: "linear-gradient(135deg, #00FFFF, #FF00FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            SKG
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-2 list-none m-0 p-0">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium
                    transition-all duration-300 cursor-pointer overflow-hidden
                    ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`}
                  aria-label={item.title}
                >
                  {/* Active/hover gradient bg */}
                  <span
                    className={`absolute inset-0 rounded-full transition-opacity duration-300
                      ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    style={{
                      background: `linear-gradient(45deg, ${item.from}30, ${item.to}30)`,
                    }}
                  />
                  {/* Glow */}
                  <span
                    className={`absolute inset-0 rounded-full -z-10 blur-md transition-opacity duration-300
                      ${isActive ? "opacity-30" : "opacity-0 group-hover:opacity-20"}`}
                    style={{
                      background: `linear-gradient(45deg, ${item.from}, ${item.to})`,
                    }}
                  />
                  <span className="relative z-10" style={{ color: isActive ? item.from : undefined }}>
                    {item.icon}
                  </span>
                  <span className="relative z-10">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer border border-white/10"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-dark-900/95 backdrop-blur-xl flex flex-col items-center justify-center gap-4"
          >
            {navItems.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Link
                    to={item.path}
                    className="flex items-center gap-4 px-8 py-4 rounded-2xl text-lg font-medium w-64 justify-center
                      border border-white/10 transition-all duration-300"
                    style={
                      isActive
                        ? {
                            background: `linear-gradient(45deg, ${item.from}30, ${item.to}30)`,
                            borderColor: `${item.from}40`,
                            color: item.from,
                          }
                        : {}
                    }
                  >
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
