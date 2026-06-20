const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const PORT = process.env.PORT || 3001;

const hardwareRoutes = require('./routes/hardwareRoutes')
const authRoutes = require('./routes/authRoutes')

// Crear servidor HTTP con Socket.io
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Almacenar instancia de io en app para acceso global
app.io = io;

app.use(express.json({ limit: '50mb' })); // Body parser
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Public routes (no authentication required)
app.use('/api/hardware', hardwareRoutes);
app.use('/api/auth', authRoutes)

// Manejar conexiones de Socket.io
io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);
    
    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});