var SoundPlayer = require('./lib/SoundPlayer');

console.log('Initialised...');

var player = new SoundPlayer();
var soundFiles = [
  './assets/test.mp3'
];

var randomIndex = Math.floor(Math.random() * soundFiles.length);
var randomSound = soundFiles[randomIndex];

console.log('Playing : ' + randomSound);
player.play(randomSound, function(error) {
  console.log('Finished : ' + randomSound);
  console.log(error);
});

console.log('Shutdown...');
