const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {

// The phone will emit a 'pair_watch' event. 
// On receiving this event, the server will emit a 'pairing_request' event. 'msg' is Optional. Could be Empty or a string. 
// The watch will listen for the 'pairing_request' event

  socket.on('pair_watch', msg => {
    io.emit('pairing_request', msg);
  });

// The watch will emit a 'pairing_response' event with msg = {"choice": "approve"} or {"choice": "reject"} 
// On receiving this event, the server will emit a 'watch_response' event with the same message
// The phone will listen for 'watch_response', and depending on the message (Approve/Reject), will either add the watch to the UI or ignore it. 
  socket.on('pairing_response', msg => {
    io.emit('watch_response', msg);
  });
  
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
