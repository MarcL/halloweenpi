# Halloween Raspberry Pi

A basic Node.js project to trigger sound effects via a Raspberry Pi. A quick project which allows the attachment of a button to the GPIO ports of the Pi and triggers random sound effects.

# Installation

Clone the project and install the node modules with:

`npm install`

You will need to ensure that the `alsa.h` header can be found in order to build the [node-speaker](https://github.com/TooTallNate/node-speaker) module. Do this with the following:

```
sudo apt-get install libasound2-dev
```

Once installed you can run the project with:

```
npm start
```

# Usage

The breadboard should be setup in a similar way as the [onoff module](https://www.npmjs.com/package/onoff). The button is attached to Gpio 4 and I've added 4 LEDs attached to GPIOs 14, 15, 18 and 23 for my project. These can be altered in `config/config.js` to your own needs and you will need to rewire your breadboard accordingly. Have a look at this very helpful [Raspberry Pi GPIO pinout](http://pi.gadgetoid.com/pinout) from [Gadgetoid](https://twitter.com/gagetoid) for more details.

The code will trigger all LEDs in the `leds` array in `config/config.js` to light when the sound effect is played. Alter the `soundFiles` array in `config/config.js` to add new sound effects to trigger. These are currently triggered randomly when the button is pressed.

Run the project with `npm start`.

# License

This project is licensed under the terms of the MIT license. See the LICENSE file.