export default function ProjectCard({ project }) {
  const { name, stack, year, description, github, live, image, imageAlt } = project;
  return (
    <li className="card">
      <img src={image} alt={imageAlt} width="640" height="400" loading="lazy" />
      <h3>{name}</h3>
      <p className="card__meta">
        {stack}, {year}
      </p>
      <p>{description}</p>
      <p className="card__links">
        <a href={github} target="_blank" rel="noopener">
          GitHub
        </a>
        {live && (
          <a href={live} target="_blank" rel="noopener">
            Live site
          </a>
        )}
      </p>
    </li>
  );
}
