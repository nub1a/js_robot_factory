'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.goForward = function(step) {
  this.coords.y += step || 1;
};

BaseRobot.prototype.goBack = function(step) {
  this.coords.y -= step || 1;
};

BaseRobot.prototype.goLeft = function(step) {
  this.coords.x -= step || 1;
};

BaseRobot.prototype.goRight = function(step) {
  this.coords.x += step || 1;
};

BaseRobot.prototype.getInfo = function() {
  return (`Robot: ${this.name},`
    + ` Chip version: ${this.chipVersion},`
    + ` Weight: ${this.weight}`);
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, ...arguments);
  this.coords.z = 0;
}

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

FlyingRobot.prototype.goUp = function(step) {
  this.coords.z += step || 1;
};

FlyingRobot.prototype.goDown = function(step) {
  this.coords.z -= step || 1;
};

function DeliveryDrone(
  name, weight, coords, chipVersion, maxLoadWeight, currentLoad
) {
  FlyingRobot.call(this, ...arguments);

  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

DeliveryDrone.prototype.unhookLoad = function() {
  this.currentLoad = null;
};

DeliveryDrone.prototype.hookLoad = function(load) {
  if (load.weight <= this.maxLoadWeight && this.currentLoad === null) {
    this.currentLoad = load;
  }
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
