<template>
  <v-layout 
		justify-space-around
		fill-height
		wrap
	>
		<v-flex xs12 sm12 md8 lg8
			class="pt-12 mb-5"
		>
			<event-info-detailed/>
		</v-flex>
		<v-flex xs12 sm12 md2 lg2
			class="pt-12 mb-5"
		>
			<event-info-main/>
		</v-flex>
	</v-layout>
</template>

<script>
import EventInfoDetailed from './EventInfoDetailed';
import EventInfoMain from './EventInfoMain';


export default {
	name: 'EventPage',

	components: {
		EventInfoDetailed,
		EventInfoMain,
	},

	data: () => ({
	}),

	created() {
		this.preloadInfo();
	},

	methods: {
		async preloadInfo() {
			await this.$store.dispatch('nonauth/requestEventInfo', this.$route.params.uuid);
			this.$store.dispatch('profile/getProfile');
		},
	},

}
</script>