#ifndef ULTRASONIC_SENSOR_H
#define ULTRASONIC_SENSOR_H

#include <Arduino.h>

class UltrasonicSensor
{
  private:
    int trigPin;
    int echoPin;
    long lastReadTime;
    int readInterval;

  public:
    UltrasonicSensor(int trigPin, int echoPin, int readInterval = 100);
    float readDistance();
    void init();
};

#endif