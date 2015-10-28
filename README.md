# Halloween Raspberry Pi

A basic Node.js project to trigger sound effects via a Raspberry Pi. A quick project which allows the attachment of a button to the GPIO ports of the Pi and triggers random sound effects.

# Installation

Clone the project and install the node modules with:

`npm install`

# Usage

The breadboard should be setup in the same way as the [onoff module](https://www.npmjs.com/package/onoff). In the example shown below, we're expecting the button to be on Gpio 4 and the LED on Gpio 14. This can be altered in `config/config.js` to your own needs and you will need to rewire accordingly.

![OnOff Breadboard](https://raw.githubusercontent.com/fivdi/onoff/master/examples/light-switch.png)

Alter the `soundFiles` array in `config/config.js` to add new sound effects to trigger. These are currently triggered randomly when the button is pressed.

Run the project with `npm start`.

# License

This project is licensed under the terms of the MIT license. See the LICENSE file.