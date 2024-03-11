const express = require('express');
const app = express();
const cors = require('cors');
const consulta = require('./consulta');

app.use(cors());
app.use(express.json());
app.use('/api', consulta);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
