# Default Device

## Values
This Device Type is made for On/Off toggleing, thefore it expects `Boolean` Values.

## Configruation Parameters 

### Overview
| Name    | Optional | Type      | Example       | Description                 |
| ------- | -------- | --------- | ------------- | --------------------------- |
| address | no       | `Object`  | Details below | Device Adress configuration |
| repeat  | yes      | `Integer` | `15`          | Repeat value                |
| pause   | yes      | `Integer` | `5600`        | Pause value                 |
| tune    | yes      | `Integer` | `350`         | Tune value                  |
| baud    | yes      | `Integer` | `25`          | Baud value                  |
| speed   | yes      | `Integer` | `16`          | Speed value                 |
| value   | yes      | `Boolean` | `false`       | Default Value               |

### Address

The adress configuration consits the System Adress and the Unit address. You need to fill in the state of the DIP Switches of your device as a 5 Char String, where `1` represents On, ans `0`represents Off.

| Name   | Optional | Type     | Example   | Description             |
| ------ | -------- | -------- | --------- | ----------------------- |
| system | no       | `String` | `"00000"` | System Adress of device |
| unit   | no       | `String` | `"00000"` | Unit Adress of device   |

### Example
```json
{
  address: {
    system: '00000',
    unit: '00000'
  }
}
```