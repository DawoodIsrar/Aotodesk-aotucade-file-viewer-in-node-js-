const express = require('express');
const { PORT } = require('./config.js');
const dimension = require('./services/forge/dimension')
let app = express();
app.use(express.static('wwwroot'));
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/models', require('./routes/models.js'));
//listen to the server on port
app.listen(PORT, function () { console.log(`Server listening on port ${PORT}...`); });
