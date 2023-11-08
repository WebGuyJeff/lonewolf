/**
 * Import WordPress Webpack config provided by @wordpress/scripts. This way we still get full
 * benefit of the WP defaults while being able to add/override functionality.
 */
const WordPressWebpackConfig = require( '@wordpress/scripts/config/webpack.config.js' )

module.exports = {
	// Include the WP config.
	...WordPressWebpackConfig,
}
