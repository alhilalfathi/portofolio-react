import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { CiMail } from "react-icons/ci"
import { FaGithub, FaLinkedin, FaPaintBrush } from "react-icons/fa"
import { VscServerProcess } from "react-icons/vsc"
import { BsDatabaseFill } from "react-icons/bs"
import { MdSecurity } from "react-icons/md"

interface Project {
  title: string; date: string; problem: string; solution: string
  stack: string[]; highlights: string[]; color: string; emoji: string
}
interface SkillGroup { category: string; icon: any; items: string[] }
interface Experience { company: string; role: string; period: string; location: string; description: string; current?: boolean }

const projects: Project[] = [
  {
    title: 'Asset Tracking System', date: 'April 2026', emoji: '📦',
    problem: 'A company needed to digitize physical asset inventory — tracking hundreds of items across borrowing, returns, and repairs with zero double-booking errors.',
    solution: 'Built a secure, high-performance backend supporting QR-scan workflows, role-based access, and real-time transactions under 10 seconds with strict concurrency controls.',
    stack: ['Golang', 'Gin', 'PostgreSQL', 'Redis', 'JWT', 'Argon2', 'REST API', 'pgx'],
    highlights: ['JWT + RBAC role-based access control', 'Argon2 hashing for secure credentials', 'Redis caching for sessions & performance', 'DB transactions prevent double-borrowing races', 'Asset state machine: Ready → Borrowed → Repair', 'API response <10s for real-time QR scanning'],
    color: '#4ade80',
  },
  {
    title: 'URL Shortener App', date: 'March 2026', emoji: '🔗',
    problem: 'Needed a production-ready full-stack URL shortener with authentication, custom aliases, and reliable redirection — containerized for easy deployment.',
    solution: 'Monorepo full-stack app: Go/Gin backend with clean architecture, React frontend with React Router, PostgreSQL persistence, Docker Compose, and GitHub Actions CI/CD.',
    stack: ['Golang', 'Gin', 'React', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'GitHub Actions', 'JWT'],
    highlights: ['Clean arch: Handler → Service → Repository', 'golang-migrate for versioned DB schema changes', 'Monorepo with independent env configs', 'Docker Compose for full-stack deployment', 'GitHub Actions CI/CD automation', 'Custom alias support with fast redirect logic'],
    color: '#60a5fa',
  },
  {
    title: 'CoffeeShop E-Commerce', date: 'December 2025', emoji: '☕',
    problem: 'Build a complete e-commerce platform handling products, cart, checkout, order history, reviews, and promotions with high performance and security.',
    solution: 'Full-stack app with Redux state management, OTP-based auth, Redis caching, product recommendation engine, and CI/CD pipeline using clean architecture throughout.',
    stack: ['Golang', 'Gin', 'React', 'Redux', 'PostgreSQL', 'Redis', 'Docker', 'JWT', 'Argon2'],
    highlights: ['OTP-based verification for enhanced security', 'Redux Toolkit for complex frontend state', 'Redis caching for product listings & sessions', 'Product recommendation from user behavior', 'Pagination, search, reviews, cart & orders', 'Full CI/CD with GitHub Actions + Docker'],
    color: '#f59e0b',
  },
]

const skills: SkillGroup[] = [
  { category: 'Backend', icon: <VscServerProcess/>, items: ['Golang', 'Gin', 'Node.js', 'REST API', 'Clean Architecture', 'JWT Auth', 'GORM', 'Middleware'] },
  { category: 'Frontend', icon: <FaPaintBrush/>, items: ['React.js', 'Redux Toolkit', 'TypeScript', 'Tailwind CSS', 'Vite', 'React Router', 'HTML5', 'CSS3'] },
  { category: 'Database', icon: <BsDatabaseFill/>, items: ['PostgreSQL', 'Redis', 'pgx', 'GORM', 'golang-migrate', 'Indexing', 'Transactions'] },
  { category: 'DevOps & Security', icon: <MdSecurity/>, items: ['Docker', 'Docker Compose', 'GitHub Actions', 'GitLab CI', 'Linux CLI', 'Argon2', 'bcrypt', 'CORS'] },
]

