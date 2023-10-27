/**
 * Import WordPress Webpack config provided by @wordpress/scripts. This way we still get full
 * benefit of the WP defaults while being able to add/override functionality.
 */
const WordPressWebpackConfig = require( '@wordpress/scripts/config/webpack.config.js' )
const path = require( 'path' )
const HtmlBundlerPlugin = require( 'html-bundler-webpack-plugin' )

module.exports = {
	// Include the WP config.
	...WordPressWebpackConfig,
	/*
	 *output: {
	 *	// Relative output for everything.
	 *	path: path.join( __dirname, 'build' ),
	 *},
	 */
	
	module: {
		...WordPressWebpackConfig.module,
		rules: [
			...WordPressWebpackConfig.module.rules,
			{
				test: /\.svg$/,
				use: [ "@svgr/webpack", "url-loader" ]
			}
		]
	},
	
	/*
	 *plugins: [
	 *	...WordPressWebpackConfig.plugins,
	 *	new HtmlBundlerPlugin( {
	 *		entry: path.join( __dirname, '/src/' )
	 *	} )
	 *]
	 */
}
