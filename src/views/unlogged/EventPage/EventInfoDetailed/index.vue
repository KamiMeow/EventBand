<template>
	<v-card class="custom-elevation">
		<v-layout column>
			<v-card-title>
				<span class="display-1 pb-6"> {{ event.name }} </span>
			</v-card-title>

			<v-card-subtitle>
				<span class="headline" > Description </span>
				<v-divider/>
			</v-card-subtitle>

			<v-card-text>
				<p class="subtitle-1">
					{{ event.name }}
				</p>
			</v-card-text>

			<yandex-map
				style="width: 100%; height: 300px" 
				:coords="coords"
				:controls="['zoomControl']"
				zoom="10"
				:scroll-zoom="false"
			>
				<ymap-marker 
					:markerId="1"
					:coords="coords"
				>
				</ymap-marker>
			</yandex-map>

			<v-card-subtitle>
				<span class="headline" > Tickets </span>
				<v-divider/>
			</v-card-subtitle>

			<v-layout
				class="px-4"
				justify-start
				wrap
			>
				<ticket-item
					v-for="(ticket, i) in tickets"
					:ticket="ticket"
					:key="i"
				/>
			</v-layout>
		</v-layout>			
	</v-card>	
</template>

<script>
import TicketItem from '../TicketItem';
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
	name: 'EventInfoDetailed',

	components: {
		TicketItem,
		ymapMarker,
		yandexMap,
	},

	computed: {
		event() {
			return this.$store.getters['nonauth/getCurrentEvent'].event;
		},
		tickets() {
			// return [];
			return this.$store.getters['nonauth/getCurrentEvent'].tickets;
		},
		coords() {
			let event = this.$store.getters['nonauth/getCurrentEvent'].event;
			let regexp = /\(|\)/g;
			let result = event.coords.replace(regexp,'').split(',').map(v => +v);
			
			return result;
		}
	},
}
</script>