const api = {
	makeCall(api) {
		if (window.Worker) {
			console.log('Web Worker')
			return this.call(api)
		} else {
			console.log('No Worker')
			return this.callMain(api)
		}
	},
	call: greenlet( async (api) => {
		let res = await fetch(api)
		let profile = await res.json()
		return profile
	}),
	callMain: async () => {
		let res = await fetch(api)
		let profile = await res.json()
		return profile
	}
}

export default api