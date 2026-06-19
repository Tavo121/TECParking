#ifndef SPACE_PARK_H
#define SPACE_PARK_H

#include <Arduino.h>

class web_manager; // Forward declaration
class UltrasonicSensor;

class SpacePark
{
  private:
    int spaceId;
    web_manager* webManager;
    UltrasonicSensor* sensor;
    float threshold;
    bool lastOccupied;
    bool firstRead;

  public:
    SpacePark(int spaceId, web_manager* webManager, UltrasonicSensor* sensor, float threshold = 10.0);
    void update();
};

#endif