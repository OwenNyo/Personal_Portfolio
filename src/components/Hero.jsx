import { useEffect, useState } from 'react';
import { profile } from '../data/profile.js';

const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Types each tagline out, holds, deletes, moves to the next.
function useTypewriter(words) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(words[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion() || words.length < 2) return undefined;
    const word = words[index];
    let delay = deleting ? 45 : 90;
    if (!deleting && length === word.length) delay = 2200;
    if (deleting && length === 0) delay = 300;

    const id = setTimeout(() => {
      if (!deleting && length === word.length) {
        setDeleting(true);
      } else if (deleting && length === 0) {
        setDeleting(false);
        setIndex((index + 1) % words.length);
      } else {
        setLength(length + (deleting ? -1 : 1));
      }
    }, delay);
    return () => clearTimeout(id);
  }, [words, index, length, deleting]);

  return words[index].slice(0, length);
}

function Polaroid() {
  const [shot, setShot] = useState(0);
  const { photos, photoCaption } = profile;
  const photo = photos[shot];

  const body = photo ? (
    <img className="polaroid__photo" src={photo.src} alt={photo.alt} />
  ) : (
    <div className="polaroid__empty" aria-hidden="true">
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M22 40h48v22a16 16 0 0 1-16 16H38a16 16 0 0 1-16-16z" />
        <path d="M70 46h8a8 8 0 0 1 0 16h-8" />
        <path d="M36 30c0-6 6-6 6-12M48 30c0-6 6-6 6-12M60 30c0-6 6-6 6-12" />
        <path d="M18 86h56" />
      </svg>
    </div>
  );

  if (photos.length < 2) {
    return (
      <figure className="polaroid">
        {body}
        <figcaption>{photoCaption}</figcaption>
      </figure>
    );
  }

  return (
    <figure className="polaroid">
      <button type="button" onClick={() => setShot((shot + 1) % photos.length)} aria-label="Show another photo">
        {body}
      </button>
      <figcaption>{photoCaption}</figcaption>
    </figure>
  );
}

export default function Hero() {
  const typed = useTypewriter(profile.taglines);

  return (
    <section className="section hero" id="top">
      <div className="wrap">
        <div className="hero__body">
          <div>
            <p className="eyebrow hero__eyebrow">{profile.eyebrow}</p>
            <h1 className="hero__name">{profile.greeting}</h1>
            <p className="hero__also" aria-label={`i'm also ${profile.taglines.join(', ')}`}>
              i'm also <b>{typed}</b>
              <span className="hero__caret" aria-hidden="true" />
            </p>
            <p className="hero__intro">{profile.intro}</p>
          </div>
          <Polaroid />
        </div>
        <a className="hint" href="#about">
          pull up a chair, you are in for a ride<span aria-hidden="true">⌄</span>
        </a>
      </div>
    </section>
  );
}
