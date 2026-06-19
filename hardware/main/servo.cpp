#include "servo.h"

ServoController::ServoController(int pin, int openAngle, int closeAngle)
  : pin(pin), openAngle(openAngle), closeAngle(closeAngle)
{
};

void ServoController::init()
{
  servoMotor.attach(pin);
  servoMotor.write(closeAngle); // Inicia cerrado
};

void ServoController::openServo()
{
  servoMotor.write(openAngle);
};

void ServoController::closeServo()
{
  servoMotor.write(closeAngle);
};