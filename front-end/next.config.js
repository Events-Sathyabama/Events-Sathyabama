/** @type {import('next').NextConfig} */

const REMOVE_CONSOLE_LOG = false;

const nextConfig = {
	webpack: (
		config,
		{buildId, dev, isServer, defaultLoaders, nextRuntime, webpack}
	) => {
		// Important: return the modified config
		config.resolve = {
			...config.resolve,
			preferRelative: true,
		};
		return config;
	},
	experimental: {
		appDir: true,
		esmExternals: 'loose',
		forceSwcTransforms: true,
	},
	compiler: {
		removeConsole: REMOVE_CONSOLE_LOG ? {exclude: ['error']} : false,
	},
	distDir: 'build',
};

module.exports = nextConfig;
