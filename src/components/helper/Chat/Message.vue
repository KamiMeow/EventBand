<template>
	<v-card 
		class="custom-elevation my-4"
		max-width="600px"
		min-width="400px"
	>
		<v-card-title>
			<v-layout align-center>
				<v-flex 
					class="mr-2"
					shrink
				>
					<v-avatar
						size="32"
					>
						<v-img
							:src="message.user.avatar"
						/>
					</v-avatar>
				</v-flex>
				<v-flex grow>
					<span class="title">
						{{message.user.nickname}}
					</span>
					<span class="caption grey--text">
						({{message.user.email}})
					</span>
				</v-flex>
			</v-layout>	
		</v-card-title>
		<v-card-text class="title font-weight-regular black--text pb-0">
			<v-layout
				:class="isMyMessage"
			>
				{{message.message}}
			</v-layout>
		</v-card-text>
		<v-card-actions>
			<v-spacer/>
			<span class="caption grey--text">
				{{message.createdAt | currentDateTime}}
			</span>
		</v-card-actions>
		<v-layout 
			v-if="isOrgLogged"
			class="pa-2"
			justify-center
		>
			<v-btn
				class="error darken-1"
				depressed
				small
				@click="removeMessage"
			>
				remove message
			</v-btn>
		</v-layout>
	</v-card>
</template>

<script>
export default {
	name: 'Message',

	props: {
		message: Object,
	},

	computed: {

		isMyMessage() {
			return this.message.user.isOwn ? 'justify-end' : 'justify-start';
		},
		
		isOrgLogged() {
			return this.$store.getters['auth/getIsLoggedAsOrganization'];
		}	
	},

	filters: {
		currentDateTime(dateTime) {
			if (!dateTime) return;			
			let date = dateTime.split('.')[0].replace('T', ' ');
			return date;
		},
	},

	methods: {
		removeMessage() {
			this.$store.dispatch('eventchat/removeMessage', this.message.uuid);
		},
	},

}
</script>