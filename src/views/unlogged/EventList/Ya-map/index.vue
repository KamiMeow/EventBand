<template>
	<v-layout>
		<v-responsive :aspect-ratio="16/9">
			<yandex-map
				style="width: 100%; height: 100%;" 
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
		</v-responsive>
	</v-layout>
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

		baloonTemplate() {
      return `
        <h1 class="red">Hi, everyone!</h1>
        <img src="http://via.placeholder.com/350x150">
      `
    }
	},
	
	methods: {
		getYaMap(instance) {	
		},
	},
}
</script>