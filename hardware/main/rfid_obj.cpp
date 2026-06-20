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

bool rfid::hasNewCard()
{
  if (!mfrc522.PICC_IsNewCardPresent()) {
    return false;
  }

  if (!mfrc522.PICC_ReadCardSerial()) {
    return false;
  }

  return true;
};

bool rfid::readCardUID(byte* uidOut, byte* uidLength)
{
  if (!mfrc522.PICC_IsNewCardPresent()) {
    return false;
  }

  if (!mfrc522.PICC_ReadCardSerial()) {
    return false;
  }

  *uidLength = mfrc522.uid.size;
  for (byte i = 0; i < *uidLength; i++) {
    uidOut[i] = mfrc522.uid.uidByte[i];
  }

  return true;
};

void rfid::printUID(byte* uid, byte uidLength)
{
  Serial.print("UID: ");
  for (byte i = 0; i < uidLength; i++) {
    Serial.print(uid[i] < 0x10 ? " 0" : " ");
    Serial.print(uid[i], HEX);
  }
  Serial.println();
};

bool rfid::compareUID(byte* uid1, byte* uid2, byte len)
{
  for (byte i = 0; i < len; i++) {
    if (uid1[i] != uid2[i]) {
      return false;
    }
  }
  return true;
};