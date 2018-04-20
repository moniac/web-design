module.exports = {
	plugins: [
		require('postcss-import'),
		require('postcss-nesting'),
		require('postcss-custom-media'),
		require('postcss-cssnext')({
			browsers: ['ie >= 8'],
			features: {
				rem: true,
				customProperties: {
					strict: false,
					warnings: false,
					preserve: true
				}
			}
		}),
		require('postcss-discard-comments')({
			discardComments: {
				removeAll: true
			}
		})
	]
}
