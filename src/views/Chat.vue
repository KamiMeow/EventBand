<template>
	<v-layout>

	</v-layout>
</template>

<script>
import io from 'socket.io-client';

const socket = io('http://localhost:5001/');
socket.on('connect', function(){
	console.log('i`m connected');
	
});
// socket.on('event', function(data){});
socket.on('disconnect', function(){
	console.log('i`m disconnected');
});

export default {
	name: 'Chat',

	data: () => ({
		socket: socket,
	}),
}
</script>