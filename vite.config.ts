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
});