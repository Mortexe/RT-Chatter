const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/public/index.html');
});

var userCount = 0;
var uniqueID = -1;
var users = {
  priv : [],
  public : []
};

io.on('connection', (socket) => {
  console.log('user connected');

  uniqueID++;
  var priv = {};

  socket.on('message', (msg) =>{
    var user = users.public[priv.uniqueID];

    io.emit('message', {
      "msg": msg,
      "color": user.color,
      "time": new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
      "nick": user.nick
  });
});


	socket.on('command', function(req)
	{
		console.log(req);
	});

socket.on('updateProfile', function(data)
	{
		users.public[priv.uniqueID] = data;
		io.sockets.emit('sysmessage', { "users" : users.public, "count" : usercount});
	});

  socket.on('onConnect', function(data)
	{


		priv.uniqueID = uniqueID;
		users.public[priv.uniqueID] = data;

		// io.emit('uniqueID', user.uniqueID);
		io.sockets.emit('sysmessage', { "users" : users.public});
	});

});
