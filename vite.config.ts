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
        host: '0.0.0.0',
        strictPort: true,
        port: parseInt(process.env.PORT) || 10000,
        hmr: false,
        watch: {
            usePolling: true
        }
    },
    preview: {
        host: '0.0.0.0',
        strictPort: true,
        port: parseInt(process.env.PORT) || 10000,
        allowedHosts: ['javascript-handbook.onrender.com', 'localhost'],
        headers: {
            'Cache-Control': 'public, max-age=31536000, immutable',
            'Connection': 'keep-alive',
            'Keep-Alive': 'timeout=120'
        }
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'terser',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                }
            }
        }
    }
});