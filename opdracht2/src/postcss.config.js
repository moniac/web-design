module.exports = {
	plugins: [
		require('postcss-import'),
		require('postcss-nesting'),
		require('postcss-cssnext')({
			browsers: ['ie >= 8'],
			features: {
				rem: true,
				customProperties: {
					strict: true,
					warnings: true,
					preserve: true
				}
			}
		}),
		require('postcss-discard-comments')({
			discardComments: {
				removeAll: true
			}
		}),
		require('cssnano')({
			autoprefixer: false
		})
	]
}
