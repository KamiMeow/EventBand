<template>
  <v-container
		style="height: 100%;"
		fluid
	>
	<v-layout>
		<v-col
			color="secondary"
			cols="9">
			<ya-map/>
		</v-col>
		<v-divider vertical ></v-divider>
		<filters/>
	</v-layout>
	</v-container>
</template>

<script>

import yaMap from './Ya-map';
import Filters from './Filters';

export default {
	name: 'EventList',

	components: {
		yaMap,
		Filters,
	},
}
</script>