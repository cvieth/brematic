# Brematic Library for Node.js
[![npm version](https://badge.fury.io/js/brematic.svg)](https://badge.fury.io/js/brematic)
[![Beerpay](https://beerpay.io/cvieth/brematic/badge.svg?style=beer)](https://beerpay.io/cvieth/brematic)
[![Beerpay](https://beerpay.io/cvieth/brematic/make-wish.svg?style=flat)](https://beerpay.io/cvieth/brematic)


This project is a Node.js package to control devices via for Brennenstuhl Brematic Gateway and compatible Gateways like "Conn Air".

If you are not creating a new project, you might be more interested in the following packages:
 * [Homebridge Brematic Plugin](https://www.github.com/cvieth/homebridge-brematic)
 * [Brematic CLI Tool](https://www.github.com/cvieth/brematic-cli)

## Installing
The plugin is published through [NPM](https://www.npmjs.com/package/homebridge-brematic) and
should be installed "globally" by typing:

To you want use this package in your project, you can install it via [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/):

```bash
npm install brematic --save
```

```bash
yarn add brematic
```

## Using

Below you can find a small example of how this package can be used.

``` javascript
let Brematic = require('brematic');

let configuration = {};
let myDevice = new Brematic(configuration);

myDevice.setValue(false);
```

### Configuration

| Name         | Optional | Type     | Description                                                             |
| ------------ | -------- | -------- | ----------------------------------------------------------------------- |
| host         | no       | `String` | Hostname or IP Address of your gateway                                  |
| port         | yes      | `int`    | Port of your gateway (Usually 49880)                                    |
| deviceType   | no       | `String` | Type of Device (See: [List of Device Types](#device-types))             |
| deviceConfig | no       | `String` | Device Type specific Configuration (See: [Device Types](#device-types)) |

## Device Types

Device types are drivers for the different kind of devices that can be controlled via Brennenstuhl Brematic Gateway and compatible Garteways like "Conn Air". The apropriate configuration for each device type can be found in the specific configruation linked below.

The devices listed below have been successfully tested with this package:

| Vendor       | Device Name | Device Type                   | Comment |
| ------------ | ----------- | ----------------------------- | ------- |
| Brennerstuhl | RCS1000N    | [Default](devices/default.md) | -       |
| Pollin       | 2605        | [Default](devices/default.md) | -       |
