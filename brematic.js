'use strict';

const DEFAULT_PORT = 49880;
const PATH_DRIVER = './devices/';

class Brematic {

  /**
   * @typedef {Object} Config Device Configuration
   * @property {String} host Hostname of Brematic Gateway
   * @property {number} port Port of Brematic Gateway
   * @property {String} deviceType Type of device
   * @property {Object} deviceConfig Parameters for driver
   */

  /**
   * Initialize Brematic
   * @param {Config} config Configuration
   */
  constructor(config) {
    if (config === undefined) {
      throw new Error('Device Configuration required!');
    } else {
      // Set Host
      if (config.hasOwnProperty('host')) {
        this.host = config.host;
      } else {
        throw new Error('Host is required!');
      }

      // Set Port
      if (config.hasOwnProperty('port')) {
        this.port = config.port;
      } else {
        this.port = DEFAULT_PORT;
      }

      // Load configured driver
      var driverPath = '';
      if (config.hasOwnProperty('deviceType')) {
        driverPath = PATH_DRIVER + config.deviceType + '.js';
      } else {
        driverPath = PATH_DRIVER + 'default.js';
      }

      try {
        var Device = require(driverPath);
        this.device = new Device(config.deviceConfig);
      } catch (err) {
        console.error(err);
        throw new Error('Device driver not found!');
      }
    }
  };

  /**
  * Send a Message to Gateway
  * @private
  * @param {String} message Message to be send
  */
  sendMessage(message) {
    return new Promise((resolve, reject) => {
      var dgram = require('dgram');
      var buffer = new Buffer(message);

      var client = dgram.createSocket('udp4');
      client.send(
        buffer,
        0,
        buffer.length,
        this.port,
        this.host,
        (err, bytes) => {
          // Close connection
          client.close();

          if (err) {
            reject(err);
          } else {
            resolve(bytes);
          }
        });
    });
  };

  /**
   * @public
   * @param {*} value
   */
  setValue(value) {
    this.device.setValue(value);
    return this.sendMessage(this.device.createMessage());
  }

  /**
   * @public
   */
  getValue() {
    return this.device.getValue();
  }
}

module.exports = Brematic;
