import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://curioushistory.net',
  integrations: [tailwind({ applyBaseStyles: false })],
});
