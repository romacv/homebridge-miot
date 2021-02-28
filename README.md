<span align="center">

# homebridge-miot

<!---[![verified-by-homebridge](https://badgen.net/badge/homebridge/verified/purple)](https://github.com/homebridge/homebridge/wiki/Verified-Plugins#verified-plugins)--->
[![homebridge-miot](https://badgen.net/npm/v/homebridge-xiaomi-fan?icon=npm)](https://www.npmjs.com/package/homebridge-miot)
[![mit-license](https://badgen.net/npm/license/lodash)](https://github.com/merdok/homebridge-miot/blob/master/LICENSE)
[![follow-me-on-twitter](https://badgen.net/twitter/follow/merdok_dev?icon=twitter)](https://twitter.com/merdok_dev)
[![join-discord](https://badgen.net/badge/icon/discord?icon=discord&label=homebridge-xiaomi-fan)](https://discord.gg/AFYUZbk)

</span>

`homebridge-miot` is a plugin for homebridge which allows you to control any device supporting the miot protocol from Xiaomi! Currently only fans and heaters are supported but more devices will be added over time.
The goal is to add Homekit support to miot devices and make them fully controllable from the native Homekit iOS app and Siri.

#### Since the plugin was made with the intention to implement new devices easy and fast, it should be pretty straight forward to do that. If your device is not supported please create a request and specify the device model and type.

### Features
* Integrates miot devices into homekit
* Detect device types automatically if the device is supported
* Homekit automations for your miot devices

### Supported device types
* Fans
* Heaters

More device types will be added!

For a full list of supported devices by model check here: [all supported devices by model](https://github.com/merdok/homebridge-miot/blob/master/supported_devices.md).

## Installation

If you are new to homebridge, please first read the homebridge [documentation](https://github.com/homebridge/homebridge#readme).
If you are running on a Raspberry, you will find a tutorial in the [homebridge wiki](https://github.com/homebridge/homebridge/wiki/Install-Homebridge-on-Raspbian).

Install homebridge:
```sh
sudo npm install -g homebridge
```

Install homebridge-miot:
```sh
sudo npm install -g homebridge-miot
```

## Configuration

Add the `miot` platform in `config.json` in your home directory inside `.homebridge`.

Add your devices in the `devices`  array.

Example configuration:

```js
{
  "platforms": [
    {
      "platform": "miot",
      "devices": [
        {
          "name": "Xiaomi Smartmi Fan 3",
          "ip": "192.168.0.83",
          "token": "63d4d8fba83f94aa5ad8f96536c84c12",
          "pollingInterval": 10,
          "horizontalMoveControl": true,
          "buzzerControl": true,
          "ledControl": true,
          "naturalModeControl": true,
          "shutdownTimer": true,
          "ioniserControl": true,
          "horizontalAngleButtons": [
             5,
             60,
             100
           ]
        }
      ]
    }
  ]
}
```

### Token
For the plugin to work the device token is required. For methods on how to find the token refer to this guide [obtaining mi device token](https://github.com/merdok/homebridge-miot/blob/master/obtain_token.md).

### Configuration
Keep in mind that your device needs to support the feature which you enable, otherwise you will not see any effect.
#### Platform configuration fields
- `platform` [required]
Should always be **"miot"**.
- `devices` [required]
A list of your devices.
#### General configuration fields
- `name` [required]
Name of your accessory.
- `ip` [required]
ip address of your device.
- `token` [required]
The token of your device.
- `deviceId` [optional]
The deviceId will be automatically retrieved by the plugin but if there is trouble you can manually specify it. **Default: "" (not specified)**
- `model` [optional]
The device model if known. If specified then the accessory will be created instantly without the need to first discover and identify the device. **Default: "" (not specified)**
- `prefsDir` [optional]
The directory where the device info will be stored. **Default: "~/.homebridge/.xiaomiMiot"**
- `pollingInterval` [optional]
The device state background polling interval in seconds. **Default: 5**
- `deepDebugLog` [optional]
Enables additional more detailed debug log. Useful when trying to figure out issues with the plugin. **Default: false**
#### Fan specific configuration fields
- `buzzerControl` [optional]
Whether the buzzer service is enabled. This allows to turn on/off the fan buzzer. **Default: true**
- `ledControl` [optional]
Whether the led service is enabled. This allows to turn on/off the fan LED. **Default: true**
- `horizontalSwingControl` [optional]
Shows an additional switch to quickly enable/disable horizontal swing mode. **Default: false**
- `verticalSwingControl` [optional]
Shows a switch to enable/disable vertical swing mode. **Default: false**
- `naturalModeControl` [optional]
Show a switch which allows to quickly enable/disable the natural mode. **Default: true**
- `sleepModeControl` [optional]
Show a switch which allows to quickly enable/disable the sleep mode. **Default: true**
- `horizontalMoveControl` [optional]
Whether the horizontal move service is enabled. This allows to move the fan in 5° to the left or right. **Default: false**
- `verticalMoveControl` [optional]
Whether the vertical move service is enabled. This allows to move the fan in 5° to the up or down. **Default: false**
- `fanLevelControl` [optional]
Show fan level switches which allow to change the fan level. Only on supported devices! **Default: true**
- `ioniserControl` [optional]
Show a switch which allows to quickly enable/disable the ioniser on your fan. **Default: false**
- `shutdownTimer` [optional]
Show a slider (as light bulb) which allows to set a shutdown timer in minutes. **Default: false**
- `horizontalAngleButtons` [optional]
Whether the angle buttons service is enabled. This allows to create buttons which can switch between different horizontal oscillation angles. **Default: "" (disabled)**
  - Set an array of numeric values. Possible values depend on the fan model
  - Some fans support predefined angle buttons, in the case if the property is not specified the angle buttons are retrieved from the fan and displayed as switches. If you want to prevent that behaviour set the property value as an empty array **[]** or **false**
  - Tapping the active oscillation angle button will disable oscillation completely
#### Heater specific configuration fields
- `buzzerControl` [optional]
Whether the buzzer service is enabled. This allows to turn on/off the heater buzzer. **Default: true**
- `ledControl` [optional]
Whether the led service is enabled. This allows to turn on/off the heater LED. **Default: true**
- `childLockControl` [optional]
Whether the child lock service is enabled. This allows to turn on/off the child lock. **Default: false**
- `shutdownTimer` [optional]
Show a slider (as light bulb) which allows to set a shutdown timer in minutes. **Default: false**

## Troubleshooting
If you have any issues with the plugin or device services then you can run homebridge in debug mode, which will provide some additional information. This might be useful for debugging issues.

Homebridge debug mode:
```sh
homebridge -D
```

Deep debug log, add the following to your config.json:
```json
"deepDebugLog": true
```
This will enable additional extra log which might be helpful to debug all kind of issues.

## Special thanks
[miio](https://github.com/aholstenson/miio) - the Node.js remote control module for Xiaomi Mi devices.

[HAP-NodeJS](https://github.com/KhaosT/HAP-NodeJS) & [homebridge](https://github.com/nfarina/homebridge) - for making this possible.