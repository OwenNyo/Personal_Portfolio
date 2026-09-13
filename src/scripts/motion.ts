import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SCENE_BG: Record<string, string> = {
  door: '#f6e7d3',
  counter: '#e9cfae',
  roasts: '#d9b58a',
  menu: '#6b3f26',
  table: '#1c1310',
};

const scenes = gsap.utils.toArray<HTMLElement>('[data-scene]');

function pinned(scene: HTMLElement) {
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: scene,
      start: 'top top',
      end: '+=60%',
      pin: true,
      scrub: true,
    },
  });
  // Keyboard and screen-reader users can focus content the scroll has not revealed yet.
  scene.addEventListener('focusin', () => {
    if (tl.progress() < 1) window.scrollTo({ top: tl.scrollTrigger!.end, behavior: 'instant' });
  });
  return tl;
}

function door(scene: HTMLElement) {
  const tl = pinned(scene);
  tl.fromTo('.door__panel', { scaleX: 1, x: 0, transformOrigin: 'left center' }, { scaleX: 0.18, x: 0, transformOrigin: 'left center', duration: 0.5 }, 0)
    .fromTo('.door__closed', { opacity: 1 }, { opacity: 0, duration: 0.1 }, 0.3)
    .fromTo('.door__open', { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.35)
    .fromTo('.door__steam path', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.3 }, 0.2)
    .fromTo('.door__sun', { y: 40 }, { y: 0, duration: 0.6 }, 0);
}

function counter(scene: HTMLElement) {
  const tl = pinned(scene);
  tl.fromTo('.counter__barista', { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3 }, 0)
    .fromTo('.counter__board', { opacity: 0, scaleY: 0, transformOrigin: 'top center' }, { opacity: 1, scaleY: 1, duration: 0.3 }, 0.1)
    .fromTo('.counter__line', { opacity: 0, x: -12 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.2 }, 0.3);
}

function roasts(scene: HTMLElement) {
  const tl = pinned(scene);
  tl.fromTo('.shelf__title', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.2 }, 0)
    .fromTo('.bag', { y: -140, opacity: 0, rotation: (i) => (i % 2 ? 8 : -8) }, { y: 0, opacity: 1, rotation: 0, stagger: 0.06, duration: 0.35, ease: 'back.out(1.4)' }, 0.05)
    .fromTo('.spill use', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.02, duration: 0.2 }, 0.45)
    .fromTo('.tag', { y: -30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.2 }, 0.6);
}

function menu(scene: HTMLElement) {
  const tl = pinned(scene);
  tl.fromTo('.lamp__glow', { opacity: 0 }, { opacity: 0.35, stagger: 0.1, duration: 0.3 }, 0)
    .fromTo('.menu__title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2 }, 0.2)
    .fromTo('.card', { opacity: 0, y: 80, rotation: -2 }, { opacity: 1, y: 0, rotation: 0, stagger: 0.1, duration: 0.4 }, 0.3);
}

function table(scene: HTMLElement) {
  const tl = pinned(scene);
  tl.fromTo('.table__light', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)
    .fromTo('.table__steam path', { y: 16, opacity: 0 }, { y: 0, opacity: 0.8, stagger: 0.05, duration: 0.3 }, 0.2)
    .fromTo('.receipt', { scaleY: 0, transformOrigin: 'top center' }, { scaleY: 1, duration: 0.3 }, 0.3)
    .fromTo('.receipt__line', { opacity: 0 }, { opacity: 1, stagger: 0.06, duration: 0.15 }, 0.5);
}

const BUILDERS: Record<string, (scene: HTMLElement) => void> = { door, counter, roasts, menu, table };

function backgroundShift() {
  scenes.forEach((scene, i) => {
    const next = scenes[i + 1];
    if (!next) return;
    gsap.fromTo(
      document.body,
      { backgroundColor: SCENE_BG[scene.dataset.scene!] },
      {
        backgroundColor: SCENE_BG[next.dataset.scene!],
        ease: 'none',
        immediateRender: false,
        scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true },
      },
    );
  });
  // Scenes paint their own background in CSS; make them transparent so the body shows through.
  gsap.set(scenes, { backgroundColor: 'transparent' });
}

const mm = gsap.matchMedia();

mm.add(
  {
    desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
    mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
    reduce: '(prefers-reduced-motion: reduce)',
  },
  (context) => {
    const { desktop, mobile, reduce } = context.conditions!;

    if (desktop) {
      scenes.forEach((scene) => BUILDERS[scene.dataset.scene!]?.(scene));
      backgroundShift();
    }

    if (mobile) {
      scenes.forEach((scene) => {
        gsap.from(scene.querySelectorAll('[data-reveal]'), {
          opacity: 0,
          y: 24,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: scene, start: 'top 70%', once: true },
        });
      });
    }

    if (reduce) {
      scenes.forEach((scene) => {
        gsap.from(scene.querySelectorAll('[data-reveal]'), {
          opacity: 0,
          duration: 0.4,
          scrollTrigger: { trigger: scene, start: 'top 80%', once: true },
        });
      });
    }
  },
);
