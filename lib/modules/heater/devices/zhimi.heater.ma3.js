const HeaterDevice = require('../HeaterDevice.js');
const HeaterCapabilities = require('../HeaterCapabilities.js');
const HeaterProperties = require('../HeaterProperties.js');
const Constants = require('../../../constants/Constants.js');

// Spec:
// http://miot-spec.org/miot-spec-v2/instance?type=urn:miot-spec-v2:device:heater:0000A01A:zhimi-ma3:1


class ZhimiHeaterMa3 extends HeaterDevice {
  constructor(miioDevice, model, deviceId, name, logger) {
    super(miioDevice, model, deviceId, name, logger);
  }


  /*----------========== INIT ==========----------*/

  initDeviceProperties() {
    this.addProperty(HeaterProperties.POWER, 2, 1, 'bool', ['read', 'write', 'notify']);
    this.addProperty(HeaterProperties.TARGET_TEMPERATURE, 2, 5, 'float', ['read', 'write', 'notify']);
    this.addProperty(HeaterProperties.MODE, 2, 6, 'uint8', ['read', 'write', 'notify']);
    this.addProperty(HeaterProperties.POWER_OFF_TIME, 3, 1, 'uint32', ['read', 'write', 'notify']);
    this.addProperty(HeaterProperties.CHILD_LOCK, 5, 1, 'bool', ['read', 'write', 'notify']);
    this.addProperty(HeaterProperties.LIGHT, 7, 3, 'uint8', ['read', 'write', 'notify']);
    this.addProperty(HeaterProperties.ALARM, 6, 1, 'bool', ['read', 'write', 'notify']);

    this.addProperty(HeaterProperties.TEMPERATURE, 4, 7, 'float', ['read', 'notify']);
    this.addProperty(HeaterProperties.USE_TIME, 8, 9, 'uint32', ['read', 'notify']);
  }

  initDeviceCapabilities() {
    this.addCapability(HeaterCapabilities.TARGET_TEMPERATURE_RANGE, [16, 28, 1]);
    this.addCapability(HeaterCapabilities.AUTO_MODE_VALUE, 0);
    this.addCapability(HeaterCapabilities.HEAT_MODE_VALUE, 2);
    this.addCapability(HeaterCapabilities.COOL_MODE_VALUE, 1);
    this.addCapability(HeaterCapabilities.POWER_OFF_TIMER_UNIT, Constants.TIME_UNIT_SECONDS);
    this.addCapability(HeaterCapabilities.POWER_OFF_TIMER_RANGE, [0, 43200, 1]);
    this.addCapability(HeaterCapabilities.USE_TIME_UNIT, Constants.TIME_UNIT_SECONDS);
  }


  /*----------========== STATUS ==========----------*/

  isLedEnabled() {
    return this.getPropertyValue(Properties.LIGHT) !== 2;
  }


  /*----------========== COMMANDS ==========----------*/

  async setLedEnabled(enabled) {
    let level = enabled ? 0 : 2;
    this.setPropertyValue(Properties.LIGHT, level);
  }


}

module.exports = ZhimiHeaterMa3;