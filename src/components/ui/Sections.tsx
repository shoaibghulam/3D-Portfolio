import { useRef } from 'react'
import type { MouseEvent } from 'react'
import {
  profile,
  marquee,
  experience,
  education,
  certifications,
  languages,
  projects,
  skillGroups,
} from '../../data/profile'

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function trackCardGlow(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  el.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

/* ---------------- hero ---------------- */

function PhotoCard() {
  const frame = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = frame.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`
  }

  const onLeave = () => {
    if (frame.current) frame.current.style.transform = ''
  }

  return (
    <div className="photo-wrap reveal" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="photo-card" ref={frame}>
        <img src={profile.photo} alt={`Portrait of ${profile.name}`} width="380" height="380" />
        <div className="photo-shine" aria-hidden="true" />
        <span className="photo-badge badge-role" aria-hidden="true">
          React &middot; Next.js
        </span>
        <span className="photo-badge badge-ai" aria-hidden="true">
          AI Healthcare
        </span>
        <span className="photo-badge badge-py" aria-hidden="true">
          Python &middot; Django
        </span>
      </div>
      <div className="photo-ring" aria-hidden="true" />
    </div>
  )
}

export function Hero() {
  return (
    <header id="top" className="section hero" data-scene tabIndex={-1}>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow reveal">
            <span className="pulse-dot" aria-hidden="true" /> Available for work &mdash;{' '}
            {profile.location}
          </p>
          <h1 className="reveal">
            Shoaib
            <br />
            <span className="grad-text">Ahmed</span>
          </h1>
          <p className="hero-role reveal">{profile.role}</p>
          <p className="hero-sub reveal">{profile.headline}</p>
          <p className="hero-sub-2 reveal">{profile.sub}</p>
          <div className="hero-actions reveal">
            <a className="btn btn-primary" href={profile.links.upwork} target="_blank" rel="noreferrer">
              Hire me on Upwork <ArrowIcon />
            </a>
            <a className="btn btn-ghost" href="#work">
              See my work
            </a>
          </div>
        </div>
        <PhotoCard />
      </div>
      <ul className="hero-stats reveal" role="list">
        {profile.stats.map((stat) => (
          <li key={stat.label}>
            <b>{stat.value}</b>
            <span>{stat.label}</span>
          </li>
        ))}
      </ul>
      <p className="scroll-hint" aria-hidden="true">
        &darr;
      </p>
    </header>
  )
}

export function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={`${item}-${i}`}>
            {item} <em>&#10038;</em>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------------- about ---------------- */

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading" data-scene tabIndex={-1}>
      <p className="eyebrow reveal">About</p>
      <h2 id="about-heading" className="reveal">
        Full stack. <span className="grad-text">Full picture.</span>
      </h2>
      <div className="about-grid">
        <div className="about-copy panel reveal" onMouseMove={trackCardGlow}>
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          <div className="about-meta">
            <span>{profile.location}</span>
            <span>MSc Data Science in progress</span>
            <span>Working worldwide</span>
          </div>
        </div>
        <div className="languages panel reveal" onMouseMove={trackCardGlow}>
          <h3>Languages</h3>
          <ul role="list">
            {languages.map((lang) => (
              <li key={lang.name}>
                <div className="lang-row">
                  <span>{lang.name}</span>
                  <span className="lang-level">{lang.level}</span>
                </div>
                <div className="lang-bar" aria-hidden="true">
                  <span style={{ width: `${lang.pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------------- experience ---------------- */

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section"
      aria-labelledby="experience-heading"
      data-scene
      tabIndex={-1}
    >
      <p className="eyebrow reveal">Experience</p>
      <h2 id="experience-heading" className="reveal">
        Eight years of <span className="grad-text">shipping</span>.
      </h2>
      <ol className="timeline" role="list">
        {experience.map((job) => (
          <li className="timeline-item reveal" key={`${job.company}-${job.period}`}>
            <div className="timeline-dot" aria-hidden="true" />
            <div className="timeline-card panel" onMouseMove={trackCardGlow}>
              <div className="timeline-head">
                <h3>
                  {job.role} <span className="at">@ {job.company}</span>
                </h3>
                {job.current && <span className="badge-now">Now</span>}
              </div>
              <p className="timeline-meta">
                {job.period} &middot; {job.location}
              </p>
              <ul className="timeline-points">
                {job.points.map((point) => (
                  <li key={point.slice(0, 32)}>{point}</li>
                ))}
              </ul>
              <ul className="tags" role="list">
                {job.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ---------------- education + certifications ---------------- */

export function EducationSection() {
  return (
    <section
      id="education"
      className="section"
      aria-labelledby="education-heading"
      data-scene
      tabIndex={-1}
    >
      <p className="eyebrow reveal">Education</p>
      <h2 id="education-heading" className="reveal">
        Always <span className="grad-text">learning</span>.
      </h2>
      <div className="edu-grid">
        {education.map((item) => (
          <div className="edu-card panel reveal" key={item.degree} onMouseMove={trackCardGlow}>
            <span className="edu-period">{item.period}</span>
            <h3>{item.degree}</h3>
            <p className="edu-school">
              {item.school} &middot; {item.location}
            </p>
            <p className="edu-detail">{item.detail}</p>
          </div>
        ))}
      </div>
      <h3 className="certs-heading reveal">Certifications</h3>
      <ul className="certs" role="list">
        {certifications.map((cert) => (
          <li key={cert.title}>
            <a
              className="cert-card panel"
              href={cert.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${cert.title} — ${cert.issuer} (opens in new tab)`}
            >
              <span className="cert-year">{cert.year}</span>
              <span className="cert-title">{cert.title}</span>
              <span className="cert-issuer">{cert.issuer}</span>
              <ArrowIcon />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ---------------- skills ---------------- */

export function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-heading" data-scene tabIndex={-1}>
      <p className="eyebrow reveal">Skills</p>
      <h2 id="skills-heading" className="reveal">
        My <span className="grad-text">orbit</span> of tools.
      </h2>
      <p className="section-lede reveal">
        The rings behind this text are live &mdash; every word circling the core is a technology I
        ship with.
      </p>
      <div className="skill-groups">
        {skillGroups.map((group) => (
          <div className="skill-group panel reveal" key={group.title} onMouseMove={trackCardGlow}>
            <h3>{group.title}</h3>
            <ul className="chips" role="list">
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- projects ---------------- */

export function Work() {
  return (
    <section id="work" className="section" aria-labelledby="work-heading" data-scene tabIndex={-1}>
      <p className="eyebrow reveal">Work</p>
      <h2 id="work-heading" className="reveal">
        Products, <span className="grad-text">live</span> in the wild.
      </h2>
      <p className="section-lede reveal">
        From AI radiology platforms to crypto analytics &mdash; real products with real users.
      </p>
      <div className="project-grid">
        {projects.map((project, i) => (
          <a
            className="card panel reveal"
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            onMouseMove={trackCardGlow}
            aria-label={`${project.title} (opens in new tab)`}
          >
            <div className="card-top">
              <span className="card-index">{String(i + 1).padStart(2, '0')}</span>
              {project.live && <span className="badge-live">&#9679; Live</span>}
            </div>
            <h3>
              {project.title} <ArrowIcon />
            </h3>
            <span className="card-highlight">{project.highlight}</span>
            <p>{project.description}</p>
            <ul className="tags" role="list">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </a>
        ))}
      </div>
    </section>
  )
}

/* ---------------- contact ---------------- */

export function Contact() {
  return (
    <section
      id="contact"
      className="section contact"
      aria-labelledby="contact-heading"
      data-scene
      tabIndex={-1}
    >
      <p className="eyebrow reveal">Contact</p>
      <h2 id="contact-heading" className="reveal">
        Let&apos;s build something <span className="grad-text">rare</span>.
      </h2>
      <p className="section-lede reveal">
        Have a product that needs a full-stack brain &mdash; frontend, backend and the intelligence
        in between? I&apos;m one message away.
      </p>
      <div className="contact-actions reveal">
        <a className="btn btn-primary" href={profile.links.upwork} target="_blank" rel="noreferrer">
          Hire me on Upwork <ArrowIcon />
        </a>
        <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </div>
      <ul className="contact-links reveal" role="list">
        <li>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={profile.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href={profile.links.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </li>
      </ul>
      <footer className="footer">
        <span>
          &copy; {new Date().getFullYear()} {profile.name}
        </span>
        <span>{profile.location} &middot; Available worldwide</span>
        <span>Built with React &middot; Three.js &middot; TypeScript</span>
      </footer>
    </section>
  )
}
