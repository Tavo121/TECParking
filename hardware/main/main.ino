#include "rfid_obj.h"
#include "web_manager_obj.h"
#include "ultrasonic.h"
#include "servo.h"
#include "space_park.h"
#include "entrance_park.h"

#define RFID_SSPIN 5

// Pines de ultrasonicos
#define TRIG_PIN_1 12
#define TRIG_PIN_2 25
#define TRIG_PIN_3 26

#define ECHO_PIN_1 32
#define ECHO_PIN_2 35
#define ECHO_PIN_3 34

//#define SPACE1 1
#define SPACE2 1
#define SPACE3 2

// Pin del servo
#define SERVO_PIN 33

// Intervalo del ciclo principal (ms)
#define CYCLE_INTERVAL 200

rfid rfid(RFID_SSPIN);
web_manager web_manager("iPhone", "12123434"); // CAMBIAR SEGUN LA RED

//UltrasonicSensor sensor1(TRIG_PIN_1, ECHO_PIN_1);
UltrasonicSensor sensor2(TRIG_PIN_2, ECHO_PIN_2);
UltrasonicSensor sensor3(TRIG_PIN_3, ECHO_PIN_3);

ServoController servoCtrl(SERVO_PIN);

//SpacePark space1(SPACE1, &web_manager, &sensor1);
SpacePark space2(SPACE2, &web_manager, &sensor2);
SpacePark space3(SPACE3, &web_manager, &sensor3);

EntrancePark entrance(&rfid, &servoCtrl);

unsigned long lastCycleTime = 0;

void setup() 
{
  Serial.begin(115200);

  // Inicializar componentes
  web_manager.init();
  servoCtrl.init();
  //sensor1.init();
  sensor2.init();
  sensor3.init();

  // Agregar UIDs permitidos para entrada
  // Ejemplo: si tu tarjeta tiene UID: AD 2A FD 06
  byte allowedUID1[] = {0xAD, 0x2A, 0xFD, 0x06};
  entrance.addAllowedUID(allowedUID1);

  byte allowedUID2[] = {0x65, 0x83, 0x21, 0x07};
  entrance.addAllowedUID(allowedUID2);
  //
  // Para agregar mas tarjetas, repite:
  // byte allowedUID2[] = {0xXX, 0xXX, 0xXX, 0xXX};
  // entrance.addAllowedUID(allowedUID2);

  Serial.println("Sistema TECParking iniciado.");
}

void loop() 
{
  unsigned long currentMillis = millis();

  // Ciclo principal cada CYCLE_INTERVAL ms
  if (currentMillis - lastCycleTime >= CYCLE_INTERVAL) {
    lastCycleTime = currentMillis;

    // Actualizar estado de espacios de parqueo
    //space1.update();
    //delay(30);
    space2.update();
    //delay(30);
    space3.update();

    // Verificar acceso por RFID
    entrance.checkAccess();
  }

  // Pequeño delay para mantener la conexion WiFi estable
  delay(20);
}