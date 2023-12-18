import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
        'icon512_maskable.png',
        'icon512_rounded.png'
      ],
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Do-Track ID Scanner',
        short_name: 'Scanner',
        display: 'standalone',
        theme_color: '#AD31C1',
        background_color: '#FFF',
        start_url: '/',
        icons: [
          {
            purpose: 'maskable',
            src: '/icon512_maskable.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            purpose: 'rounded',
            src: '/icon512_rounded.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  }
});
