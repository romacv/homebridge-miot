const FanDevice = require('../FanDevice.js');
const FanCapabilities = require('../FanCapabilities.js');
const FanProperties = require('../FanProperties.js');

// Spec:
// http://miot-spec.org/miot-spec-v2/instance?type=urn:miot-spec-v2:device:fan:0000A005:zhimi-fa1:2


class ZhimiFanFa1 extends FanDevice {
  constructor(miioDevice, model, deviceId, name, logger) {
    super(miioDevice, model, deviceId, name, logger);
  }


  /*----------========== INIT ==========----------*/

  initDeviceProperties() {
    this.addProperty(FanProperties.POWER, 2, 1, 'bool', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.FAN_LEVEL, 2, 2, 'uint8', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.HORIZONTAL_SWING, 2, 3, 'bool', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.HORIZONTAL_SWING_ANGLE, 2, 5, 'uint16', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.VERTICAL_SWING, 2, 4, 'bool', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.VERTICAL_SWING_ANGLE, 2, 6, 'uint16', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.MODE, 2, 7, 'uint8', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.POWER_OFF_TIME, 5, 2, 'uint32', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.CHILD_LOCK, 6, 1, 'bool', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.LIGHT, 2, 10, 'uint8', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.ALARM, 2, 11, 'bool', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.FAN_SPEED, 5, 10, 'uint8', ['read', 'write', 'notify']);

    this.addProperty(FanProperties.HORIZONTAL_MOVE, 5, 6, 'string', ['write']);
    this.addProperty(FanProperties.VERTICAL_MOVE, 5, 7, 'string', ['write']);
  }

  initDeviceCapabilities() {
    this.addCapability(FanCapabilities.FAN_LEVELS, 5);
    this.addCapability(FanCapabilities.HORIZONTAL_SWING_ANGLE_RANGE, [0, 120, 1]);
    this.addCapability(FanCapabilities.VERTICAL_SWING_ANGLE_RANGE, [0, 90, 1]);
    this.addCapability(FanCapabilities.NATURAL_MODE, true);
    this.addCapability(FanCapabilities.POWER_OFF_TIMER_UNIT, 'hours');
    this.addCapability(FanCapabilities.POWER_OFF_TIMER_RANGE, [0, 8, 1]);
    this.addCapability(FanCapabilities.LED_BRIGHTNESS_CONTROL, true);
    this.addCapability(FanCapabilities.BUILT_IN_BATTERY, true);
  }


  /*----------========== STATUS ==========----------*/

  isNaturalModeEnabled() {
    return this.getPropertyValue(FanProperties.MODE) === 0;
  }


  /*----------========== COMMANDS ==========----------*/

  async setNaturalModeEnabled(enabled) {
    let value = enabled ? 0 : 1;
    this.setPropertyValue(FanProperties.MODE, value);
  }


}

module.exports = ZhimiFanFa1;