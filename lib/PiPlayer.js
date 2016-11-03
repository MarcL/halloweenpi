var Mp3Player 		= require('./Mp3Player');
var logger 			= require('./logger');

function PiPlayer(options) {
	logger.info('Initialised...');

	var isPlaying = false;
	var lastRandomIndex = -1;
	var randomSoundEffectTimer;

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
		player.play(randomMp3, function(playbackError) {
			if (playbackError) {
				logger.error('Error playing Mp3.', playbackError);
			}
			logger.info('Finished mp3.', randomMp3);

			isPlaying = false;
			playSoundEffectAtRandomTime();
		});
	}

	function playSoundEffectAtRandomTime() {
		var minTimeSecs = 15;
		var maxTimeSecs = 40;
		var randomTimeoutSecs = Math.floor(Math.random() * (maxTimeSecs - minTimeSecs + 1) + minTimeSecs);
		randomSoundEffectTimer = setTimeout(playRandomMp3, randomTimeoutSecs * 1000);
	}

	playSoundEffectAtRandomTime();

	process.on('SIGINT', function() {
		logger.info('Shutdown...');
		clearTimeout(randomSoundEffectTimer);
		process.exit();
	});
}

module.exports = PiPlayer;
