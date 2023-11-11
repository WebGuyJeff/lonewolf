const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' )
// @wordpress/scripts config.
const wordpressConfig = require( '@wordpress/scripts/config/webpack.config' )
// @wordpress/scripts helper which generates entry points from any '**/block.json' in 'src'.
const { getWebpackEntryPoints } = require( '@wordpress/scripts/utils/config' )

// See svgo.config.js to configure SVG manipulation.

module.exports = {
	...wordpressConfig,
	entry: {
		...getWebpackEntryPoints(),
		// 'exampleOutputFilename': path.resolve( process.cwd(), 'path/to/dir', 'exampleEntrypoint.js' ),
	},
	plugins: [
		...wordpressConfig.plugins,
		new BrowserSyncPlugin( {
			// Live WordPress site. Using IP breaks it.
			proxy: 'localhost:8001',
			// BrowserSync UI.
			ui: { port: 3001 },
			// Dev port on localhost.
			port: 3000,
			logLevel: 'debug',
			// Webpack handles reloads.
			reload: false,
			browser: "google-chrome-stable"
		} ),
	],
	// HMR with live reload.
	devServer: {
		watchFiles: {
			paths: [
				'src/**',
				'classes/**',
				'patterns/**',
				'parts/**',
				'templates/**',
			]
		}
	}
}
