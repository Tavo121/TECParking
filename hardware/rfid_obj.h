#ifndef RFID_OBJ_H
#define RFID_OBJ_H

#include <Arduino.h>
#include <MFRC522v2.h>
#include <MFRC522DriverSPI.h>
#include <MFRC522DriverPinSimple.h>
#include <MFRC522Debug.h>

class rfid{
  private:
    byte sspin;
    MFRC522DriverPinSimple ss_pin;  // SPI pin
    MFRC522DriverSPI driver;        // SPI driver
    MFRC522 mfrc522;                // read-write tags class

  public:
    rfid(byte sspin);
    void init();
    void test();
};

#endif