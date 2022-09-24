import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    plugins: [
        svelte(),
        VitePWA({
            filename: 'worker.js',
            manifestFilename: 'manifest.json',
            manifest: {
                icons: [{
                    src: '192x192.png',
                    sizes: '192x192',
                    type: 'image/png'
                }, {
                    src: '512x512.png',
                    sizes: '512x512',
                    type: 'image/png'
                }],
                background_color: '#000',
                theme_color: '#000',
            }
        }),
    ]
});
