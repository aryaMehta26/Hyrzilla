import { defineConfig } from 'vite';

export default defineConfig({
  // The redesign is a sibling project; use the repository's existing local Supabase variables.
  envDir: '..',
});
