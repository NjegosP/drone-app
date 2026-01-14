import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
    plugins: [react(), tailwindcss(), svgr(), cssInjectedByJsPlugin()],
    build: {
        emptyOutDir: false,
        lib: {
            entry: 'lib/index.ts',
            name: 'IdentityVerificationSDK',
            formats: ['es'],
            fileName: 'index',
        },
        cssCodeSplit: false,
        rollupOptions: {
            external: ['react', 'react-dom', 'react-hook-form', 'react-webcam'],
        },
    },
    resolve: {
        alias: {
            '@/assets': path.resolve(__dirname, './assets'),
        },
    },
});
