const express = require('express');
const app = express();

app.get('/api/v1/', (req, res) => {
    res.json({
        "Projeto": "Em desenvolvimento"
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
