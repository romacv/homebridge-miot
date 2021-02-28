const FanDevice = require('../FanDevice.js');
const FanCapabilities = require('../FanCapabilities.js');
const FanProperties = require('../FanProperties.js');

// Spec:
// https://miot-spec.org/miot-spec-v2/instance?type=urn:miot-spec-v2:device:fan:0000A005:dmaker-p9:1


class DmakerFanP9 extends FanDevice {
  constructor(miioDevice, model, deviceId, name, logger) {
    super(miioDevice, model, deviceId, name, logger);
  }


  /*----------========== INIT ==========----------*/

  initDeviceProperties() {
    this.addProperty(FanProperties.POWER, 2, 1, 'bool', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.FAN_LEVEL, 2, 2, 'uint8', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.HORIZONTAL_SWING, 2, 5, 'bool', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.HORIZONTAL_SWING_ANGLE, 2, 6, 'uint16', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.MODE, 2, 4, 'uint8', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.POWER_OFF_TIME, 2, 8, 'uint32', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.CHILD_LOCK, 3, 1, 'bool', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.LIGHT, 2, 9, 'uint8', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.ALARM, 2, 7, 'bool', ['read', 'write', 'notify']);
    this.addProperty(FanProperties.FAN_SPEED, 2, 11, 'uint8', ['read', 'write', 'notify']);

    this.addProperty(FanProperties.HORIZONTAL_MOVE, 2, 10, 'uint8', ['write']);
  }

  initDeviceCapabilities() {
    this.addCapability(FanCapabilities.FAN_LEVELS, 4);
    this.addCapability(FanCapabilities.HORIZONTAL_SWING_LEVELS, [30, 60, 90, 120, 150]);
    this.addCapability(FanCapabilities.NATURAL_MODE, true);
    this.addCapability(FanCapabilities.SLEEP_MODE, true);
    this.addCapability(FanCapabilities.POWER_OFF_TIMER_UNIT, 'minutes');
    this.addCapability(FanCapabilities.POWER_OFF_TIMER_RANGE, [0, 480, 1]);
  }


  /*----------========== STATUS ==========----------*/

  isNaturalModeEnabled() {
    return this.getPropertyValue(FanProperties.MODE) === 1;
  }

  isSleepModeEnabled() {
    return this.getPropertyValue(FanProperties.MODE) === 2;
  }


  /*----------========== COMMANDS ==========----------*/

  async setNaturalModeEnabled(enabled) {
    let value = enabled ? 1 : 0;
    this.setPropertyValue(FanProperties.MODE, value);
  }

  async setSleepModeEnabled(enabled) {
    let value = enabled ? 2 : 0;
    this.setPropertyValue(FanProperties.MODE, value);
  }

  async moveLeft() {
    this.setPropertyValue(FanProperties.HORIZONTAL_MOVE, 1);
  }

  async moveRight() {
    this.setPropertyValue(FanProperties.HORIZONTAL_MOVE, 2);
  }


}

module.exports = DmakerFanP9;