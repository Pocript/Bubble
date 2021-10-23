var app = require("express")();
const http = require("http").createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" } });

let room:object[] = []
let thisRoom = {}

export class Server {
  public start(port: number) {
    const httpServer = http.listen(port, () => {
     console.log(`[\x1b[36mINFO\x1b[0m] connected to port ${port}`);
    });
    io.on('connection', function (socket) {
  console.log(socket.id, 'Connected');
  
  socket.on('message', function (data) {
      console.log(io.adapter.rooms)
    console.log(socket.id, data);                               //
    socket.broadcast.to(data.room).emit('message', {
        msg:data.msg,
        room:data.room});
    
  });
  socket.on('made_room', function (data:object) {
    console.log(data)
    room.push(data)
  });
  socket.on('get_roomlist', function () {
    socket.emit('get_roomlist', room);
  });
  socket.on('join_room', function (_id:number) {
     console.log(`${socket.id}님이 접속중인 방이 ${_id}바뀌었습니다.`)
    socket.join(_id);
    io.to(_id).emit('noti_message', {msg:`${socket.id}님이 입장했습니다.`,room:_id});
  });
  socket.on('leave_room', function (_id:number) {
    console.log(room[_id])
    socket.leave(_id);
    io.to(_id).emit('noti_message', `${socket.id}님이 퇴장했습니다.`);
  });
  socket.on('disconnect', function() {
      //let userRoom = io.sockets.adapter.sids
      //console.log('disconnect '+JSON.stringify(userRoom))
  })
  
  
    }) 
  }
}