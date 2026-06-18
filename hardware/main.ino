#include "rfid_obj.h"

#define RFID_SSPIN 5

rfid rfid(RFID_SSPIN);

void setup() 
{
  Serial.begin(115200);
  while (!Serial);

  Serial.println(F("Scan PICC to see UID, SAK, type, and data blocks..."));
}

void loop() 
{
  rfid.test();
  delay(2000);
}
