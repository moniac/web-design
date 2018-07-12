import api from './api.js';
import settings from './settings.js';
console.log(Transparency);

const view = {
	getPopular() {
		let data;
		let container = document.getElementById('template-list');
		api
			.makeCall(
				`https://api.themoviedb.org/3/discover/movie?api_key=b4cde943f66be1a3b6665faa21d56e3b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
			)
			.then(res => {
				data = res.results;
				const directives = {
					poster_path: {
						src() {
							return `https://image.tmdb.org/t/p/w500/${
								this.poster_path
							}`;
						}
					}
				};
				Transparency.render(container, data, directives);
			})
			.then(() => {
				this.tagButtons();
			});
	},
	tagButtons() {
		const label = document.querySelector('aside svg');
		const close = document.querySelector('.close')
		let newButton = document.createElement('a');
		newButton.className = 'button';
		newButton.innerHTML = '+';
		console.log(newButton);

		const cards = document.querySelectorAll('.card');

		cards.forEach((card, i) => {
			let newButton = document.createElement('a');
			newButton.className = 'button';
			newButton.innerHTML = '+';

			newButton.addEventListener('click', (e) => {
				this.toggleCookie();
				label.style.transform = 'translateY(0)';
				e.target.parentElement.style.opacity = '0.5'
				e.target.innerHTML = '✓'
				e.target.style.background = 'green'
			});

			card.insertAdjacentElement('afterbegin', newButton);
		});

		label.addEventListener('click', function(e) {
			this.parentElement.style.transform = 'translateY(0)';
			document.querySelector('body').style.overflowY = 'hidden';
		});

		close.addEventListener('click', function(e) {
			this.parentElement.style.transform = 'translateY(-100%)';
			document.querySelector('body').style.overflowY = 'scroll';
		});
	},
	toggleCookie() {
		localStorage.setItem('label', 'yes');
	}
};

export default view;
