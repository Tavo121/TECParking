const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const hardwareRoutes = require('./routes/hardwareRoutes')
const authRoutes = require('./routes/authRoutes')


app.use(express.json({ limit: '50mb' })); // Body parser
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Public routes (no authentication required)
app.use('/api/hardware', hardwareRoutes);
app.use('/api/auth', authRoutes)

app.listen(PORT, '0.0.0.0', () => {
});