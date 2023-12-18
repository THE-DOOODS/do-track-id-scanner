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
        'icon512_rounded.png',
        'android-launcher-icon-48-48.png',
        'android-launcher-icon-72-72.png',
        'android-launcher-icon-96-96.png',
        'android-launcher-icon-144-144.png',
        'android-launcher-icon-192-192.png',
        'android-launcher-icon-512-512.png'
      ],
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Do-Track ID Scanner',
        short_name: 'Scanner',
        display: 'standalone',
        description:
          "Do-Track's ID Scanner | Responsible for scanning QR in IDs",
        theme_color: '#AD31C1',
        background_color: '#FFF',
        start_url: '/',
        scope: '/',
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
          },
          {
            src: '/android-launcher-icon-48-48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: '/android-launcher-icon-72-72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: '/android-launcher-icon-96-96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/android-launcher-icon-144-144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/android-launcher-icon-192-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/android-launcher-icon-512-512.png',
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
