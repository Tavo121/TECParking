# TECParking

Sistema inteligente de gestión de estacionamiento en tiempo real utilizando ESP32, sensores ultrasónicos y tecnología RFID.

## Integrantes

- Angelo Fabian Ceciliano Ortega
- Gustavo Alvarado Aburto
- Kevin Esteban Chinchilla Rodríguez
- Deilyn Araya Araya

## Descripción

TECParking es un sistema IoT completo que permite monitorear y gestionar espacios de estacionamiento en tiempo real. El sistema detecta automáticamente la ocupación de espacios mediante sensores ultrasónicos, controla el acceso mediante tarjetas RFID y proporciona una interfaz web para visualizar el estado del estacionamiento y gestionar reservas.

## Características

- Detección automática de ocupación de espacios mediante sensores ultrasónicos
- Control de acceso con tarjetas RFID
- Barrera automática controlada por servomotor
- Visualización en tiempo real del estado de los espacios
- Interfaz web responsive para monitoreo y gestión
- Sistema de reservas de espacios
- Comunicación en tiempo real mediante WebSockets
- Arquitectura basada en contenedores Docker

## Tecnologías Utilizadas

### Hardware
- **ESP32**: Microcontrolador principal
- **MFRC522**: Módulo lector RFID
- **HC-SR04**: Sensores ultrasónicos para detección de vehículos
- **Servomotor**: Control de barrera de acceso

### Software
- **Backend**: Node.js, Express, Socket.IO
- **Frontend**: React, Vite, TailwindCSS
- **Firmware**: Arduino/C++ para ESP32
- **Contenedores**: Docker y Docker Compose

### Librerías ESP32
- ArduinoJson
- ESP32Servo
- MFRC522v2
- WiFi
- HTTPClient

## Requisitos Previos

### Hardware
- Placa ESP32
- 3 sensores ultrasónicos HC-SR04
- 1 módulo RFID MFRC522
- 1 servomotor
- Cables de conexión
- Fuente de alimentación para ESP32

### Software
- Arduino IDE (para programar el ESP32)
- Docker y Docker Compose
- Node.js 20.18 o superior (si se ejecuta sin Docker)
- Git

## Configuración del Hardware

### Esquema de Conexión

#### Sensores Ultrasónicos
```
Sensor 1 (Espacio 2):
  TRIG -> GPIO 25
  ECHO -> GPIO 35
  VCC  -> 3.3V
  GND  -> GND

Sensor 2 (Espacio 3):
  TRIG -> GPIO 26
  ECHO -> GPIO 34
  VCC  -> 3.3V
  GND  -> GND
```

#### Servomotor
```
  Signal -> GPIO 33
  VCC    -> 3.3V
  GND    -> GND
```

#### Módulo RFID MFRC522
```
  SS   -> GPIO 5
  SCK  -> GPIO 18
  MOSI -> GPIO 23
  MISO -> GPIO 19
  RST  -> GPIO 22
  VCC  -> 3.3V
  GND  -> GND
```

### Configuración de Red

El ESP32 se conecta a una red WiFi para comunicarse con el servidor backend. Por defecto:
- **SSID**: `iPhone`
- **Contraseña**: `12123434`

Para modificar estas credenciales, editar el archivo `hardware/main/main.ino`:
```cpp
web_manager web_manager("TU_SSID", "TU_PASSWORD");
```

### Configuración de IP del Servidor

El ESP32 envía datos a la API backend mediante HTTP. La dirección IP debe configurarse en `hardware/main/web_manager_obj.h`:
```cpp
static constexpr const char* apiSpace = "http://192.168.137.1:3001/api/hardware/spaces/update";
```

Modificar `192.168.137.1` con la dirección IP de la computadora que ejecuta el backend.

### Tarjetas RFID Autorizadas

Para agregar tarjetas RFID autorizadas, editar el archivo `hardware/main/main.ino` en la función `setup()`:
```cpp
byte allowedUID1[] = {0xAD, 0x2A, 0xFD, 0x06};
entrance.addAllowedUID(allowedUID1);

byte allowedUID2[] = {0x65, 0x83, 0x21, 0x07};
entrance.addAllowedUID(allowedUID2);
```

## Instalación

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Tavo121/TECParking.git
cd TECParking
```

### 2. Configurar Librerías en Arduino IDE

Instalar las siguientes librerías desde el Administrador de Librerías de Arduino IDE:
- ArduinoJson
- ESP32Servo
- MFRC522v2

### 3. Cargar Firmware al ESP32

1. Abrir el archivo `hardware/main/main.ino` en Arduino IDE
2. Configurar el SSID y contraseña WiFi
3. Configurar la IP del servidor backend
4. Seleccionar la placa ESP32 y el puerto correspondiente
5. Compilar y cargar el programa

### 4. Configurar y Ejecutar el Sistema Web

#### Opción A: Usando Docker (Recomendado)

```bash
cd web
docker-compose up --build
```

Los servicios estarán disponibles en:
- Frontend: http://localhost:8080
- Backend: http://localhost:3001

#### Opción B: Ejecución Local

**Backend:**
```bash
cd web/backend
npm install
npm start
```

**Frontend:**
```bash
cd web/frontend
npm install
npm run dev
```

## Uso

### 1. Iniciar el Sistema

1. Conectar el ESP32 a una fuente de alimentación
2. Iniciar los contenedores Docker: `docker-compose up`
3. Verificar en el monitor serial que el ESP32 se conectó exitosamente al WiFi
4. Acceder a la interfaz web en `http://localhost:8080`

### 2. Funcionamiento

#### Control de Acceso
- Acercar una tarjeta RFID autorizada al lector
- El servomotor abrirá la barrera automáticamente
- La barrera se cerrará después de unos segundos

#### Monitoreo de Espacios
- El sistema detecta automáticamente cuando un vehículo ocupa un espacio
- El estado se actualiza en tiempo real en la interfaz web
- Los espacios se muestran con colores:
  - Blanco: Libre
  - Amarillo: Reservado
  - Rojo: Ocupado

#### Sistema de Reservas
- Iniciar sesión en la interfaz web
- Navegar a la sección "Mis Reservas"
- Seleccionar un espacio disponible para reservar



