import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	return {
		plugins: [react()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
		server: {
			proxy: {
				'/api/ssu': {
					target: env.VITE_SSU_PROXY_TARGET,
					changeOrigin: true,
					secure: false,
					rewrite: (path) => path.replace(/^\/api\/ssu/, '/Symtra_sso'),
				},
			},
		},
	};
});
