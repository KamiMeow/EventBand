<template>
  <v-container
		class="d-flex flex-column"
		fluid
	>
	<v-layout
		wrap
		style="height: 90vh; max-height: 90vh;"
	>
		<v-flex lg9 md8 sm12 xs12
			color="secondary">
			<ya-map/>
		</v-flex>
		<v-flex 
			style="height: 90vh; max-height: 90vh;"
			lg3 md4 sm12 xs12>
			<filters/>
		</v-flex>
	</v-layout>
	<v-layout
		style="height: 85vh; max-height: 85vh; overflow-y: auto; width: 80vw;"
		class="my-8 d-flex flex-column align-center custom-elevation px-10 align-self-center" 
	>
		<event-item
			v-for="i in 5"
			:key="i"
		/>
	</v-layout>
	</v-container>
</template>

<script>

import yaMap from './Ya-map';
import Filters from './Filters';
import EventItem from './EventItem';

export default {
	name: 'EventList',

	components: {
		yaMap,
		Filters,
		EventItem,
	},
}
</script>

<style lang="scss" scoped>
	::-webkit-scrollbar {
    width: 0px;
    background: transparent;
	}
</style>