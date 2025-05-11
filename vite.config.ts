import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import { VitePWA } from "vite-plugin-pwa"

// https://vite.dev/config/
export default defineConfig({
	base: "https://github.com/gabriellaarchibong/Task-Manager-App",
  	plugins: [react(),
		tailwindcss(),
		VitePWA({
			devOptions: {
				enabled: true
			},
			strategies: "injectManifest",
			srcDir: "src",
			filename: "sw.ts",
			registerType: "autoUpdate",
			injectManifest: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg}'], 
				maximumFileSizeToCacheInBytes: 3000000

			},
			manifest:{
				name: "Task manager",
				short_name: "Tickit",
				icons: [
					{
					"src": "/pwa-192x192.png",
					"sizes": "192x192",
					"type": "image/png",
					"purpose": "any"
					},
					{
					"src": "/pwa-512x512.png",
					"sizes": "512x512",
					"type": "image/png",
					"purpose": "any"
					},
					{
					"src": "/pwa-maskable-192x192.png",
					"sizes": "192x192",
					"type": "image/png",
					"purpose": "maskable"
					},
					{
					"src": "/pwa-maskable-512x512.png",
					"sizes": "512x512",
					"type": "image/png",
					"purpose": "maskable"
					}
				],
				start_url: '/',
				orientation: "portrait",
				description: "A simple and efficient task manager app to help you organize, track, and complete your daily tasks with ease.",
				display: "standalone",
				theme_color:"#ffffff",
				background_color: "#ffffff",
			}
		})
    ],
 
})

