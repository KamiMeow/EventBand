<template>
	<v-card 
		class="custom-elevation my-4"
		max-width="600px"
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
	},

	filters: {
		currentDateTime(dateTime) {
			if (!dateTime) return;
			// console.log(dateTime.splice(dateTime.indexOf('.')).replace('T', ' '));
			
			let date = dateTime.split('.')[0].replace('T', ' ');
			return date;
		},
	},

}
</script>