<template>
  <v-container
		class="d-flex flex-column"
		fluid
	>
		<v-layout
			style="height: 90vh; max-height: 90vh;"
			wrap
		>
			<v-flex 
				color="secondary"
				lg9 md8 sm12 xs12
			>
				<ya-map/>
			</v-flex>
			<v-flex lg3 md4 sm12 xs12 >
				<filters/>
			</v-flex>
		</v-layout>
		<v-layout 
			class="my-8" 
			justify-center
			wrap
		>
			<v-flex
				xs12 sm10 md9
				v-for="i in 5"
				:key="i"
			>
				<event-item/>
			</v-flex>
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
	// ::-webkit-scrollbar {
  //   width: 0px;
  //   background: transparent;
	// }
</style>