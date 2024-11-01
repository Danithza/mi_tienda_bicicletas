require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bicicletasRouter = require('./routes/bicicletas');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/bicicletas', bicicletasRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`); 
});
