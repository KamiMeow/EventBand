<template>
	<v-layout justify-end>
		<v-btn
			color="success darken-1"
			right
			@click="openChat"
		>
			Chat
			<v-icon right>
				mdi-chat
			</v-icon>
		</v-btn>
		<dialog-base
			v-model="dialog"
			:persistent="true"
			maxWidth="800px"
			height="80vh"
			:title="`Event chat: ${connectedUsersCount} users`"
			@close-dialog="leaveFromChat"
		>
			<v-card 
				class="elevation-0"
			>
				<v-layout column 
					ref="chat"
					class="chat-container"
				>
					<v-flex
						v-for="m in prevMessages"
						:key="m.uuid"
						class="d-flex"
						:class="{ 'ml-auto': m.user.isOwn }"
					>
						<message
							:key="m.uuid"
							:message="m"
						/>
					</v-flex>	
					<v-flex
						v-for="(m, i) in messages"
						:key="i"
						class="d-flex"
						:class="{ 'ml-auto': m.user.isOwn }"
					>
						<message
							:key="i"
							:message="m"
						/>
					</v-flex>				
				</v-layout>
			</v-card>
			<template #afterContent>
				<v-text-field
					v-model="newMessage"
					append-icon="mdi-send"
					label="Message"
					single-line
					counter
					filled
					@click:append="sendMessage"
					@keyup.enter="sendMessage"
				/>
			</template>
		</dialog-base>
	</v-layout>
</template>

<script>
import DialogBase from '@/components/base/DialogBase';
import Message from './Message';
import io from 'socket.io-client';


export default {
	name: 'Chat',

	components: {
		DialogBase,
		Message,
	}, 

	data: () => ({
		dialog: false,
		newMessage: '',
		socket: null,
		messages: [],
		info: [],
		connections: 0,
	}),	

	computed: {
		prevMessages() {
			return this.$store.getters['chat/getMessages'];
		},
		connectedUsersCount() {
			return this.connections;
		},

		user() {
			return this.$store.getters['profile/getActualUser'];
		},
	},

	methods: {
		openChat() {
			this.socket = io('https://event-band-api.ru:5000/', {
				autoConnect: false,
				query: {
					chatUuid: this.$store.getters['nonauth/getCurrentEvent'].chatUuid,
				},
				transportOptions: {
					polling: {
						extraHeaders: {
							'authorization': this.$store.getters['auth/getToken'],
						},
					},
				}
			});
			this.setEventsHandlers();
			this.dialog = true;
			this.socket.open();						
			let timer = setTimeout(() => {
				const el = document.querySelector('.chat-container');
				el.lastChild.scrollIntoView();
				clearTimeout(timer);
			}, 500);
		},

		getPreviousMessage() {
			let uuid = this.$store.getters['nonauth/getCurrentEvent'].chatUuid;
			console.log(uuid);
			
			this.$store.dispatch('chat/getPreviousMessages', uuid);
		},

		setEventsHandlers() {
			this.socket.on('connections', (data) => {
				console.log('connections',data);
				
				this.connections = data;
			});

			this.socket.on('connect', () => {
				console.log('i`m connected to chat', this.socket);
				this.getPreviousMessage();
			});

			this.socket.on('disconnect', () => {
				console.log('i`m disconnected from chat');
			});

			this.socket.on('inbox', (data) => {
				console.log('inbox', data);
				this.messages.push(data);
				this.$nextTick(() => {
					document.querySelector('.chat-container').lastChild.scrollIntoView({behavior: "smooth"});
				})
			});

			this.socket.on('joined', (data) => {
				this.connections = data.connections;
				console.log('joined',data);
			});

			this.socket.on('error', (data) => {
				console.log('error', data);
			});
			
			this.socket.on('user-leave', (data) => {
				console.log(data.connections);
				
				this.connections = data.connections;
			});
		},

		leaveFromChat() {
			this.messages.splice(0, this.messages.length);
			this.socket.emit('leave-chat');
			this.socket.close();
		},

		sendMessage() {
			if (!this.newMessage.trim()) return;

			let message = this.newMessage.split(' ').map( w => w.trim()).filter( m => m).join(' ');

			this.socket.emit('send', this.newMessage);
			this.messages.push({
				user: {
					nickname: this.user.nickname,
					email: this.user.email,
					avatar: this.user.avatar,
					isOwn: true,
				},
				createdAt: new Date().toISOString(),
				message: message,
			});
			console.log('noth');
			
			this.$nextTick(() => {
				document.querySelector('.chat-container').lastChild.scrollIntoView({behavior: "smooth"});
			});
			this.newMessage = '';
		},
	},


}
</script>