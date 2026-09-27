import { projects } from '../data/projects.js';
import ProjectCard from './ProjectCard.jsx';

export default function Shelf() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="wrap">
        <h2 className="section-title" id="projects-title">
          On the shelf
        </h2>
        <ul className="shelf__grid">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </ul>
      </div>
    </section>
  );
}
