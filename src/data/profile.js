// Hero photos. Two or more and the polaroid cycles on click.
import owen from '../assets/me/owen.jpg';

export const profile = {
  handle: '@owennyowy',
  eyebrow: 'singapore / year 4 software engineering / SIT',
  greeting: "hi! i'm Owen,",
  taglines: ['a coffee lover', 'a baker', 'a gamer'],
  intro: 'welcome to my portfolio, freshly brewed.',
  photos: [{ src: owen, alt: 'Owen smiling in a light green t-shirt' }],
  photoCaption: 'me, post-coffee ☕',
  links: {
    email: 'mailto:owennyowy@gmail.com',
    github: 'https://github.com/OwenNyo',
    linkedin: 'https://www.linkedin.com/in/owen-nyo/',
    resume: `${import.meta.env.BASE_URL}resume.pdf`,
  },
};
