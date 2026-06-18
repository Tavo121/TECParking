#include "rfid_obj.h"

rfid::rfid(byte sspin)
  : sspin(sspin),
    ss_pin(sspin),
    driver(ss_pin),
    mfrc522(driver)
{
  init();
};

void rfid::init()
{
  mfrc522.PCD_Init();    // Init MFRC522 board.
  MFRC522Debug::PCD_DumpVersionToSerial(mfrc522, Serial);
};
    
//displays card data in serial monitor
void rfid::test()
{
  if (!mfrc522.PICC_IsNewCardPresent()) {
    return;
  }

  // Select one of the cards.
  if (!mfrc522.PICC_ReadCardSerial()) {
    return;
  }

  // Dump debug info about the card; PICC_HaltA() is automatically called.
  MFRC522Debug::PICC_DumpToSerial(mfrc522, Serial, &(mfrc522.uid));
};