// La idea de este código es que se pueda permitir 
// o restringir la entrada al parqueo por medio del lector 
// de tarjetas RFID.

// Cuando una tarjeta RFID sea leída, se debe comparar con 
// una lista de tarjetas permitidas. 
// Si la tarjeta es permitida, se debe abrir el servo. 
// En caso contrario, se debe mantener cerrado el servo.

// La lista de tarjetas permitidas se puede almacenar en un array o vector.
// Guardando el UID de cada tarjeta permitida. 
// Se debe imprimir en el monitor serial el UID de la tarjeta leída y si se permitió o no la entrada.

// Este código se apoyará de rfid_obj.cpp para la lectura de las tarjetas RFID, y de servo.cpp para el control del servo.