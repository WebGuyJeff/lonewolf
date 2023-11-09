/**
 * Import WordPress Webpack config provided by @wordpress/scripts. This way we still get full
 * benefit of the WP defaults while being able to add/override functionality.
 */
const wordpressConfig = require( '@wordpress/scripts/config/webpack.config' )

module.exports = {
	// Include the WP config.
	...wordpressConfig,

	module: {
		...wordpressConfig.module,
		rules: [
			...wordpressConfig.module.rules,
			{
				test: /\.svg$/,
				type: 'javascript/auto',
				use: [
					{
						loader: '@svgr/webpack',
						options: {
							svgo: false,
							svgoConfig: {
								plugins: [
									{
										cleanupIDs: false,
										prefixIds: false,
										removeHiddenElems: false,
										removeEmptyContainers: false
									}
								]
							}
					 	}
					},
					{
						loader: 'url-loader'
					}
				],
			}
		]
	}
}
