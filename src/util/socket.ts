import io from "socket.io-client";
let socket = io("http://localhost:1234/");

export class Socket{
    emit(event,data){
      socket.emit(event,data)
    }
    getData(event,handler){
        socket.on(event,handler)
    }
    setRoom(data){
        socket.emit("made_room",data)
    }
    joinRoom(_id){
        socket.emit("join_room",_id)
    }
    leaveRoom(_id){
        socket.emit("leave_room",_id)
    }
    close(){
        socket.close()
    }
    connect(){
        socket = io("http://localhost:1234/");
    }
}