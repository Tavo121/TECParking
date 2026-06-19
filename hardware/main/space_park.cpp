#include "space_park.h"
#include "ultrasonic.h"
#include "web_manager_obj.h"

SpacePark::SpacePark(int spaceId, web_manager* webManager, UltrasonicSensor* sensor, float threshold)
  : spaceId(spaceId), webManager(webManager), sensor(sensor), threshold(threshold),
    firstRead(true)
{
};

void SpacePark::update()
{
  float distance = sensor->readDistance();
  
  if (distance < 0) {
    // Sin eco, no se puede determinar
    return;
  }

  bool isOccupied = (distance < threshold);

  // Primera lectura: solo establecer estado inicial sin enviar POST
  if (firstRead) {
    lastOccupied = isOccupied;
    firstRead = false;
    Serial.print("Espacio ");
    Serial.print(spaceId);
    Serial.print(" estado inicial: ");
    Serial.println(isOccupied ? "ocupado" : "libre");
    return;
  }

  // Detectar cambio de estado
  if (isOccupied != lastOccupied) {
    lastOccupied = isOccupied;
    
    const char* status = isOccupied ? "occupied" : "available";
    
    Serial.print("Espacio ");
    Serial.print(spaceId);
    Serial.print(" cambio a: ");
    Serial.println(status);

    // Enviar POST a la API
    webManager->updateSpaceState(spaceId, isOccupied);
  }
};