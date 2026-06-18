#include "web_manager_obj.h"

web_manager::web_manager(const char* ssid, const char* password)
  : _ssid(ssid),
    _password(password)
{
};

void web_manager::init()
{
  WiFi.begin(_ssid, _password);
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
};

void web_manager::updateSpaceState(int space, bool isOccupied)
{
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(apiSpace);
    http.addHeader("Content-Type", "application/json");

    // JSON data
    StaticJsonDocument<128> doc;
    doc["space_id"] = space;
    doc["state"] = isOccupied;

    String jsonPayload;
    serializeJson(doc, jsonPayload);

    int httpResponseCode = http.POST(jsonPayload);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Respuesta del servidor (Sensor): " + response);
    } else {
      Serial.printf("Error en el envío POST de Sensor: %s\n", http.errorToString(httpResponseCode).c_str());
    }
    http.end();
  }
}; 
