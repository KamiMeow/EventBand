<template>
	<v-layout wrap justify-center>
		<v-flex xs10>
			<v-card>
				<yandex-map
					style="width: 100%; height: 500px" 
					:coords="coords"
					:settings="settings"
					:controls="['zoomControl', 'searchControl']"
					zoom="10"
					@click="changeMarkerPosition"
				>
					<ymap-marker 
						:markerId="1"
						:coords="coords"
					>
					</ymap-marker>
				</yandex-map>
			</v-card>
		</v-flex>
		<v-flex xs6>
			<v-layout justify-center>
				<v-btn 
					color="success"
					@click="submitEventPlace"
				>
					Submit place
				</v-btn>
			</v-layout>
		</v-flex>
	</v-layout>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

const settings = {
  apiKey: '8f4217b3-fd58-486f-aff3-301ef4343996',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
}

export default {
	name: 'EventPlaceBlock',

	components: {
		yandexMap, 
		ymapMarker,
	},

	created() {
		this.setDataForEditEvent();
	},

	data: () => ({
		coords: [
			55.75,
			37.6167,
		],

		settings,
	}),

	computed: {
		isEditEvent() {
			return this.$store.getters['organization/getIsOnEdit'];
		},

		editableEvent() {
			return this.$store.getters['organization/getEditableEvent'];
		},
	},

	methods: {
		setDataForEditEvent() {
			if (!this.isEditEvent) return;

			this.coords = this.editableEvent.coords.split(',').map( c => +c);
		},

		changeMarkerPosition(e) {
			this.coords = e.get('coords');
		},

		submitEventPlace() {
			if (this.isEditEvent) {
				console.log(this.coords.join(','), typeof(this.coords.join(',')));
				
				return this.$store.dispatch('organization/setEventPlaceBlock', this.coords.join(','));
			}

			this.$emit('handle-event-place-block', {
				coords: this.coords.join(','),
			});
		},
	},
}
</script>