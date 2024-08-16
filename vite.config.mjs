import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 'https://md-frontend.up.railway.app', // or any port you prefer
  },
  resolve: {
    alias: {
      '@': '/src', // Update according to your alias setup
    },
  },
});