const experiences: Experience[] = [
  {
    company: 'PT. NashTa Global Utama', role: 'Backend Developer',
    period: 'April 2026 – Present', location: 'Depok, Indonesia', current: true,
    description: 'Building backend services for an asset tracking system digitizing inventory management. Designed PostgreSQL schemas, developed RESTful APIs with Golang/Gin following clean architecture, implemented RBAC with JWT, integrated Redis for caching, and optimized API performance to under 10 seconds for real-time QR scanning.',
  },
  {
    company: 'Koda Tech Academy', role: 'Fullstack Web Developer',
    period: 'December 2025 – April 2026', location: 'Depok, Indonesia',
    description: 'Intensive fullstack bootcamp building production-grade applications. Delivered two complete full-stack projects (URL Shortener and CoffeeShop E-Commerce) covering Go backend, React frontend, Docker deployment, and GitHub Actions CI/CD pipelines.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

function Section({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section ref={ref} id={id} className={className}>
      <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}>
        {children}
      </motion.div>
    </section>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn) }, [])
  const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact']
  return (
    <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#1e1e2e]' : ''}`}>
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-[#4ade80] text-lg font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>gaf<span className="text-[#e2e8f0]">.</span></span>
        <div className="hidden md:flex gap-8">
          {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="text-[#6b7280] hover:text-[#e2e8f0] transition-colors text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{l}</a>)}
        </div>
        <button className="md:hidden text-[#6b7280] hover:text-[#e2e8f0]" onClick={() => setOpen(v => !v)} aria-label="menu">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">{open ? <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" /> : <><path d="M4 6h16" strokeLinecap="round" /><path d="M4 12h16" strokeLinecap="round" /><path d="M4 18h16" strokeLinecap="round" /></>}</svg>
        </button>
      </div>
      <AnimatePresence>
        {open && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#0a0a0f] border-b border-[#1e1e2e] px-6 pb-4">
          {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="block py-2.5 text-sm text-[#6b7280] hover:text-[#4ade80] transition-colors">{l}</a>)}
        </motion.div>}
      </AnimatePresence>
    </motion.nav>
  )
}

