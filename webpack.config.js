const path = require( 'path' )
const HtmlBundlerPlugin = require( 'html-bundler-webpack-plugin' )
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' )

module.exports = {
	// devtool: 'source-map',
	cache: false,
	output: {
		path: path.join( __dirname, '' ),
	},
	module: {
		rules: [
			// styles preprocessors.
			{
				test: /\.(css|sass|scss)$/,
				use: [ 'css-loader', 'sass-loader' ],
			},
		],
	},
	plugins: [
		new HtmlBundlerPlugin( {
			entry: {
				// name: entry point.
				'css/frontend': './src/css/frontend.css',
				'css/admin': './src/css/admin.css',
				'css/editor': './src/css/editor.css',
				'js/frontend': './src/js/frontend.js',
				'js/admin': './src/js/admin.js',
				'js/editor': './src/js/editor.js',
			},
			js: {
				// output filename of extracted JS.
				filename: 'assets/[name].js',
			},
			css: {
				// output filename of extracted CSS.
				filename: 'assets/[name].css',
			},
		} ),
		new BrowserSyncPlugin( {
			// Live WordPress site. Use'localhost' as IP seems to break it.
			proxy: 'localhost:8001',
			// BrowserSync UI.
			ui: { port: 3001 },
			// browse to http://localhost:3000/ during development.
			port: 3000,
			logLevel: 'debug',
			// let Webpack Dev Server take care of reloading the page.
			reload: false
		} ),
	],
	// enable HMR with live reload.
	devServer: {
		watchFiles: {
			paths: [
				'src/**',
				'classes/**',
				'patterns/**',
				'parts/**',
				'templates/**',
			]
		},
	},
}
