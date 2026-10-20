import { profile } from '../data/profile.js';

export default function Contact() {
  const { links } = profile;
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <div className="contact__body">
          <p className="eyebrow">the counter's open</p>
          <h2 className="contact__title">
            say <i>hello</i> ↗
          </h2>
          <p className="contact__text">
            recruiting, collaborating, or just want to argue about grinders and pour-over ratios? i'd love to hear from
            you.
          </p>
          <div className="contact__links">
            <a className="pill pill--fill" href={links.email}>
              email me ↗
            </a>
            <a className="pill" href={links.github} target="_blank" rel="noopener">
              github ↗
            </a>
            <a className="pill" href={links.linkedin} target="_blank" rel="noopener">
              linkedin ↗
            </a>
            <a className="pill" href={links.resume} target="_blank" rel="noopener">
              resume ↗
            </a>
          </div>
        </div>
        <footer className="footer mono">
          <span>© {new Date().getFullYear()} owen · made with love and one too many flat whites</span>
          <a href="#top">back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}
