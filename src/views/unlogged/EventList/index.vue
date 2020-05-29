<template>
  <v-container
		class="d-flex flex-column"
		fluid
	>
		<filters/>
		<v-layout justify-center wrap>
			<v-flex 
				color="secondary"
				lg9 md8 sm12 xs12
			>
				<ya-map/>
			</v-flex>
		</v-layout>
		<v-layout 
			class="my-8" 
			justify-center
			wrap
		>
			<v-flex
				xs12 sm10 md9
				v-for="i in events"
				:key="i.uuid"
			>
				<event-item 
					:event="i"
					:tickets="i.tickets"
					:tags="i.tags"
					:canSubscribe="true"
					:canView="true"
					:canEdit="false"
				/>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>

import yaMap from '@/components/helper/Ya-map';
import Filters from './Filters';
import EventItem from '@/components/helper/EventItem';

export default {
	name: 'EventList',

	components: {
		yaMap,
		Filters,
		EventItem,
	},

	computed: {
		events() {
			return this.$store.getters['nonauth/getEvents'];
		},
	},
}
</script>

<style lang="scss" scoped>
	// ::-webkit-scrollbar {
  //   width: 0px;
  //   background: transparent;
	// }
</style>