#ifndef ENTRANCE_PARK_H
#define ENTRANCE_PARK_H

#include <Arduino.h>

class rfid;
class ServoController;

class EntrancePark
{
  private:
    rfid* rfidReader;
    ServoController* servoCtrl;
    static const int MAX_UIDS = 10;
    byte allowedUIDs[MAX_UIDS][4];
    int uidCount;

  public:
    EntrancePark(rfid* rfidReader, ServoController* servoCtrl);
    void addAllowedUID(byte uid[4]);
    bool isUIDAllowed(byte uid[4]);
    void checkAccess();
};

#endif