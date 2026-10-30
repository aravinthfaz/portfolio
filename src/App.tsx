import { useState, useEffect } from "react";
import {
  Award,
  Briefcase,
  ChevronDown,
  Code,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  User,
  X,
} from "lucide-react";
import "./App.css";
import { getIcon, highlight, useSiteContent } from "./content";
import ThemePicker from "./ThemePicker";

function App() {
  const content = useSiteContent();
  const { experiences, skillCategories, highlights, contact } = content;
  useEffect(() => {
    document.title = content.siteTitle;
  }, [content.siteTitle]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false),
    [activeSection, setActiveSection] = useState("home"),
    [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = [
        "home",
        "about",
        "experience",
        "skills",
        "highlights",
        "contact",
      ];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    },
    navItems = [
      {
        id: "home",
        label: "Home",
      },
      {
        id: "about",
        label: "About",
      },
      {
        id: "experience",
        label: "Experience",
      },
      {
        id: "skills",
        label: "Skills",
      },
      {
        id: "highlights",
        label: "Highlights",
      },
      {
        id: "contact",
        label: "Contact",
      },
    ];
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-950/95 backdrop-blur-md shadow-lg shadow-slate-900/50" : "bg-transparent"}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => scrollToSection("home")}
              className="text-xl font-bold bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent hover:from-sky-300 hover:to-violet-300 transition-all"
            >
              {content.initials}
            </button>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((z) => (
                <button
                  key={z.id}
                  onClick={() => scrollToSection(z.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeSection === z.id ? "text-sky-400 bg-sky-400/10" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
                >
                  {z.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((z) => (
                <button
                  key={z.id}
                  onClick={() => scrollToSection(z.id)}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeSection === z.id ? "text-sky-400 bg-sky-400/10" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"}`}
                >
                  {z.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"
            style={{
              animationDelay: "1s",
            }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
              {content.availability}
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              {content.name}
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            {highlight(content.heroSummary, "text-slate-200 font-medium")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection("experience")}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 text-white font-semibold hover:from-sky-600 hover:to-violet-600 transition-all duration-300 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5"
            >
              View My Experience
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3.5 rounded-xl border border-slate-700 text-slate-300 font-semibold hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get In Touch
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-12">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-sky-400 transition-colors duration-200"
            >
              <Linkedin size={22} />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="text-slate-500 hover:text-sky-400 transition-colors duration-200"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-sky-400 transition-colors animate-bounce"
        >
          <ChevronDown size={28} />
        </button>
      </section>
      <section id="about" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <User className="text-sky-400" size={28} />
            <h2 className="text-3xl sm:text-4xl font-bold">About Me</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-violet-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-opacity duration-300" />
              <img
                src={`${import.meta.env.BASE_URL}images/about.jpg`}
                alt="Developer working on a laptop at a modern workspace"
                className="relative rounded-2xl w-full h-96 object-cover"
                onError={(z) => {
                  (z.target as HTMLImageElement).src =
                    "https://placehold.co/800x600/1e293b/94a3b8/png?text=About+Me";
                }}
              />
            </div>
            <div className="space-y-6">
              {content.about.paragraphs.map((text, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-lg text-slate-300 leading-relaxed"
                      : "text-slate-400 leading-relaxed"
                  }
                >
                  {highlight(text, "text-sky-400 font-semibold")}
                </p>
              ))}
              <div className="grid grid-cols-2 gap-6 pt-4">
                {content.about.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50"
                  >
                    <div className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="experience" className="py-24 relative">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="text-sky-400" size={28} />
            <h2 className="text-3xl sm:text-4xl font-bold">Experience</h2>
          </div>
          <div className="space-y-8">
            {experiences.map((z, I) => (
              <div key={I} className="group relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/50 via-violet-500/50 to-transparent hidden md:block ml-6" />
                <div className="relative p-6 sm:p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-sky-500/30 hover:bg-slate-800/50 transition-all duration-300 md:ml-16">
                  <div className="absolute -left-3 top-8 w-6 h-6 rounded-full bg-slate-900 border-2 border-sky-500 hidden md:flex items-center justify-center md:-ml-10">
                    <div className="w-2 h-2 rounded-full bg-sky-400" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-100">
                        {z.title}
                      </h3>
                      <p className="text-sky-400 font-medium">{z.company}</p>
                    </div>
                    <span className="text-sm text-slate-500 mt-1 sm:mt-0 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 whitespace-nowrap">
                      {z.period}
                    </span>
                  </div>
                  <p className="text-slate-400 mb-4 leading-relaxed">
                    {z.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {z.tags.map((se, me) => (
                      <span
                        key={me}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20"
                      >
                        {se}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="text-violet-400" size={28} />
              <h3 className="text-2xl sm:text-3xl font-bold">Education</h3>
            </div>
            <div className="space-y-6">
              {content.education.map((edu, i) => (
                <div
                  key={i}
                  className="p-6 sm:p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-slate-100">
                        {edu.degree}
                      </h4>
                      <p className="text-violet-400 font-medium">
                        {edu.school}
                      </p>
                    </div>
                    <span className="text-sm text-slate-500 mt-1 sm:mt-0 px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="skills" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Code className="text-sky-400" size={28} />
            <h2 className="text-3xl sm:text-4xl font-bold">
              Skills & Technologies
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((z, I) => {
              const Icon = getIcon(z.icon);
              return (
                <div
                  key={I}
                  className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-sky-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="text-sky-400" size={20} />
                    <h3 className="text-lg font-bold text-sky-400">
                      {z.category}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {z.items.map((me, G) => (
                      <div key={G} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-sky-400 to-violet-400" />
                        <span className="text-slate-300">{me}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section id="highlights" className="py-24 relative">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Award className="text-sky-400" size={28} />
            <h2 className="text-3xl sm:text-4xl font-bold">Key Achievements</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((z, I) => {
              const Icon = getIcon(z.icon);
              return (
                <div
                  key={I}
                  className="group p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-sky-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/5"
                >
                  <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 w-fit mb-5 group-hover:bg-sky-500/20 transition-colors">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-3">
                    {z.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {z.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Send className="text-sky-400" size={28} />
            <h2 className="text-3xl sm:text-4xl font-bold">Get In Touch</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                {contact.intro}
              </p>
              <div className="space-y-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-sky-500/30 hover:bg-slate-800/50 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Email</div>
                    <div className="text-slate-200">{contact.email}</div>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                  <div className="p-3 rounded-lg bg-sky-500/10 text-sky-400">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Phone</div>
                    <div className="text-slate-200">{contact.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                  <div className="p-3 rounded-lg bg-sky-500/10 text-sky-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Location</div>
                    <div className="text-slate-200">{contact.location}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-all duration-200"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            <form
              action={`https://formsubmit.co/${contact.email}`}
              method="POST"
              className="space-y-5"
            >
              <input
                type="hidden"
                name="_subject"
                value="New Contact from Portfolio Website"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_next"
                value={window.location.href.split("#")[0]}
              />
              <input
                type="text"
                name="_honey"
                style={{
                  display: "none",
                }}
              />
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-400 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-400 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-400 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 text-white font-semibold hover:from-sky-600 hover:to-violet-600 transition-all duration-300 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      <footer className="py-8 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} {content.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-sky-400 transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="text-slate-500 hover:text-sky-400 transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
      <ThemePicker />
    </div>
  );
}

export default App;
