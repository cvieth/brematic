'use strict';

var Brematic = require('./brematic.js');

var brematic = new Brematic({
  host: '127.0.0.1',
  deviceConfig: {
    address: {
      system: '00000',
      unit: '00000',
    },
  },
});

brematic.setValue(true);
