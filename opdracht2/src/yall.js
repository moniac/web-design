'use strict'
var l =
		Object.assign ||
		function(e) {
			for (var t = 1; t < arguments.length; t++) {
				var o = arguments[t]
				for (var r in o)
					Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r])
			}
			return e
		},
	u =
		'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
			? function(e) {
					return typeof e
			  }
			: function(e) {
					return e &&
						'function' == typeof Symbol &&
						e.constructor === Symbol &&
						e !== Symbol.prototype
						? 'symbol'
						: typeof e
			  },
	d = function(e, t) {
		if ('IMG' === e.tagName) {
			var o = e.parentNode
			if ('PICTURE' === o.tagName)
				for (var r in ([].slice
					.call(o.querySelectorAll('source'))
					.forEach(function(e) {
						for (var t in e.dataset)
							e.setAttribute(t, e.dataset[t]),
								e.removeAttribute('data-' + t)
					}),
				e.dataset))
					e.setAttribute(r, e.dataset[r]),
						e.removeAttribute('data-' + r)
			else {
				var n = new Image()
				if (
					(void 0 !== e.dataset.srcset &&
						(n.srcset = e.dataset.srcset),
					(n.src = e.dataset.src),
					!0 === t.asyncDecodeSupport)
				)
					n.decode().then(function() {
						;(n.alt = e.alt),
							(n.width = e.width),
							(n.height = e.height),
							e.replaceWith(n)
					})
				else
					for (var a in e.dataset)
						e.setAttribute(a, e.dataset[a]),
							e.removeAttribute('data-' + a)
			}
		}
		'VIDEO' === e.tagName &&
			([].slice.call(e.querySelectorAll('source')).forEach(function(e) {
				for (var t in e.dataset)
					e.setAttribute(t, e.dataset[t]),
						e.removeAttribute('data-' + t)
			}),
			e.load()),
			'IFRAME' === e.tagName &&
				((e.src = e.dataset.src), e.removeAttribute('data-src'))
	},
	yall = function(e) {
		var r = {
				intersectionObserverSupport:
					'IntersectionObserver' in window &&
					'IntersectionObserverEntry' in window &&
					'intersectionRatio' in
						window.IntersectionObserverEntry.prototype,
				mutationObserverSupport: 'MutationObserver' in window,
				idleCallbackSupport: 'requestIdleCallback' in window,
				asyncDecodeSupport: 'decode' in new Image(),
				eventsToBind: [
					[document, 'scroll'],
					[document, 'touchmove'],
					[window, 'resize'],
					[window, 'orientationchange']
				]
			},
			t = {
				lazyClass: 'lazy',
				throttleTime: 200,
				idlyLoad: !1,
				idleLoadTimeout: 100,
				threshold: 200,
				observeChanges: !1,
				observeRootSelector: 'body',
				mutationObserverOptions: { childList: !0 }
			},
			n = 'object' === (void 0 === e ? 'undefined' : u(e)) ? l(t, e) : t,
			o =
				'img.' +
				n.lazyClass +
				',video.' +
				n.lazyClass +
				',iframe.' +
				n.lazyClass,
			a = { timeout: n.idleLoadTimeout },
			i = [].slice.call(document.querySelectorAll(o))
		if (!0 === r.intersectionObserverSupport) {
			var s = new IntersectionObserver(
				function(e, o) {
					e.forEach(function(e) {
						var t = e.target
						!0 === e.isIntersecting &&
							(!0 === n.idlyLoad && !0 === r.idleCallbackSupport
								? requestIdleCallback(function() {
										d(t, r)
								  }, a)
								: d(t, r),
							t.classList.remove(n.lazyClass),
							o.unobserve(t),
							(i = i.filter(function(e) {
								return e !== t
							})))
					})
				},
				{ rootMargin: n.threshold + 'px 0%' }
			)
			i.forEach(function(e) {
				return s.observe(e)
			})
		} else {
			var c = function yallBack() {
				var e = !1
				!1 === e &&
					0 < i.length &&
					((e = !0),
					setTimeout(function() {
						i.forEach(function(t) {
							t.getBoundingClientRect().top <=
								window.innerHeight + n.threshold &&
								t.getBoundingClientRect().bottom >=
									-n.threshold &&
								'none' !== getComputedStyle(t).display &&
								(!0 === n.idlyLoad &&
								!0 === r.idleCallbackSupport
									? requestIdleCallback(function() {
											d(t, r)
									  }, a)
									: d(t, r),
								t.classList.remove(n.lazyClass),
								(i = i.filter(function(e) {
									return e !== t
								})))
						}),
							(e = !1),
							0 === i.length &&
								!1 === n.observeChanges &&
								r.eventsToBind.forEach(function(e) {
									return e[0].removeEventListener(
										e[1],
										yallBack
									)
								})
					}, n.throttleTime))
			}
			r.eventsToBind.forEach(function(e) {
				return e[0].addEventListener(e[1], c)
			})
		}
		!0 === r.mutationObserverSupport &&
			!0 === n.observeChanges &&
			new MutationObserver(function(e) {
				e.forEach(function(e) {
					;[].slice
						.call(document.querySelectorAll(o))
						.forEach(function(e) {
							;-1 === i.indexOf(e) &&
								(i.push(e),
								!0 === r.intersectionObserverSupport
									? s.observe(e)
									: c())
						})
				})
			}).observe(
				'body' === n.observeRootSelector
					? document.body
					: document.querySelector(n.observeRootSelector),
				n.mutationObserverOptions
			)
	}