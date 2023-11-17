const path = require( 'path' )
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' )
// @wordpress/scripts config.
const wordpressConfig = require( '@wordpress/scripts/config/webpack.config' )
// @wordpress/scripts helper which generates entry points from any '**/block.json' in 'src'.
const { getWebpackEntryPoints } = require( '@wordpress/scripts/utils/config' )

// See svgo.config.js to configure SVG manipulation.

module.exports = {
	...wordpressConfig,
	entry: {
		// Everything outputs to build/.
		...getWebpackEntryPoints(),
		// 'example/output': 'path/to/dir/entrypoint.js',
		'css/lonewolf': path.join( __dirname, '/src/css/lonewolf.scss' ),
		'css/lonewolf-admin': path.join( __dirname, '/src/css/lonewolf-admin.scss' ),
		'css/lonewolf-editor': path.join( __dirname, '/src/css/lonewolf-editor.scss' ),
		'css/lonewolf-dev': path.join( __dirname, '/src/css/lonewolf-dev.scss' ),
		'js/lonewolf': path.join( __dirname, '/src/js/lonewolf' ),
		'js/lonewolf-admin': path.join( __dirname, '/src/js/lonewolf-admin' ),
		'js/lonewolf-editor': path.join( __dirname, '/src/js/lonewolf-editor' ),
		// Legacy support for old page until migration to blocks is complete.
		'css/old': path.join( __dirname, '/src/css/old.scss' ),
		'js/old': path.join( __dirname, '/src/js/old' ),
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
				'./theme.json'
			]
		}
	}
}
