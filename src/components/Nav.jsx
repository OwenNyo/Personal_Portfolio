import { profile } from '../data/profile.js';

export default function Nav() {
  return (
    <nav className="nav" aria-label="Sections">
      <a className="nav__brand" href="#top">
        {profile.handle}
      </a>
      <div className="nav__links">
        <a href="#about">about</a>
        <a href="#work">work</a>
        <a href="#menu">menu</a>
        <a className="is-accent" href="#contact">
          say hi ↗
        </a>
      </div>
    </nav>
  );
}
