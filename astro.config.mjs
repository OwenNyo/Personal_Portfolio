import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://owennyo.github.io',
  base: '/Personal_Portfolio',
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--font-display',
      weights: [400, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-body',
      weights: [400, 600],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],
});
