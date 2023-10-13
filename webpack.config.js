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
				'assets/css/frontend': path.join( __dirname, '/src/css/frontend.css' ),
				'assets/css/admin': path.join( __dirname, '/src/css/admin.css' ),
				'assets/css/editor': path.join( __dirname, '/src/css/editor.css' ),
				'assets/js/frontend': path.join( __dirname, '/src/js/frontend.js' ),
				'assets/js/admin': path.join( __dirname, '/src/js/admin.js' ),
				'assets/js/editor': path.join( __dirname, '/src/js/editor.js' ),
				/*
				 *'plugins/blocks/hero-punch/build/style': path.join( __dirname, '/plugins/blocks/hero-punch/src/style.scss' ),
				 *'plugins/blocks/hero-punch/build/editor': path.join( __dirname, '/plugins/blocks/hero-punch/src/editor.scss' ),
				 *'plugins/blocks/hero-punch/build/index': path.join( __dirname, '/plugins/blocks/hero-punch/src/index.jsx' ),
				 *'plugins/blocks/hero-punch/build/components/svg/svg': path.join( __dirname, '/plugins/blocks/hero-punch/src/svg/svg.js' ),
				 */
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
