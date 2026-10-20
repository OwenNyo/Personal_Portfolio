import { projects } from '../data/projects.js';

function Tag({ project, index }) {
  const { name, stack, year, description, github, live, image, imageAlt } = project;
  return (
    <li className="tag">
      <p className="tag__meta mono">
        no. {index + 1} · {year}
      </p>
      <img src={image} alt={imageAlt} width="640" height="400" loading="lazy" />
      <h3>{name}</h3>
      <p className="tag__meta mono">brewed with {stack}</p>
      <p className="tag__text">{description}</p>
      <p className="tag__links mono">
        <a href={github} target="_blank" rel="noopener">
          github ↗
        </a>
        {live && (
          <a href={live} target="_blank" rel="noopener">
            live ↗
          </a>
        )}
      </p>
    </li>
  );
}

export default function Menu() {
  return (
    <section className="section menu" id="menu">
      <div className="wrap">
        <div className="menu__top">
          <div>
            <p className="eyebrow">03 / projects</p>
            <h2 className="section-title">today's menu</h2>
          </div>
          <p className="menu__note mono">four things i've brewed</p>
        </div>
        <ul className="board">
          {projects.map((p, i) => (
            <Tag key={p.name} project={p} index={i} />
          ))}
        </ul>
        <a className="hint" href="#contact">
          say hello<span aria-hidden="true">⌄</span>
        </a>
      </div>
    </section>
  );
}
