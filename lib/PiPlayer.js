var Mp3Player 		= require('./Mp3Player');
var LedController 	= require('./LedController');
var Gpio 			= require('onoff').Gpio;
var logger 			= require('./logger');

function PiPlayer(options) {
	logger.info('Initialised...');

	var isPlaying = false;
	var lastRandomIndex = -1;
	var triggerButton = new Gpio(options.buttonGpio, 'in', 'both');
	var ledController = new LedController(options.leds);

	var player = new Mp3Player();

	function randomFromArray(array) {
		var randomIndex = 0;
		do {
			randomIndex = Math.floor(Math.random() * array.length);
		} while (randomIndex === lastRandomIndex);
		lastRandomIndex = randomIndex;

		return array[randomIndex];
	}

	function playRandomMp3() {
		var randomMp3 = randomFromArray(options.soundFiles);
		logger.info('Playing mp3.', randomMp3);

		isPlaying = true;
		ledController.show(true);
		player.play(randomMp3, function(playbackError) {
			if (playbackError) {
				logger.error('Error playing Mp3.', playbackError);
			}
			logger.info('Finished mp3.', randomMp3);

			isPlaying = false;
			ledController.show(false);
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
		ledController.shutdown();
		triggerButton.unexport();

		logger.info('Shutdown...');
		process.exit();
	});
}

module.exports = PiPlayer;
