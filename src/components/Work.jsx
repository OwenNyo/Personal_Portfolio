import { work } from '../data/work.js';

export default function Work() {
  return (
    <section className="section work" id="work">
      <div className="wrap">
        <p className="eyebrow">02 / work</p>
        <h2 className="section-title">shifts i've worked</h2>
        <ul className="shifts">
          {work.map((job) => (
            <li className="shift" key={job.company}>
              <div>
                <h3>{job.company}</h3>
                <p className="shift__role">{job.role}</p>
              </div>
              <ul className="shift__bullets">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="shift__when mono">{job.when}</p>
            </li>
          ))}
        </ul>
        <a className="hint" href="#menu">
          today's menu<span aria-hidden="true">⌄</span>
        </a>
      </div>
    </section>
  );
}
