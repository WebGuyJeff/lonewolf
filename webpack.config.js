const webpack = require( 'webpack' )
const path = require( 'path' )
const HtmlBundlerPlugin = require( 'html-bundler-webpack-plugin' )
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' )

module.exports = {
	mode: 'development',
	// devtool: 'source-map',
	cache: false,
	output: {
		path: path.join( __dirname, 'assets' ),
	},
	plugins: [
		new HtmlBundlerPlugin( {
			entry: {
				// name: entry point
				'css/frontend': './src/css/frontend.css',
				'css/admin': './src/css/admin.css',
				'css/editor': './src/css/editor.css',
				'js/frontend': './src/js/frontend.js',
				'js/admin': './src/js/admin.js',
				'js/editor': './src/js/editor.js',
			},
			js: {
				// output filename of extracted JS
				filename: '[name].js',
			},
			css: {
				// output filename of extracted CSS
				filename: '[name].css',
			},
		} ),
		new BrowserSyncPlugin( {
			files: [
				'**/*.php',
				'./assets/js/*.(js|jsx)',
				'./assets/css/*.css',
				'!./node_modules',
				'!./vendor*',
				'!./dist',
				'!./src',
				'!./webpack.config.js',
				'!./webpack.zip.config.js',
				'!./package.json',
				'!./package-lock.json',
				'!./composer.json',
				'!./composer.lock',
			],
			// Live WordPress site. WordPress site URL must be set to 'localhost:port'.
			proxy: 'localhost:8001',
			// BrowserSync UI.
			ui: { port: 3001 },
			// browse to http://localhost:3000/ during development.
			port: 3000,
			logLevel: 'debug',
		} ),
	],
	module: {
		rules: [
			// styles
			{
				test: /\.(css|sass|scss)$/,
				use: [ 'css-loader', 'sass-loader' ],
			},
		],
	},
	// enable HMR with live reload
	devServer: {
		static: path.join( __dirname, 'assets' ),
		watchFiles: {
			paths: [ 'src/**/*.*' ],
			options: {
				usePolling: true,
			},
		},
	},
}
