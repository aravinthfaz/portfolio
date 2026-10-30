import { useState, useEffect } from "react";
import {
  Award,
  Briefcase,
  ChevronDown,
  Code,
  Database,
  FileText,
  GraduationCap,
  Headset,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Shield,
  User,
  X,
} from "lucide-react";
import "./App.css";

function App() {
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
    ],
    experiences = [
      {
        title: "Senior Engineer, Tech Support",
        company: "Norstella, Bengaluru, India",
        period: "Apr 2026 - Present",
        description:
          "Provide advanced product and application support for enterprise SaaS and healthcare technology platforms, resolving complex application, configuration and data-related incidents for global clients. Manage escalations and collaborate with Product, Development, QA and DevOps teams on root cause analysis, workarounds and long-term solutions. Perform system validation, data investigation and configuration review, and communicate issue status, resolutions and next actions throughout the support lifecycle. Create knowledge articles and troubleshooting guides, mentor team members and identify recurring issues to improve reliability and support processes.",
        tags: [
          "Product Support",
          "Escalation Management",
          "Root Cause Analysis",
          "Healthcare SaaS",
          "Knowledge Base",
          "Team Mentoring",
        ],
      },
      {
        title: "Issue Resolution Analyst (Application Support)",
        company: "Athenahealth Technology Pvt Ltd, Chennai, India",
        period: "May 2022 - Apr 2026",
        description:
          "Delivered L2/L3 application and production support, including on-call coverage, while managing high-volume JIRA and ServiceNow queues under ITSM processes and SLA targets. Diagnosed application, database, data and API issues using SQL queries, data validation, REST API testing with Insomnia and log analysis. Performed incident, problem and change management; completed root cause analysis and documented corrective actions to reduce repeat incidents. Supported release activities and UAT, and authored 40+ Confluence knowledge articles that reduced inbound tickets by 12%.",
        tags: [
          "JIRA",
          "ServiceNow",
          "SQL",
          "REST APIs",
          "Insomnia",
          "Confluence",
          "UAT",
        ],
      },
      {
        title: "Senior AR Associate (Technical Support)",
        company: "Guidehouse India Pvt Ltd, Trivandrum, India",
        period: "Dec 2021 - Apr 2022",
        description:
          "Delivered application and production support through internal ticketing systems, prioritized and escalated incidents by severity, and maintained 98% SLA compliance for global customers.",
        tags: ["Application Support", "SLA Management", "Incident Escalation"],
      },
      {
        title: "Accounts Receivable Analyst (Support Analyst)",
        company: "Quintessence Business Solutions, Chennai, India",
        period: "Jun 2019 - Oct 2020",
        description:
          "Performed SQL-based data validation and reporting and collaborated with technical teams on change initiatives, improving operational efficiency by 30%.",
        tags: ["SQL", "Data Validation", "Change Management", "Reporting"],
      },
    ],
    skillCategories = [
      {
        category: "Support & Operations",
        items: [
          "Product Support",
          "Application Support",
          "Production Support",
          "L2/L3 Support",
          "On-call Support",
          "Ticket Queue Management",
          "SLA Monitoring",
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Escalation Management",
          "Root Cause Analysis",
        ],
        icon: Headset,
      },
      {
        category: "Tools & Platforms",
        items: [
          "ServiceNow",
          "JIRA",
          "Zendesk",
          "Confluence",
          "Salesforce CRM",
          "Insomnia",
          "Azure",
          "ITSM Frameworks",
        ],
        icon: Shield,
      },
      {
        category: "Technical",
        items: [
          "SQL Queries",
          "Data Validation",
          "REST APIs",
          "API Troubleshooting",
          "Log Analysis",
          "SaaS Applications",
          "UAT",
          "Release Support",
          "Basic C#",
          ".NET",
        ],
        icon: Database,
      },
      {
        category: "Client & Knowledge",
        items: [
          "Global Client Support",
          "Stakeholder Communication",
          "Ticket Documentation",
          "Knowledge Base Management",
          "SOPs",
          "Cross-functional Collaboration",
          "Team Mentoring",
        ],
        icon: FileText,
      },
    ],
    highlights = [
      {
        title: "Knowledge Base Champion",
        description:
          "Authored 40+ Confluence knowledge articles, reducing inbound tickets by 12% and improving team self-service resolution rates.",
        icon: FileText,
      },
      {
        title: "98% SLA Compliance",
        description:
          "Maintained exceptional SLA compliance while supporting global SaaS customers across multiple time zones and priorities.",
        icon: Shield,
      },
      {
        title: "Efficiency Optimizer",
        description:
          "Collaborated with technical teams during change management initiatives, improving operational efficiency by 30%.",
        icon: Award,
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
              AR
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
              Available for opportunities
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Aravinth R
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            A{" "}
            <span className="text-slate-200 font-medium">
              Senior Technical Support Engineer
            </span>{" "}
            and Product Support Analyst with 6+ years of experience supporting
            enterprise SaaS and healthcare technology applications for global
            customers.
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
              href="https://linkedin.com/in/aravinth-r-73601a130"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-sky-400 transition-colors duration-200"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="mailto:aravinthfaz@gmail.com"
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
              <p className="text-lg text-slate-300 leading-relaxed">
                Senior Technical Support Engineer with{" "}
                <span className="text-sky-400 font-semibold">
                  6+ years of experience
                </span>{" "}
                supporting enterprise SaaS and healthcare technology
                applications for global customers.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Skilled in L2/L3 application and production support, ticket
                queue and SLA management, incident, problem and change
                management, root cause analysis, client communication, SQL-based
                data validation, REST API troubleshooting and log analysis.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Experienced in collaborating with Product, Development, QA and
                DevOps teams to resolve critical production issues, support UAT
                and releases, document repeatable processes and mentor support
                teams.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
                    6+
                  </div>
                  <div className="text-sm text-slate-400 mt-1">
                    Years Experience
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
                    40+
                  </div>
                  <div className="text-sm text-slate-400 mt-1">
                    KB Articles Written
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
                    98%
                  </div>
                  <div className="text-sm text-slate-400 mt-1">
                    SLA Compliance
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
                    12%
                  </div>
                  <div className="text-sm text-slate-400 mt-1">
                    Ticket Reduction
                  </div>
                </div>
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
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <div>
                  <h4 className="text-xl font-bold text-slate-100">
                    Bachelor of Computer Science
                  </h4>
                  <p className="text-violet-400 font-medium">
                    Thiagarajar College of Arts and Science, Madurai
                  </p>
                </div>
                <span className="text-sm text-slate-500 mt-1 sm:mt-0 px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
                  2014 - 2017
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Completed Bachelor's degree in Computer Science with a strong
                foundation in software engineering principles and distributed
                systems.
              </p>
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
              const Icon = z.icon;
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
              const Icon = z.icon;
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
                I'm always open to discussing new opportunities, interesting
                projects, or just having a chat about technology. Feel free to
                reach out!
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:aravinthfaz@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-sky-500/30 hover:bg-slate-800/50 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Email</div>
                    <div className="text-slate-200">aravinthfaz@gmail.com</div>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                  <div className="p-3 rounded-lg bg-sky-500/10 text-sky-400">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Phone</div>
                    <div className="text-slate-200">+91 9750805464</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                  <div className="p-3 rounded-lg bg-sky-500/10 text-sky-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Location</div>
                    <div className="text-slate-200">Chennai, India</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <a
                  href="https://linkedin.com/in/aravinth-r-73601a130"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-all duration-200"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            <form
              action="https://formsubmit.co/aravinthfaz@gmail.com"
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
                value="https://resume-portfolio-website-40y4uk8f.devinapps.com"
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
              © {new Date().getFullYear()} Aravinth R. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/in/aravinth-r-73601a130"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-sky-400 transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:aravinthfaz@gmail.com"
                className="text-slate-500 hover:text-sky-400 transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
