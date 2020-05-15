<template>
	<v-layout
		
	>
		<v-flex xs2 md2>
			<v-img
				:src="stableSubInfo.path"
				max-width="128px"
			/>
		</v-flex>
		<v-flex xs6 md6>
			<v-layout 
				fill-width
			> {{ stableSubInfo.name }} </v-layout>
			<v-layout class="text-truncated" fill-width> {{ stableSubInfo.description }} </v-layout>
		</v-flex>
	</v-layout>
</template>

<script>
import rejectEventDialog from './rejectEventDialog';

export default {
	name: 'SubscribeItem',

	props: {
		"stableSubInfo": {
			type: Object,
			default: () => ({
				path: "/Avatar.png",
				name: "no-name",
				description: "no-description",
			})
		},
		"optional": {
			type: Object,
			default: () => ({ isEmpty: true, }),
		},
	},

	components: {
		rejectEventDialog,
	},
}
</script>