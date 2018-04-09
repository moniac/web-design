import api from './api.js'
console.log(Transparency)

const view = {
	getPopular() {
		let data
		let container = document.getElementById('template-list')
		api.makeCall(`https://api.themoviedb.org/3/discover/movie?api_key=b4cde943f66be1a3b6665faa21d56e3b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`).then((res) => {
			data = res.results
			const directives = {
				poster_path: {
					src() {
						return `https://image.tmdb.org/t/p/w500/${this.poster_path}`
					}
				}
			}
			console.log(data)
			Transparency.render(container, data, directives)
	})
	}
}

export default view