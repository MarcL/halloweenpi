var PiPlayer = require('./lib/PiPlayer');

var soundFiles = [
  './assets/test.mp3'
];

var buttonGpio = 4;
var ledGpio = 14;

var player = new PiPlayer(soundFiles, buttonGpio, ledGpio);


