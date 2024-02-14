const express = require('express');
const expressWs = require('express-ws');
const app = express();

expressWs(app);

app.ws('/websocket', (ws, req) => {
  ws.on('message', (message) => {
    ws.send(message);
  });
});

app.get('/websocket', (req, res) => {
  res.sendFile(__dirname + '/websocket.html');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
