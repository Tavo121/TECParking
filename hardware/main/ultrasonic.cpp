#include "ultrasonic.h"

UltrasonicSensor::UltrasonicSensor(int trigPin, int echoPin, int readInterval)
  : trigPin(trigPin), echoPin(echoPin), lastReadTime(0), readInterval(readInterval)
{
};

void UltrasonicSensor::init()
{
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
};

float UltrasonicSensor::readDistance()
{
  // Disparo pulso de 10us
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Medir duracion del echo
  long duration = pulseIn(echoPin, HIGH, 30000); // timeout 30ms (~5m max)
  
  if (duration == 0) {
    return -1.0; // Sin eco
  }

  // Velocidad del sonido: 343m/s -> 0.0343 cm/us
  // Distancia = (duracion / 2) * 0.0343
  float distance = duration * 0.0343 / 2.0;
  return distance;
};