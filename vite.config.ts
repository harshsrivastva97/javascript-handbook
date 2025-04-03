import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    publicDir: 'public',
    resolve: {
        alias: { '@': path.resolve(__dirname, './src') },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/index.scss" as *;`,
            },
        },
        postcss: {
            plugins: [require('tailwindcss'), require('autoprefixer')],
        },
    },
    server: {
        host: true, // Needed for the Docker Container port mapping to work
        strictPort: true,
        port: parseInt(process.env.PORT) || 3000, // This is the port Render will use
    },
    preview: {
        host: true,
        strictPort: true,
        port: parseInt(process.env.PORT) || 3000,
        allowedHosts: ['javascript-handbook.onrender.com', 'localhost']
    }
});