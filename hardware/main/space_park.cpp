// Esta será la lógica que usará la información de los 
// ultrasónicos para saber si el carro está estacionado o no.

// Entonces, cuando un ultrasonico mida una distancia menor a 10cm
// existe un carro estacionado. 

// Cuando un auto se estacione, se debe enviar un POST a la API
// con el endpoint /spaces/update con el body {"id": 1, "status": "occupied"}

// Cuando un auto se retire, se debe enviar un POST a la API
// con el endpoint /spaces/update con el body {"id": 1, "status": "available"}