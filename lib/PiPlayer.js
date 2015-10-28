var Mp3Player = require('./Mp3Player');
var Gpio = require('onoff').Gpio;
var logger = require('./logger');

function randomFromArray(array) {
	var randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

function PiPlayer(options) {

	logger.info('Initialised...');

	var isPlaying = false;
	var triggerButton = new Gpio(options.buttonGpio, 'in', 'both');
	var led = new Gpio(options.ledGpio, 'out');

	var player = new Mp3Player();

	function enableLed(enabled) {
		led.writeSync(enabled ? 1 : 0);
	}

	function playRandomMp3() {
		var randomMp3 = randomFromArray(options.soundFiles);
		logger.info('Playing mp3.', randomMp3);

		isPlaying = true;
		enableLed(true);
		player.play(randomMp3, function(playbackError) {
			if (playbackError) {
				logger.error('Error playing Mp3.', playbackError);
			}
			logger.info('Finished mp3.', randomMp3);

			isPlaying = false;
			enableLed(false);
		});
	}

	triggerButton.watch(function(error, value) {
		if (error) {
			logger.error('Error triggering button.', error);
			return;
		}

		if (value === 1) {
			if (isPlaying) {
				logger.warn('Not starting Mp3. Already playing.');
				return;
			}

			playRandomMp3();
		}
	})

	process.on('SIGINT', function() {
		led.unexport();
		triggerButton.unexport();

		logger.info('Shutdown...');
		process.exit();
	});
}

module.exports = PiPlayer;
