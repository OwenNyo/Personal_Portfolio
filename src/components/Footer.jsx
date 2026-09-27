import { profile } from '../data/profile.js';

export default function Footer() {
  const { links } = profile;
  return (
    <footer className="wrap footer">
      <div className="links">
        <a href={links.resume}>Resume</a>
        <a href={links.github} target="_blank" rel="noopener">
          GitHub
        </a>
        <a href={links.linkedin} target="_blank" rel="noopener">
          LinkedIn
        </a>
      </div>
      <span>© {new Date().getFullYear()} Owen Nyo</span>
    </footer>
  );
}
