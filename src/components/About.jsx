import { useState } from 'react';
import { about } from '../data/about.js';
import LoyaltyCard from './LoyaltyCard.jsx';

const tabs = [
  { id: 'engineer', icon: '☕', label: 'software engineer', tint: 'caramel' },
  { id: 'offClock', icon: '♪', label: 'off the clock', tint: 'olive' },
  { id: 'teacher', icon: '✎', label: 'teacher', tint: 'espresso' },
  { id: 'baker', icon: '🥐', label: 'baker', tint: 'cherry' },
];

function playlistEmbed(url) {
  const id = url.match(/playlist\/([A-Za-z0-9]+)/)?.[1];
  return id ? `https://open.spotify.com/embed/playlist/${id}?theme=0` : null;
}

function Engineer() {
  return (
    <>
      <p className="panel__text">{about.engineer.blurb}</p>
      <p className="panel__wall mono">{about.engineer.wall}</p>
      <LoyaltyCard />
    </>
  );
}

function OffClock() {
  const src = playlistEmbed(about.offClock.playlist);
  return (
    <div className="panel__split">
      <div>
        <p className="panel__text">{about.offClock.blurb}</p>
        <p className="panel__label mono">fun facts, no refunds</p>
        <ol className="facts">
          {about.offClock.funFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ol>
      </div>
      {src ? (
        <iframe
          className="playlist"
          src={src}
          title="Spotify playlist"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      ) : (
        <div className="playlist playlist--empty mono">playlist loading, come back after the next brew</div>
      )}
    </div>
  );
}

function Teacher() {
  const { blurb, stats } = about.teacher;
  return (
    <>
      <p className="panel__text">{blurb}</p>
      <dl className="stats">
        {stats.map((s) => (
          <div className="stats__item" key={s.label}>
            <dt className="mono">{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function Baker() {
  const { blurb, bakes } = about.baker;
  const slots = [0, 1, 2];
  return (
    <div className="panel__split">
      <p className="panel__text">{blurb}</p>
      <div className="bakes">
        {slots.map((i) =>
          bakes[i] ? (
            <img key={i} className="bakes__shot" src={bakes[i].src} alt={bakes[i].alt} loading="lazy" />
          ) : (
            <div key={i} className="bakes__shot bakes__shot--empty" aria-hidden="true" />
          ),
        )}
      </div>
    </div>
  );
}

const panels = { engineer: Engineer, offClock: OffClock, teacher: Teacher, baker: Baker };

export default function About() {
  const [active, setActive] = useState('engineer');
  const tab = tabs.find((t) => t.id === active);
  const Panel = panels[active];

  return (
    <section className="section about" id="about">
      <div className="wrap">
        <p className="eyebrow">01 / about</p>
        <h2 className="section-title">{about.title}</h2>
        <div className="tabs" role="tablist" aria-label="About me">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={t.id === active}
              aria-controls="about-panel"
              className={`tab${t.id === active ? ' is-on' : ''}`}
              onClick={() => setActive(t.id)}
            >
              <span aria-hidden="true">{t.icon}</span> {t.label}
            </button>
          ))}
        </div>
        <div className="panel" id="about-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
          <div className="panel__head">
            <span className={`panel__icon panel__icon--${tab.tint}`} aria-hidden="true">
              {tab.icon}
            </span>
            <h3>{tab.label}</h3>
          </div>
          <Panel />
        </div>
        <a className="hint" href="#work">
          shifts i've worked<span aria-hidden="true">⌄</span>
        </a>
      </div>
    </section>
  );
}
