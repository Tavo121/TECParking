#include "entrance_park.h"
#include "rfid_obj.h"
#include "servo.h"

EntrancePark::EntrancePark(rfid* rfidReader, ServoController* servoCtrl)
  : rfidReader(rfidReader), servoCtrl(servoCtrl), uidCount(0)
{
};

void EntrancePark::addAllowedUID(byte uid[4])
{
  if (uidCount >= MAX_UIDS) {
    Serial.println("No se pueden agregar mas UIDs permitidos.");
    return;
  }

  for (byte i = 0; i < 4; i++) {
    allowedUIDs[uidCount][i] = uid[i];
  }
  uidCount++;
};

bool EntrancePark::isUIDAllowed(byte uid[4])
{
  for (int i = 0; i < uidCount; i++) {
    if (rfidReader->compareUID(uid, allowedUIDs[i], 4)) {
      return true;
    }
  }
  return false;
};

void EntrancePark::checkAccess()
{
  byte uid[4];
  byte uidLength;

  if (!rfidReader->readCardUID(uid, &uidLength)) {
    return; // No hay tarjeta nueva
  }

  // Imprimir UID leido
  Serial.print("Tarjeta detectada - ");
  rfidReader->printUID(uid, uidLength);

  if (isUIDAllowed(uid)) {
    Serial.println("Acceso PERMITIDO - Abriendo barrera");
    servoCtrl->openServo();
    delay(4000); // Mantener abierta 4 segundos
    servoCtrl->closeServo();
  } else {
    Serial.println("Acceso DENEGADO - Tarjeta no autorizada");
  }
};