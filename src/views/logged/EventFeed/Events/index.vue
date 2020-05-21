<template>
	<v-layout
		class="pa-4"
		justify-start
		column
	> 
		<event-item
			v-for="event in events"
			:key="event.uuid"
			:event="event"
			:tickets="event.tickets"
			:tags="event.tags"
		/>
	</v-layout>
</template>


<script>
import EventItem from '@/components/helper/EventItem';

export default {
	name: 'Events',
	
	components: {
		EventItem,
	},

	computed: {
		events() {
			return this.$store.getters['profile/getRecomendedEvents'];
		},
	},

}
</script>