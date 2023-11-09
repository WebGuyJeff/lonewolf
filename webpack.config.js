const path = require( 'path' )
const HtmlBundlerPlugin = require( 'html-bundler-webpack-plugin' )
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' )
const ImageMinimizerPlugin = require( "image-minimizer-webpack-plugin" )
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' )
// const ESLintPlugin = require( 'eslint-webpack-plugin' )


module.exports = {
	stats: 'normal', // normal || verbose.
	externals: /^@wordpress\/.*/, // Do no bundle external @imports.
	output: {
		// Relative output for everything.
		path: path.join( __dirname, '' ),
	},
	module: {
		rules: [
			{
				test: /\.(css|sass|scss)$/,
				use: [ 'css-loader', 'sass-loader' ],
			},
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				use: [ { loader: '@svgr/webpack', options: {} } ],
			},
			{
				test: /\.(jsx|js)$/,
				include: path.resolve( __dirname, '' ),
				exclude: /node_modules/,
				use: [ 'babel-loader' ]
			}
		],
	},
	plugins: [
		/*
		 *new ESLintPlugin( {
		 *	formatter: require.resolve( 'react-dev-utils/eslintFormatter' ),
		 *	useEslintrc: true,
		 *	emitWarning: false
		 *} ),
		 */
		new DependencyExtractionWebpackPlugin(
			{
				outputFormat: 'json',
				outputFilename: 'depends.json',
			}
		),
		new HtmlBundlerPlugin( {
			entry: {
				// "name: entry point". The [name] forms the output string and therefore filepath.
				'assets/css/lonewolf': path.join( __dirname, '/src/css/lonewolf.scss' ),
				'assets/css/lonewolf-admin': path.join( __dirname, '/src/css/lonewolf-admin.scss' ),
				'assets/css/lonewolf-editor': path.join( __dirname, '/src/css/lonewolf-editor.scss' ),
				'assets/js/lonewolf': path.join( __dirname, '/src/js/lonewolf' ),
				'assets/js/lonewolf-admin': path.join( __dirname, '/src/js/lonewolf-admin' ),
				'assets/js/lonewolf-editor': path.join( __dirname, '/src/js/lonewolf-editor' ),
			},
			js: {
				// JS output.
				filename: '[name].js',
			},
			css: {
				// CSS output.
				filename: '[name].css',
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
			reload: false,
			browser: "google-chrome-stable"
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
