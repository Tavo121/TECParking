#ifndef WEB_MANAGER_OBJ_H
#define WEB_MANAGER_OBJ_H

#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

class web_manager
{
  private:
    const char* _ssid;
    const char* _password;
    static constexpr const char* apiSpace = "http://192.168.137.1:3001/api/hardware/spaces/update";

  public:
    web_manager(const char* ssid, const char* password);
    void init();
    void updateSpaceState(int space, bool isOccupied);
    void getTest();
};


#endif