<template>
	<v-responsive :aspect-ratio="16/9">
		<yandex-map
			style="width: 100%; height: 100%;" 
			:coords="[54.62896654088406, 39.731893822753904]"
			:controls="['zoomControl']"
			zoom="10"
			@map-was-initialized="getYaMap"
		/>
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
	
	methods: {
		getYaMap(instance) {
			console.log(instance);
		}
	},
}
</script>