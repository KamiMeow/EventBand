<template>
	<v-dialog 
		v-model="dialog"
		max-width="650px"
		persistent
		>
		<template #activator="{ on }">
			<v-btn
				v-on="on"
				@click="dialog = true"
				color="red"
				icon
			> 
				<v-icon> mdi-close-circle </v-icon>
			</v-btn>
		</template>

		<template #default>
			<v-card>
				<v-card-title class="headline" >
						<v-layout justify-center>
							Do you want to unsubscribe from the event?
						</v-layout>
				</v-card-title>
				<v-card-text class="title">
					<v-layout justify-center>
						Submit your action
					</v-layout>
				</v-card-text>
				<v-card-actions>
					<v-layout justify-space-around>
						<v-btn 
							color="warning"
							@click="dialog = false"
						>
							Back
						</v-btn>
						<v-btn
							color="error"
							@click="removeEventFromSubscribes"
						>
							unsubscribe
						</v-btn>
					</v-layout>
				</v-card-actions>
			</v-card>
		</template>
	</v-dialog>
</template>


<script>
export default {
	name: 'rejectEventDialog',

	props: {
		"event-uuid": {
			type: String,
			default: null,
		}
	},

	data: () => ({
		dialog: false,
	}),

	methods: {
		removeEventFromSubscribes() {
			console.log("event: removed!");
			this.dialog = false;
		},
	},
}
</script>