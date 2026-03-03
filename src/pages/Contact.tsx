import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

const FORM_ENDPOINT = "https://formspree.io/f/maqdglqw";

const socialLinks = [
  {
    label: "GitHub",
    icon: <Github size={20} />,
    href: "https://github.com/shlokDS16",
    from: "#80FF72",
    to: "#7EE8FA",
  },
  {
    label: "LinkedIn",
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/in/shlokgoenka/",
    from: "#56CCF2",
    to: "#2F80ED",
  },
  {
    label: "Email",
    icon: <Mail size={20} />,
    href: "mailto:shlokgoenka77@gmail.com",
    from: "#FF9966",
    to: "#FF5E62",
  },
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.message.trim() || form.message.length < 10) errs.message = "Message must be at least 10 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full bg-dark-700 border rounded-xl px-4 py-3 text-white text-sm font-body placeholder-gray-600
    transition-all duration-300 outline-none
    focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50
    ${errors[field] ? "border-red-500/50" : "border-white/10"}`;

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
          — Get In Touch
        </p>
        <h1 className="text-4xl md:text-6xl font-heading font-black gradient-text mb-4">
          Contact
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg">
          Have a project in mind, a research opportunity, or just want to connect? I'd love to hear from you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Form — left (3/5) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-3"
        >
          <div className="glass-card p-6 md:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name & Email row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass("name")}
                    aria-label="Your Name"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1 font-mono">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass("email")}
                    aria-label="Your Email"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1 font-mono">{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={inputClass("subject")}
                  aria-label="Subject"
                />
                {errors.subject && <p className="text-red-400 text-xs mt-1 font-mono">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <textarea
                  placeholder="Your Message..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={6}
                  className={`${inputClass("message")} resize-none`}
                  aria-label="Message"
                />
                {errors.message && <p className="text-red-400 text-xs mt-1 font-mono">{errors.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-full
                  font-semibold text-dark-900 transition-all duration-300 overflow-hidden cursor-pointer
                  disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #00FFFF, #3B82F6)" }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, #3B82F6, #FF00FF)" }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <Send size={17} />
                  {status === "loading" ? "Sending..." : "Send Message"}
                </span>
              </button>

              {/* Status feedback */}
              {status === "success" && (
                <p className="text-emerald-400 text-sm text-center font-mono">
                  Message sent successfully! I'll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm text-center font-mono">
                  Something went wrong. Please email me directly at shlokgoenka77@gmail.com
                </p>
              )}
            </form>
          </div>
        </motion.div>

        {/* Info — right (2/5) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-2 flex flex-col gap-5"
        >
          {/* Contact details */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-heading font-bold text-white mb-5">Direct Contact</h3>
            <div className="space-y-4">
              <ContactInfo icon={<Mail size={18} />} label="Email" value="shlokgoenka77@gmail.com" href="mailto:shlokgoenka77@gmail.com" />
              <ContactInfo icon={<Phone size={18} />} label="Phone" value="+91-9327881059" href="tel:+919327881059" />
              <ContactInfo icon={<MapPin size={18} />} label="Location" value="Surat, Gujarat, India" />
            </div>
          </div>

          {/* Social links — GradientMenu pattern */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-heading font-bold text-white mb-5">Connect</h3>
            <div className="flex flex-col gap-3">
              {socialLinks.map(({ label, icon, href, from, to }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group relative flex items-center gap-3 px-4 py-3 rounded-full border border-white/10
                    transition-all duration-300 overflow-hidden cursor-pointer"
                  aria-label={label}
                >
                  <span
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(45deg, ${from}30, ${to}30)` }}
                  />
                  <span
                    className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center border border-white/10"
                    style={{ color: from }}
                  >
                    {icon}
                  </span>
                  <span className="relative z-10 text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Availability notice */}
          <div
            className="glass-card p-5 border"
            style={{ borderColor: "rgba(0,255,255,0.15)" }}
          >
            <p className="text-xs font-mono text-neon-cyan/70 text-center">
              Currently open to research collaborations, hackathons, and internship opportunities.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

const ContactInfo: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}> = ({ icon, label, value, href }) => {
  const content = (
    <div className="flex items-center gap-3 group">
      <span className="text-neon-cyan/70 shrink-0">{icon}</span>
      <div>
        <p className="text-xs text-gray-600 font-mono">{label}</p>
        <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="cursor-pointer">
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
};

export default Contact;
