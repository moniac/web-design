const api = {
	makeCall(api) {
		if (window.Worker && window.greenlet) {
			console.log('Web Worker')
			return this.call(api)
		} else {
			greenlet = null
			console.log('No Worker')
			return this.callMain(api)
		}
	},
	call: greenlet( async (api) => {
		let res = await fetch(api)
		let data = await res.json()
		return data
	}),
	callMain: async () => {
		let res = await fetch(api)
		let data = await res.json()
		return data
	}
}

export default api