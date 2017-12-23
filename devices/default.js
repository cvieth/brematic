'use strict';

const CHAR_LOW = 1;
const CHAR_HIGH = 3;
const CHAR_SEPERATOR = ',';
const CHAR_TERMINATOR = ';';
const SEQ_LOW =
  CHAR_HIGH + CHAR_SEPERATOR +
  CHAR_HIGH + CHAR_SEPERATOR +
  CHAR_LOW + CHAR_SEPERATOR +
  CHAR_LOW + CHAR_SEPERATOR;
const SEQ_HIGH =
  CHAR_HIGH + CHAR_SEPERATOR +
  CHAR_LOW + CHAR_SEPERATOR +
  CHAR_HIGH + CHAR_SEPERATOR +
  CHAR_LOW + CHAR_SEPERATOR;
const DEFAULT_REPEAT = 15;
const DEFAULT_PAUSE = 5600;
const DEFAULT_TUNE = 350;
const DEFAULT_BAUD = 25;
const DEFAULT_SPEED = 16;
const DEFAULT_VALUE = false;

class Device {

  /**
   * @typedef {Object} Address
   * @property {String} system System Adress
   * @property {String} unit Unit Adress
   */

  /**
   * @typedef {Object} Config
   * @property {Address} address Address Configuration
   * @property {number} [repeat] Repeat Value
   * @property {number} [pause] Pause Value
   * @property {number} [tune] Tune Value
   * @property {number} [baud] Baud Value
   * @property {number} [speed] speed Value
   */

  /**
   * Create Device
   * @param {Config} config
   */
  constructor(config) {
    if (config === undefined) {
      throw new Error('Driver configuration required!');
    } else {
      if (config.hasOwnProperty('address')) {
        if (
          (config.address.hasOwnProperty('system')) &&
          (config.address.hasOwnProperty('unit'))
        ) {
          if (
            (config.address.system.length === 5) &&
            (config.address.unit.length === 5)
          ) {
            // Store devices address
            this.address = config.address;
          } else {
            throw new Error('Address configuration invalid!');
          }
        } else {
          throw new Error('Address configuration incomplete!');
        }
      } else {
        throw new Error('Address configuration missing!');
      }

      // Set optional parameters
      this.repeat = config.hasOwnProperty('repeat')
        ? config.repeat : DEFAULT_REPEAT;
      this.pause = config.hasOwnProperty('pause')
        ? config.pause : DEFAULT_PAUSE;
      this.tune = config.hasOwnProperty('pause')
        ? config.tune : DEFAULT_TUNE;
      this.baud = config.hasOwnProperty('pause')
        ? config.baud : DEFAULT_BAUD;
      this.speed = config.hasOwnProperty('pause')
        ? config.speed : DEFAULT_SPEED;

      // Init value
      this.setValue(DEFAULT_VALUE);
    }
  }

  setValue(value) {
    this.value = value;
  };

  getValue(value) {
    return this.value;
  };

  encodeHead(repeat, pause, tune, baud) {
    /*
    * The function of this two values sA nnd sB is currently not clear. Found
    * this in other implementations. If anybody hay details about that please
    * contact me.
    * TODO: Review
    */
    let A = 0;
    let G = 0;

    return 'TXP:' +
      A + CHAR_SEPERATOR +
      G + CHAR_SEPERATOR +
      repeat + CHAR_SEPERATOR +
      pause + CHAR_SEPERATOR +
      tune + CHAR_SEPERATOR +
      baud + CHAR_SEPERATOR;
  };

  encodeAddress(address) {
    var msg = '';
    for (var i = 0, len = address.length; i < len; i++) {
      if (address[i] === '0') {
        msg = msg + SEQ_LOW;
      } else {
        msg = msg + SEQ_HIGH;
      }
    }
    return msg;
  };

  /**
   * Encode value to Message
   *
   * I am absolutly unclear what I am doing here! I have just played arround
   * with some values until it worked for me. If it would be great if anybody
   * could help out at this point.
   * TODO: Review
   *
   * @returns {String}
   */
  encodeValue() {
    var msg = '';
    var tail =
      CHAR_HIGH + CHAR_SEPERATOR +
      CHAR_LOW + CHAR_SEPERATOR +
      this.speed + CHAR_SEPERATOR + CHAR_TERMINATOR;

    if (this.value) {
      /**
       * The 'regular' TAIL did not work for me anymore, found out this one
       * does a ggod job, do not know why ...
       */
      tail =
        CHAR_LOW + CHAR_SEPERATOR +
        CHAR_LOW + CHAR_SEPERATOR +
        this.speed + CHAR_SEPERATOR + CHAR_TERMINATOR;

      msg =
        CHAR_LOW + CHAR_SEPERATOR +
        CHAR_HIGH + CHAR_SEPERATOR +
        CHAR_LOW + CHAR_SEPERATOR +
        CHAR_HIGH + CHAR_SEPERATOR +
        CHAR_HIGH + CHAR_SEPERATOR +
        tail;
    } else {
      msg =
        CHAR_HIGH + CHAR_SEPERATOR +
        CHAR_LOW + CHAR_SEPERATOR +
        CHAR_LOW + CHAR_SEPERATOR +
        CHAR_HIGH + CHAR_SEPERATOR +
        CHAR_LOW + CHAR_SEPERATOR +
        tail;
    }
    return msg;
  };

  createMessage() {
    return '' +
      this.encodeHead(
        this.repeat,
        this.pause,
        this.tune,
        this.baud
      ) +
      CHAR_LOW + CHAR_SEPERATOR +
      this.encodeAddress(this.address.system) +
      this.encodeAddress(this.address.unit) +
      CHAR_HIGH + CHAR_SEPERATOR +
      this.encodeValue();
  };
}

module.exports = Device;
