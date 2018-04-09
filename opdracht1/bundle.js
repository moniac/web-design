(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var api = {
	makeCall: function makeCall(api) {
		if (window.Worker) {
			console.log('Web Worker');
			return this.call(api);
		} else {
			console.log('No Worker');
			return this.callMain(api);
		}
	},

	call: greenlet(function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(api) {
			var res, profile;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return fetch(api);

						case 2:
							res = _context.sent;
							_context.next = 5;
							return res.json();

						case 5:
							profile = _context.sent;
							return _context.abrupt('return', profile);

						case 7:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined);
		}));

		return function (_x) {
			return _ref.apply(this, arguments);
		};
	}()),
	callMain: function () {
		var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
			var res, profile;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.next = 2;
							return fetch(api);

						case 2:
							res = _context2.sent;
							_context2.next = 5;
							return res.json();

						case 5:
							profile = _context2.sent;
							return _context2.abrupt('return', profile);

						case 7:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, undefined);
		}));

		function callMain() {
			return _ref2.apply(this, arguments);
		}

		return callMain;
	}()
};

exports.default = api;

},{}],2:[function(require,module,exports){
'use strict';

var _view = require('./view.js');

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_view2.default.getPopular();

},{"./view.js":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _api = require('./api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(Transparency);

var view = {
	getPopular: function getPopular() {
		var data = void 0;
		var container = document.getElementById('template-list');
		_api2.default.makeCall('https://api.themoviedb.org/3/discover/movie?api_key=b4cde943f66be1a3b6665faa21d56e3b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1').then(function (res) {
			data = res.results;
			var directives = {
				poster_path: {
					src: function src() {
						return 'https://image.tmdb.org/t/p/w500/' + this.poster_path;
					}
				}
			};
			console.log(data);
			Transparency.render(container, data, directives);
		});
	}
};

exports.default = view;

},{"./api.js":1}]},{},[2]);
