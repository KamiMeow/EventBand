<template>
	<!-- <v-responsive :aspect-ratio="16/9"> -->
		<yandex-map
			:style="styleWidthAndHeight" 
			:coords="[55.75370903771494, 37.61981338262558]"
			:controls="['zoomControl']"
			zoom="10"
			@map-was-initialized="getYaMap"
		>
			<ymap-marker
				v-for="(c, i) in eventsCoords"
				:key="i"
				marker-id="i"
				:coords="c.coord"
				:hint-content="c.balloonTemplate"
			/>
		</yandex-map>
	<!-- </v-responsive> -->
</template>

<script>

import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
	name: "ya-map", 

	props: {
		events: Array,	
	},
	
	components: {
		yandexMap,
		ymapMarker,
	},

	computed: {
		eventsCoords() {
			return this.$store.getters['nonauth/getEvents'].map( e => {
				let coord = e.coords.split(',').map(c => +c);
				console.log('coords', coord);
				return {
					coord: coord,
					balloonTemplate: `
						<div class="title">${e.name}</div>
						<p> ${e.description} </P>
					`,
				}
			});
		},

		aspectRatio() {
			let width = this.$vuetify.breakpoint.width;
			let height = this.$vuetify.breakpoint.height;
			return width / height;
		},

		styleWidthAndHeight() {
			let width = this.$vuetify.breakpoint.width;
			let height = this.$vuetify.breakpoint.height;
			return `width: ${width / (16/9)}px; height: ${height / (16/9)}px;`;
		},
	},
	
	methods: {
		getYaMap(instance) {	
		},
	},
}
</script>