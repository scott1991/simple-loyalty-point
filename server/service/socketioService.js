import * as socketio from "socket.io";
function init(server){

	let io = new socketio.Server(server);
	var ROOM_MAP = {};

	io.on('connection', function(socket){
		console.log('@@@@@@ CONNECTED. @@@@@@')

		socket.on('disconnect', function(){
			console.log('@@@@@@ SOCKET DISCONNECT! @@@@@@', socket.id);
		});
		socket.on('client.subscribe', function(data, fn){
			console.log('@@@@@@ SUBSCRIBE: ', data, ' @@@@@@');
			subscribe(socket, data, fn);
		})
		socket.on('client.unsubscribe', function(data, fn){
			console.log('@@@@@@ UNSUBSCRIBE: ', data, ' @@@@@@');
			unsubscribe(socket, data, fn);
		});

		socket.on('client.list', function(data, fn){
			const rooms = io.of("/").adapter.rooms;
			// io.sockets.adapter.rooms.get("room1")
			// io.sockets.clients('room1');
			// io.of("/").in("room1").allSockets();

			fn(ROOM_MAP);
		});

	})

	return {
		io: io
	};
}

function subscribe(socket, data, fn){
	var roomName = data.roomName;
	if(roomName){
		socket.join(roomName);
		fn({result:true});
	}else{
		fn({result:false, message:'roomName not defined.'});
	}
}

function unsubscribe(socket, data, fn){
	var roomName = data.roomName;
	if(roomName){
		socket.leave(roomName);
		fn({result:true});
	}else{
		fn({result:false, message:'roomName not defined.'});
	}
}

export default {init:init};