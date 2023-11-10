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
							svgo: true,
							svgoConfig: {
								plugins: [
									{
										name: 'removeViewBox',
										active: false
									},
									{
										name: 'cleanupIds',
										active: false
									},
									{
										name: 'prefixIds',
										active: false
									},
									{
										name: 'removeHiddenElems',
										active: false
									},
									{
										name: 'removeEmptyContainers',
										active: false
									},
									{
										name: 'mergePaths',
										active: false
									},
									{
										name: 'convertPathData',
										active: false
									},
									{
										name: 'convertTransform',
										active: false
									},
									{
										name: 'cleanupNumericValues',
										active: false
									}
								]
							}
					 	}
					},
					{
						loader: 'url-loader'
					}
				]
			}
		]
	}
}
