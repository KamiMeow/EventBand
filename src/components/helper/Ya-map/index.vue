<template>
	<v-responsive :aspect-ratio="16/9">
		<yandex-map
			style="width: 100%; height: 100%;" 
			:coords="[55.75370903771494, 37.61981338262558]"
			:controls="['zoomControl']"
			zoom="10"
			:scroll-zoom="false"
			@map-was-initialized="getYaMap"
		>
			<slot> </slot>
		</yandex-map>
	</v-responsive>
</template>

<script>

import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
	name: "ya-map", 

	components: {
		yandexMap,
		ymapMarker,
	},

	data: () => ({
		yaMap: null,
	}),
	
	methods: {
		getYaMap(instance) {
			this.yaMap = instance;
			// console.log(this.yaMap.GeoObjectCollection);
			
		}
	},
}
</script>