var SoundPlayer = require('./SoundPlayer');
var Gpio = require('onoff').Gpio;

function randomFromArray(array) {
	var randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

function PiPlayer(soundFiles, buttonGpio, ledGpio) {
	console.log('Initialised...');
	var isPlaying = false;
	var triggerButton = new Gpio(buttonGpio, 'in', 'both');
	var led = new Gpio(ledGpio, 'out');

	var player = new SoundPlayer();
	var randomSound = randomFromArray(soundFiles);

	function enableLed(enabled) {
		led.writeSync(enabled ? 1 : 0);
	}

	triggerButton.watch(function(error, value) {
		if (error) {
			console.log(error);
			return;
		}

		if ((value === 1) && !isPlaying) {
			enableLed(true);
			console.log('Playing : ' + randomSound);
			isPlaying = true;
			player.play(randomSound, function(playbackError) {
				console.log('Finished : ' + randomSound);
				if (playbackError) {
					console.log(playbackError);
				}
				isPlaying = false;
				enableLed(false);
			});
		}
	})

	process.on('SIGINT', function() {
		led.unexport();
		triggerButton.unexport();

		console.log('Shutdown...');
		process.exit();
	});
}

module.exports = PiPlayer;

