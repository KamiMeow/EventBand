<template>
	<v-layout
		class="pa-4"
		justify-start
		column
	> 
		<v-alert 
			v-if="!events.length"
			type="info"
			class="text-center"
		>
			<span class="headline"> No recommended events </span>
		</v-alert>
		<template v-else>
			<event-item
				v-for="event in events"
				:key="event.uuid"
				:event="event"
				:tickets="event.tickets"
				:tags="event.tags"
				:canSubscribe="true"
				:canView="true"
				:canEdit="false"
			/>
		</template>
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