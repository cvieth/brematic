'use strict';

const DEFAULT_PORT = 49880;
const PATH_DRIVER = './devices/';

class Brematic {

  /**
   * @typedef {Object} Config Device Configuration
   * @property {String} host Hostname of Brematic Gateway
   * @property {number} port Port of Brematic Gateway
   * @property {String} deviceType Type of device
   * @property {Object} params Parameters for driver
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
        this.device = new Device(config.params);
      } catch (err) {
        throw new Error('Device driver not found!');
      }
    }
  };

  setValue(value) {
    console.log(value);
  }
}

module.exports = Brematic;
