import * as socketio from "socket.io";
let IO ;
function init(server){

	const io = new socketio.Server(server,{
		cors: {
			origin: "*",
			methods: ["GET", "POST"]
		}
	});
	IO = io ;

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

		socket.on('join.customer', function(data, fn){
			console.log('## join.customer: ', data, ' ##');
			subscribe(socket, {roomName:"Customer"}, fn);
		})
		socket.on('join.employee', function(data, fn){
			console.log('## join.employee: ', data, ' ##');
			subscribe(socket, {roomName:"Employee"}, fn);
		})

		socket.on('client.list', function(data, fn){
			const ioinstance = io.of("/") ;
			const roomsMap = ioinstance.adapter.rooms;
			const roomsObj = Object.fromEntries(roomsMap) ;
			for ( let room in roomsObj){
				roomsObj[room] = [...roomsObj[room]] ;
			}
			fn(roomsObj);
		});

		socket.on('client.count', function(data, fn){
			const roomsMap = io.sockets.adapter.rooms; // Map<string, Set<string>>
			let roomsObj = {};
			roomsMap.forEach((roomSet,key)=>{
				roomsObj[key] = roomSet.size;
			})
			fn(roomsObj);
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

function sendMsgToRoom(roomName, eventName, message){
	console.log('sendMsgToRoom:', roomName, eventName, message);
	const roomList = ['EXCHANGE_ROOM',roomName];
	IO.to(roomList).emit(eventName, message);
}

function roomClientsCount(roomName){
	const roomMap = IO.sockets.adapter.rooms ;
	const roomSet = roomMap.get(roomName);
	return roomSet.size;
}

export default {init:init,sendMsgToRoom:sendMsgToRoom};