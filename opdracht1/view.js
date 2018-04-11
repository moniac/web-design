import api from './api.js'
import settings from './settings.js'
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
			Transparency.render(container, data, directives)
			
	}).then(() => {
		this.tagButtons()
	})
	
	},
	tagButtons() {
		
		const label = document.querySelector('aside svg')
		let newButton = document.createElement('a')
		newButton.className = 'button'
		newButton.innerHTML = '+'
		console.log(newButton)
		
		const cards = document.querySelectorAll('.card')

		cards.forEach((card, i) => {
			let newButton = document.createElement('a')
			newButton.className = 'button'
			newButton.innerHTML = '+'

			newButton.addEventListener('click', () => {
				this.toggleCookie()
				label.style.transform = 'translateY(0)';
			})

			card.insertAdjacentElement('afterbegin', newButton)
			console.log(card, i)
		})
		
		label.addEventListener('click', function(e) {
			this.parentElement.style.transform = 'translateY(0)';
			document.querySelector('body').style.overflowY = 'hidden'
		})
	},
	toggleCookie() {
		localStorage.setItem('label', 'yes')
	}
}

export default view