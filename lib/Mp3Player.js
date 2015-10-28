var fs = require('fs');
var Lame = require('lame');
var Speaker = require('speaker');

var Mp3Player = function() {

    this.play = function(filename, callback) {
        var lameDecoder = new Lame.Decoder();
        var speaker = new Speaker();
        var stream = fs.createReadStream(filename)
          .pipe(lameDecoder)
          .pipe(speaker);

        stream.once('error', function() {
            callback('Streaming data error');
        });

        speaker.once('close', function() {
            callback();
        });
    };
};

module.exports = Mp3Player;
