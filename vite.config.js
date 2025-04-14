import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		proxy: {
			'/api/ssu': {
				target: 'https://smartid.ssu.ac.kr', // 백엔드 주소
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api\/ssu/, '/Symtra_sso'),
			},
		},
	},
});
