#include "rfid_obj.h"
#include "web_manager_obj.h"

#define RFID_SSPIN 5

rfid rfid(RFID_SSPIN);
web_manager web_manager("iPhone", "12123434"); // CAMBIAR SEGUN LA RED

void setup() 
{
  Serial.begin(115200);
  web_manager.init();
}

void loop() 
{
  // leer los ultrasonicos
  // if alguno esta ocupado -> POST
  web_manager.updateSpaceState(1, true);

  rfid.test(); // muestra la informacion de tarjeta si se acerca al lector.
  delay(1000);
}
