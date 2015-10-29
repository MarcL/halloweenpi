var Gpio = require('onoff').Gpio;

var LedController = function(gpioList) {
	var ledList = [];

	function initialise() {
		gpioList.forEach(function(gpio) {
			ledList.push(new Gpio(gpio, 'out'))
		});
	}

	this.show = function(enable) {
		ledList.forEach(function(led) {
			led.writeSync(enable ? 1 : 0);
		});
	}

	this.shutdown = function() {
		ledList.forEach(function(led) {
			led.unexport();
		});
	}

	initialise();
}

module.exports = LedController;