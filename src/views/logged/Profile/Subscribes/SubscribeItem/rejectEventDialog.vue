<template>
	<v-dialog 
		v-model="dialog"
		max-width="650px"
		persistent
		>
		<template #activator="{ on }">
			<v-btn
				v-on="on"
				@action="dialog = true"
				color="error"
			>
				unsubscribe
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
							@click="removeItemFromSubscribes"
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
import tooltip from '@/components/helper/TooltipButton.vue';

export default {
	name: 'rejectEventDialog',

	props: [ "subUuid", "subType" ],

	components: {
		tooltip,
	},

	data: () => ({
		dialog: false,
	}),

	methods: {
		removeItemFromSubscribes() {
			console.log(this.subType, this.subUuid);
			this.$store.dispatch(`profile/removeUserSubscribe${this.subType}`, this.subUuid);
			return this.dialog = false;
		},

		/** Frozen */
		/*defineAction() {

			switch (this["sub-type"]) {
				case "Event": {
					this.$store.dispatch("removeUserSubscribeEvent", this["sub-uuid"]);
					break;
				}
			}
		}*/
	},
}
</script>