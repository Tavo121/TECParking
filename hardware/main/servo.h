#ifndef SERVO_CONTROLLER_H
#define SERVO_CONTROLLER_H

#include <Arduino.h>
#include <ESP32Servo.h>

class ServoController
{
  private:
    Servo servoMotor;
    int pin;
    int openAngle;
    int closeAngle;

  public:
    ServoController(int pin, int openAngle = 90, int closeAngle = 0);
    void init();
    void openServo();
    void closeServo();
};

#endif