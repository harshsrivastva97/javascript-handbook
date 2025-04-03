import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Force HTTPS for all assets and requests
const forceHttps = process.env.VITE_FORCE_HTTPS === 'true';

export default defineConfig({
    plugins: [
        react(),
        // Plugin to ensure HTTPS usage in production
        {
            name: 'force-https',
            apply: 'build',
            enforce: 'post',
            transformIndexHtml(html) {
                if (forceHttps) {
                    // Add meta tag to force HTTPS
                    return html.replace(
                        /<head>/i,
                        `<head>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <script>
        if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost') {
            window.location.href = window.location.href.replace('http:', 'https:');
        }
    </script>`
                    );
                }
                return html;
            }
        }
    ],
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
        allowedHosts: ['localhost', 'javascript-handbook.onrender.com', 'javascript-handbook.com'],
        headers: {
            'Cache-Control': 'public, max-age=31536000, immutable',
            'Connection': 'keep-alive',
            'Keep-Alive': 'timeout=120',
            'Content-Security-Policy': "frame-ancestors 'self' https: *.javascript-handbook.com *.onrender.com; upgrade-insecure-requests;"
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