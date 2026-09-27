import { profile } from '../data/profile.js';

export default function Nav() {
  return (
    <nav className="nav" aria-label="Sections">
      <a href="#intro">Intro</a>
      <a href="#skills">Skills</a>
      <a href="#projects">Projects</a>
      <a href={profile.links.resume}>Resume</a>
    </nav>
  );
}
