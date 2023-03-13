const GenericDevice = require('../GenericDevice.js');
const Constants = require('../../../constants/Constants.js');
const PropFormat = require('../../../constants/PropFormat.js');
const PropUnit = require('../../../constants/PropUnit.js');
const PropAccess = require('../../../constants/PropAccess.js');


class YeelinkLightNl1 extends GenericDevice {
  constructor(miotDevice, name, logger) {
    super(miotDevice, name, logger);
  }


  /*----------========== DEVICE INFO ==========----------*/

  getDeviceName() {
    return 'Mi Motion Activated Night Light 2';
  }

  getMiotSpecUrl() {
    return 'https://miot-spec.org/miot-spec-v2/instance?type=urn:miot-spec-v2:device:night-light:0000A0AB:yeelink-nl1:1';
  }


  /*----------========== CONFIG ==========----------*/

  requiresMiCloud() {
    return false;
  }


  /*----------========== METADATA ==========----------*/

  initDeviceServices() {
    this.createServiceByString('{"siid":2,"type":"urn:miot-spec-v2:service:motion-sensor:00007825:yeelink-nl1:1","description":"Motion Sensor"}');
    this.createServiceByString('{"siid":3,"type":"urn:miot-spec-v2:service:battery:00007805:yeelink-nl1:1","description":"Battery"}');
    this.createServiceByString('{"siid":4,"type":"urn:miot-spec-v2:service:illumination-sensor:0000783D:yeelink-nl1:1","description":"Illumination Sensor"}');
  }

  initDeviceProperties() {
    this.addPropertyByString('motion-sensor:no-motion-duration', '{"siid":2,"piid":1,"type":"urn:miot-spec-v2:property:no-motion-duration:000000CB:yeelink-nl1:1","description":"No Motion Duration","format":"uint16","access":["read","notify"],"unit":"minutes","valueList":[{"value":2,"description":"2 Minutes"},{"value":5,"description":"5 Minutes"},{"value":10,"description":"10 Minutes"},{"value":20,"description":"20 Minutes"},{"value":30,"description":"30 Minutes"}]}');
    this.addPropertyByString('battery:battery-level', '{"siid":3,"piid":1,"type":"urn:miot-spec-v2:property:battery-level:00000014:yeelink-nl1:1","description":"Battery Level","format":"uint8","access":["read","notify"],"unit":"percentage","valueRange":[0,100,1]}');
    this.addPropertyByString('illumination-sensor:illumination', '{"siid":4,"piid":1,"type":"urn:miot-spec-v2:property:illumination:0000004E:yeelink-nl1:1","description":"Illumination","format":"float","access":["read","notify"],"unit":"lux","valueRange":[0,10000,1]}');
  }

  initDeviceActions() {
   //no actions
  }

  initDeviceEvents() {
    this.addEventByString('motion-sensor:motion-detected', '{"siid":2,"eiid":1,"type":"urn:miot-spec-v2:event:motion-detected:00005001:yeelink-nl1:1","description":"Motion Detected","arguments":[]}');
  }


  /*----------========== VALUES OVERRIDES ==========----------*/


  /*----------========== PROPERTY OVERRIDES ==========----------*/


  /*----------========== ACTION OVERRIDES ==========----------*/


  /*----------========== OVERRIDES ==========----------*/


}

module.exports = YeelinkLightNl1;