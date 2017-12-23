'use strict';
/**
 * Initialize Brematic
 * @param {Object} config Configuration
 */
var Brematic = function(config) {};

/**
 * Send a Message to Device
 * @private
 * @param {String} message Message to be send
 */
Brematic.prototype.sendMessage = function(message) {
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

Brematic.prototype.addDevice = (driver, config) => {
};

module.exports = Brematic;
