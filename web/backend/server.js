const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json({ limit: '50mb' })); // Body parser
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Public routes (no authentication required)
//app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
});