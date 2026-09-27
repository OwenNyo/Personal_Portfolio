import { skillGroups } from '../data/skills.js';

export default function TastingNotes() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="wrap">
        <h2 className="section-title" id="skills-title">
          Tasting notes
        </h2>
        <div className="notes__groups">
          {skillGroups.map((group) => (
            <div className="notes__group" key={group.name}>
              <h3>{group.name}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li className="note" key={skill.name} aria-label={`${skill.name}, ${skill.usage}`}>
                    <div className="note__row" aria-hidden="true">
                      <span>{skill.name}</span>
                      <span>{skill.usage}</span>
                    </div>
                    <div className="note__bar" aria-hidden="true">
                      <i style={{ width: `${skill.level}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
