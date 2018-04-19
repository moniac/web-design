module.exports = {
	plugins: [
		require('postcss-import'),
		require('postcss-nesting'),
		require('postcss-uncss')({
			html: ['./src/*.html']
		}),
		require('postcss-custom-properties'),
		require('postcss-cssnext')({
			browsers: ['ie >= 8'],
			features: {
				rem: true,
				customProperties: {
					strict: false,
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
