import { profile } from '../data/profile.js';

export default function Label() {
  const { name, roast, origin, about, stamp, links } = profile;
  return (
    <section className="section" id="intro" aria-labelledby="intro-title">
      <div className="wrap label">
        <h1 className="label__name" id="intro-title">
          {name[0]}
          <br />
          {name[1]}
        </h1>
        <dl className="label__fields">
          <div>
            <dt>Roast</dt>
            <dd>{roast}</dd>
          </div>
          <div>
            <dt>Origin</dt>
            <dd>{origin}</dd>
          </div>
        </dl>
        <p className="label__about">{about}</p>
        <div className="links">
          <a className="pill pill--fill" href={links.resume}>
            Resume
          </a>
          <a className="pill" href={links.github} target="_blank" rel="noopener">
            GitHub
          </a>
          <a className="pill" href={links.linkedin} target="_blank" rel="noopener">
            LinkedIn
          </a>
        </div>
        <div className="label__stamp" aria-hidden="true">
          {stamp.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
