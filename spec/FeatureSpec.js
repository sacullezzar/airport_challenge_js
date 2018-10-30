'use strict';

describe ('Feature Test:', function () {
  var plane;
  var airport;

  beforeEach(function() {
    plane = new Plane();
    airport = new Airport();
  });

  describe('under normal conditions', function(){
    beforeEach(function(){
      spyOn(Math,'random').and.returnValue(0);
    });

    it('planes can be instructed to land at an airport', function() {
      plane.land(airport);
      expect(airport.planes()).toContain(plane);
    });

    it('planes can be instructed to takeoff', function() {
      plane.land(airport)
      plane.takeoff();
      expect(airport.planes()).not.toContain(plane);
    });
    it('prevents planes from landing when hangar is full', function(){
      for (var i = 0; i < 10; i++) {
      plane.land(airport);
    }
    expect(airport.planes()).toContain(plane);
    expect(function(){plane.land(airport);}).toThrowError('Hangar full!');
    })
  });

  describe('under stormy conditions', function(){

    it('blocks takeoff when weather is stormy', function(){
      spyOn(Math,'random').and.returnValue(0);
      plane.land(airport)
      spyOn(airport._weather,'isStormy').and.returnValue(true);
      expect(function(){ plane.takeoff();}).toThrowError('cannot takeoff during storm');
      expect(airport.planes()).toContain(plane);
    });

    it('blocks landing when the weather is stormy', function() {
      spyOn(Math,'random').and.returnValue(1);
      expect(function(){plane.land(airport);}).toThrowError('cannot land during storm');
      expect(airport.planes()).toEqual([]);
    });
  });
});
