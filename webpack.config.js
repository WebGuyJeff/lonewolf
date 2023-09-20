const path = require( 'path' )
const HtmlBundlerPlugin = require( 'html-bundler-webpack-plugin' )
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' )
const ImageMinimizerPlugin = require( "image-minimizer-webpack-plugin" )

module.exports = {
	// stats: 'verbose',
	
	// devtool: 'source-map',
	output: {
		// Relative output for everything.
		path: path.join( __dirname, '' ),
	},
	/*
	 *  SVG entry.
	 * entry: path.join( __dirname, '/src/svg/svg.js' ),
	 */
	module: {
		rules: [
			{
				test: /\.(css|sass|scss)$/,
				use: [ 'css-loader', 'sass-loader' ],
			},
			/*
			 *{
			 *	// SVG output.
			 *	test: /\.(css|sass|scss|svg|js)$/,
			 *	type: "asset/resource",
			 *	loader: 'file-loader',
			 *	options: {
			 *		outputPath: ( url, resourcePath, context ) => path.relative( context, resourcePath ).replace( 'src/', 'assets/' ),
			 *	}
			 *},
			 */
		],
	},
	plugins: [
		new HtmlBundlerPlugin( {
			loaderOptions: {
			},
			entry: {
				// "name: entry point". The [name] forms the output string and therefore filepath.
				'css/frontend': path.join( __dirname, '/src/css/frontend.css' ),
				'css/admin': path.join( __dirname, '/src/css/admin.css' ),
				'css/editor': path.join( __dirname, '/src/css/editor.css' ),
				'js/frontend': path.join( __dirname, '/src/js/frontend.js' ),
				'js/admin': path.join( __dirname, '/src/js/admin.js' ),
				'js/editor': path.join( __dirname, '/src/js/editor.js' ),
			},
			js: {
				// JS output.
				filename: 'assets/[name].js',
			},
			css: {
				// CSS output.
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
	optimization: {
		minimizer: [
			new ImageMinimizerPlugin( {
				include: /\/src\/svg/,
				minimizer: {
					implementation: ImageMinimizerPlugin.svgoMinify,
					options: {
						encodeOptions: {
							multipass: true,
							plugins: [
								'cleanupListOfValues',
								'removeRasterImages',
								'removeScriptElement',
								'removeXMLNS',
								{
									name: "preset-default",
									params: {
										overrides: {
											removeViewBox: false,
										},
									},
								},
								{
									name: "removeAttrs",
									params: {
										attrs: 'display'
									},
								},
							],
						},
					},
				},
			} ),
		],
	},
}
