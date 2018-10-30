'use strict';

function Airport(weather) {
  this._weather = typeof weather !== 'undefined' ? weather : new Weather();
  this._hangar = [];
  this.MAXIMUM_CAPACITY = 10;
}

Airport.prototype.planes = function() {
  return this._hangar;
};

Airport.prototype.clearForLanding = function(plane) {
  if(this._weather.isStormy()) {
    throw new Error('cannot land during storm');
  }
  if(this._hangar.length === 10) {
    throw new Error('Hangar full!');
  }
  this._hangar.push(plane);
};

Airport.prototype.clearForTakeOff = function(plane) {
  if(this._weather.isStormy()) {
    throw new Error('cannot takeoff during storm');
  }
  this._hangar = [];
};

Airport.prototype.isStormy = function() {
  return false;
};