function Hero() {
  return (
    <div className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(74,222,128,0.04)' }} />
      <div className="max-w-5xl mx-auto px-6 py-24 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 text-[#4ade80] text-xs mb-6 px-3 py-1 rounded-full border border-[#4ade80]/20 bg-[#4ade80]/5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl leading-tight mb-4 tracking-tight" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}>
          Gazanuha<br /><span className="text-[#4ade80]">Alhilal</span><br />Fathiakbar
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22 }} className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="text-[#6b7280] text-base" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Fullstack Developer</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
          <span className="text-[#6b7280] text-base" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Backend-focused</span>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-[#6b7280] text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
          Building scalable backend systems with Go — clean architecture, secure auth, and production-ready APIs.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.38 }} className="flex flex-wrap gap-4">
          <a href="#projects" className="px-6 py-3 bg-[#4ade80] text-[#0a0a0f] font-semibold rounded-lg hover:bg-[#22c55e] transition-colors text-sm">View Projects</a>
          <a href="#contact" className="px-6 py-3 border border-[#1e1e2e] text-[#e2e8f0] rounded-lg hover:border-[#4ade80]/40 hover:text-[#4ade80] transition-all text-sm">Get in Touch</a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-wrap gap-2 mt-12">
          {['Golang', 'PostgreSQL', 'Redis', 'Docker', 'React', 'REST API'].map(t => (
            <span key={t} className="text-xs px-2.5 py-1 rounded border border-[#1e1e2e] text-[#6b7280]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{t}</span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function About() {
  return (
    <Section className="py-24" id="about">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div variants={fadeUp} custom={0} className="mb-12">
          <span className="text-[#4ade80] text-xs mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>01 / About</span>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Who I am</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={fadeUp} custom={1} className="space-y-4 text-[#6b7280] leading-relaxed">
            <p>Full Stack Web Developer with an Electrical Engineering background from <span className="text-[#e2e8f0]">Universitas Muhammadiyah Yogyakarta</span>. I bring systems-level thinking from hardware to software.</p>
            <p>My focus is <span className="text-[#4ade80]">scalable backend architecture</span> — APIs that are clean, secure, and maintainable. I follow clean architecture strictly with clear separation across handler, service, and repository layers.</p>
            <p>Currently working at <span className="text-[#e2e8f0]">PT. NashTa Global Utama</span> as a Backend Developer, building an asset tracking system with real-time QR-scan workflows.</p>
          </motion.div>
          <motion.div variants={fadeUp} custom={2} className="space-y-0">
            {[
              ['Location', 'Jakarta, Indonesia'],
              ['Education', 'B.Eng Electrical Engineering, UMY (2018–2023)'],
              ['Certification', 'Fullstack Website Developer - KODA Academy'],
              ['Certification', 'Scalable Web Service with Golang - Kominfo × Hacktiv8'],
              ['Certification', 'Google IT Support Professional Certificate'],
              ['Expertise', 'Backend Engineering, API Design, Clean Architecture'],
            ].map(([k, v], i) => (
              <div key={i} className="flex gap-4 py-3.5 border-b border-[#1e1e2e]">
                <span className="text-[#6b7280] min-w-[90px] text-xs pt-0.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{k}</span>
                <span className="text-[#e2e8f0] text-sm">{v}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

function Skills() {
  return (
    <Section className="py-24" id="skills" >
      <div className="max-w-5xl mx-auto px-6" style={{ background: 'transparent' }}>
        <div className="mb-12">
          <span className="text-[#4ade80] text-xs mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>02 / Skills</span>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Technical skills</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {skills.map((g, i) => (
            <motion.div key={g.category} variants={fadeUp} custom={i + 1} className="p-6 rounded-xl border border-[#1e1e2e] bg-[#111118] hover:border-[#4ade80]/20 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl">{g.icon}</span>
                <h3 className="font-semibold text-[#e2e8f0]" style={{ fontFamily: 'Syne, sans-serif' }}>{g.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map(item => (
                  <span key={item} className="text-xs px-2.5 py-1 rounded-md bg-[#0a0a0f] border border-[#1e1e2e] text-[#6b7280] hover:text-[#4ade80] hover:border-[#4ade80]/30 transition-colors cursor-default" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} custom={i}
      className="group p-6 md:p-8 rounded-2xl border border-[#1e1e2e] bg-[#111118] hover:border-opacity-60 transition-all duration-300">
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <span className="text-xs mb-1.5 block" style={{ fontFamily: 'JetBrains Mono, monospace', color: p.color }}>{p.date}</span>
          <h3 className="text-xl md:text-2xl font-bold text-[#e2e8f0] group-hover:text-white transition-colors" style={{ fontFamily: 'Syne, sans-serif' }}>{p.title}</h3>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl" style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}>{p.emoji}</div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {[['Problem', 'bg-red-500', p.problem], ['Solution', '#4ade80', p.solution]].map(([label, , text]) => (
          <div key={label as string} className="p-4 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e]">
            <div className="text-xs text-[#6b7280] mb-2 flex items-center gap-1.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: label === 'Problem' ? '#f87171' : '#4ade80' }} />
              {label}
            </div>
            <p className="text-sm text-[#6b7280] leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
      <div className="mb-6">
        <p className="text-xs text-[#6b7280] mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>// key highlights</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {p.highlights.map(h => (
            <div key={h} className="flex items-start gap-2 text-sm text-[#6b7280]">
              <span className="mt-1 flex-shrink-0" style={{ color: p.color }}>→</span>
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {p.stack.map(t => (
          <span key={t} className="text-xs px-2 py-0.5 rounded" style={{ fontFamily: 'JetBrains Mono, monospace', background: `${p.color}10`, border: `1px solid ${p.color}25`, color: p.color }}>{t}</span>
        ))}
      </div>
    </motion.div>
  )
}

function Projects() {
  return (
    <Section className="py-24 bg-[#0d0d14]" id="projects">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <span className="text-[#4ade80] text-xs mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>03 / Projects</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Things I've built</h2>
          <p className="text-[#6b7280] max-w-xl">Production-grade applications showcasing backend architecture, security, and DevOps practices.</p>
        </div>
        <div className="space-y-6">
          {projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </Section>
  )
}

function Experience() {
  return (
    <Section className="py-24" id="experience">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <span className="text-[#4ade80] text-xs mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>04 / Experience</span>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Career timeline</h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[#1e1e2e] hidden md:block" />
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div key={exp.company} variants={fadeUp} custom={i + 1} className="relative md:pl-14">
                <div className="hidden md:flex absolute left-0 top-2 w-8 h-8 rounded-full items-center justify-center"
                  style={{ background: exp.current ? '#4ade8015' : '#1e1e2e', border: `1px solid ${exp.current ? '#4ade80' : '#2e2e3e'}` }}>
                  <div className={`w-2.5 h-2.5 rounded-full ${exp.current ? 'bg-[#4ade80] animate-pulse' : 'bg-[#2e2e3e]'}`} />
                </div>
                <div className="p-6 rounded-xl border border-[#1e1e2e] bg-[#111118] hover:border-[#4ade80]/20 transition-colors duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-[#e2e8f0] text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>{exp.company}</h3>
                        {exp.current && <span className="text-xs px-2 py-0.5 rounded-full bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/20" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Current</span>}
                      </div>
                      <p className="text-[#4ade80] text-sm mt-0.5">{exp.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#6b7280] text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{exp.period}</p>
                      <p className="text-[#6b7280] text-xs mt-0.5">{exp.location}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#6b7280] leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

function Contact() {
  return (
    <Section className="py-24 bg-[#0d0d14]" id="contact">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <span className="text-[#4ade80] text-xs mb-2 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>05 / Contact</span>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Let's connect</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div variants={fadeUp} custom={1}>
            <p className="text-[#6b7280] text-lg leading-relaxed mb-8">I'm open to backend engineering roles, fullstack positions, and interesting projects. Feel free to reach out — I respond promptly.</p>
            <div className="space-y-3">
              {[
                { label: 'Email', value: 'alhilal.fathi@gmail.com', href: 'mailto:alhilal.fathi@gmail.com', icon: <CiMail/> },
                { label: 'GitHub', value: 'github.com/alhilalfathi', href: 'https://github.com/alhilalfathi', icon: <FaGithub /> },
                { label: 'LinkedIn', value: 'linkedin.com/in/alhilalfathi', href: 'https://linkedin.com/in/alhilalfathi', icon: <FaLinkedin /> },
                // { label: 'Phone', value: '+62 822 3637 8412', href: 'tel:+6282236378412', icon: '📱' },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-[#1e1e2e] bg-[#111118] hover:border-[#4ade80]/30 hover:bg-[#0f0f18] transition-all duration-200 group">
                  <span className="text-xl">{c.icon}</span>
                  <div>
                    <p className="text-xs text-[#6b7280] mb-0.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{c.label}</p>
                    <p className="text-[#e2e8f0] text-sm group-hover:text-[#4ade80] transition-colors">{c.value}</p>
                  </div>
                  <svg className="ml-auto text-[#6b7280] group-hover:text-[#4ade80] transition-colors w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} custom={2} className="p-8 rounded-2xl border border-[#1e1e2e] bg-[#111118] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-2xl pointer-events-none" style={{ background: 'rgba(74,222,128,0.05)' }} />
            <p className="text-xs text-[#6b7280] mb-6" style={{ fontFamily: 'JetBrains Mono, monospace' }}>// quick summary</p>
            <div className="space-y-3 text-sm relative">
              {[['Status', '🟢 Open to work'], ['Role type', 'Backend / Fullstack'], ['Stack pref', 'Go, PostgreSQL, Docker'], ['Location', 'Jakarta, Indonesia'], ['Remote', 'Yes']].map(([k, v]) => (
                <div key={k} className="flex items-center gap-3">
                  <span className="text-[#6b7280] min-w-[80px]" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>{k}</span>
                  <span className="text-[#e2e8f0]">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer className="border-t border-[#1e1e2e] py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[#6b7280] text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>© 2026 Gazanuha Alhilal Fathiakbar</span>
          <span className="text-[#6b7280] text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Built with React + TypeScript + Framer Motion</span>
        </div>
      </footer>
    </div>
  )
}
