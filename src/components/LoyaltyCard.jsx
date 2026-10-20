import { skills } from '../data/skills.js';

const EMPTY_SLOTS = 6;

// A cafe stamp card: every skill is a stamp, the empty slots are what's next.
export default function LoyaltyCard() {
  return (
    <div className="loyalty">
      <h4 className="loyalty__title">owen's loyalty card</h4>
      <p className="loyalty__sub mono">one stamp per tool shipped in anger · no expiry</p>
      <ul className="stamps" aria-label="Skills">
        {skills.map((skill) => (
          <li key={skill.name} className={`stamp stamp--${skill.tint}`}>
            {skill.name}
          </li>
        ))}
        <li className="stamp stamp--free" aria-hidden="true">
          next skill: free coffee
        </li>
        {Array.from({ length: EMPTY_SLOTS }, (_, i) => (
          <li key={i} className="stamp stamp--empty" aria-hidden="true" />
        ))}
      </ul>
      <p className="loyalty__foot mono">empty slots are what i'm learning next. stamps tilt because the barista was in a hurry.</p>
    </div>
  );
}
