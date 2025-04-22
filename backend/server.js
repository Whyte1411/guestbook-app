const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let messages = [];

// POST /messages
app.post('/messages', (req, res) => {
    const { name, message } = req.body;
    if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required.' });
    }

    const newMessage = {
        id: Date.now(),
        name,
        message,
        timestamp: new Date().toISOString(),
    };

    messages.unshift(newMessage); // Add to beginning for newest-first order
    res.status(201).json({ success: true, message: newMessage });
});

// GET /messages
app.get('/messages', (req, res) => {
    res.json(messages);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
