<template>
	<v-layout wrap align-content-start>
		<v-flex
			xs10
			v-for="m in prevMessages"
			:key="m.uuid"
			class="d-flex"
			:class="{ 'ml-auto': (m.user.isOwn && !isOrgLogged) }"
		>
			<message
				:key="m.uuid"
				:message="m"
			/>
		</v-flex>	
	</v-layout>
</template>

<script>
import Message from '@/components/helper/Chat/Message';

export default {
	name: 'ChatHistory',

	components: {
		Message,
	},

	created() {
		this.requestMessages();
	},

	computed: {
		prevMessages() {
			return this.$store.getters['eventchat/getChatMessages'];
		},

		isOrgLogged() {
			return this.$store.getters['auth/getIsLoggedAsOrganization'];
		},
	},

	methods: {
		requestMessages() {
			this.$store.dispatch('eventchat/requestChatMessages', this.$store.getters['evenchat/getChatUuid']);
		},
	},
	
}
</script>