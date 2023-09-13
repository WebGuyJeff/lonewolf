const path = require( 'path' )
const CopyPlugin = require( 'copy-webpack-plugin' )
const ZipPlugin = require( 'zip-webpack-plugin' )

module.exports = () => {
	return {
		entry: {},
		output: {
			path: path.resolve( __dirname, `dist` ),
		},
		plugins: [
			new CopyPlugin( {
				patterns: [
					{
						from: './**',
						to: './lonewolf',
						globOptions: {
							dot: false,
							gitignore: false,
							ignore: [
								'**/node_modules/**',
								'**/src/**',
								'**/vendor/**',
								'**/vendor-wpcs-php8-bugfix/**',
								'**/dist/**',
								'**/*.env',
								'**/.eslintrc.json',
								'**/composer.*',
								'**/package*.json',
								'**/*.code-workspace',
								'**/webpack.*',
								'**/*.zip',
							],
						},
					},
				],
			} ),
			new ZipPlugin( {
				// Defaults to the Webpack output path.
				path: './',
				filename: 'lonewolf.zip',
				extension: 'zip',
				pathPrefix: '',
				fileOptions: {
					mtime: new Date(),
					mode: 0o100664,
					compress: true,
					forceZip64Format: false,
				},
				zipOptions: {
					forceZip64Format: false,
				},
			} ),
		],
	}
}
