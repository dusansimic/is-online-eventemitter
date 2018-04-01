const EventEmitter = require('events');
const isOnline = require('is-online');

class IsOnline extends EventEmitter {
	/**
	 * Initialize object
	 * @param {Object} options Option
	 * @param {Number} options.timeout Timeout
	 * @param {String} options.version Protocol version
	 * @param {Boolean} options.initialState Initial state for connectivity
	 */
	constructor(options) {
		super();
		let timeout = (options && options.timeout) ? options.timeout : 5000;
		let version = (options && options.version) ? options.version : 'v4';
		let lastState = (options && options.initialState) ? options.initialState : false;
		setInterval(async () => {
			isOnline({
				timeout,
				version
			}).then(online => {
				if (online !== lastState && online) {
					this.emit('online');
				} else if (online !== lastState && !online) {
					this.emit('offline');
				}
				lastState = online;
			});
		}, timeout);
	}
}

module.exports = IsOnline;
