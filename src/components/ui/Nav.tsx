import { profile } from '../../data/profile'

export function Nav() {
  return (
    <nav className="nav" aria-label="Main navigation">
      <a className="nav-logo" href="#top" aria-label="Back to top">
        <span className="logo-mark">SHOAIB</span>.DEV
      </a>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#skills">Skills</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
        <a
          className="nav-cta"
          href={profile.links.upwork}
          target="_blank"
          rel="noreferrer"
          aria-label="Hire me on Upwork (opens in new tab)"
        >
          Hire me
        </a>
      </div>
    </nav>
  )
}
