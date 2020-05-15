<template>
	<v-layout 
		class="subscribes-height"
	>
		<v-tabs
      background-color="primary"
      centered
      dark
    >
			
      <v-tabs-slider></v-tabs-slider>

      <v-tab
        v-for="i in tabs"
        :key="i.id + i.title"
        :href="`#tab-${i.id}`"
      >
        {{ i.title }}
      </v-tab>

      <v-tab-item
        v-for="i in tabs"
        :key="i.id + i.title"
        :value="'tab-' + i.id"
      >
        <v-container
					class="pa-5"
					fluid
				>
					<subscribe-item/>
				</v-container>
      </v-tab-item>
    </v-tabs>
	</v-layout>
</template>

<script>
import SubscribeItem from './SubscribeItem';

const tabs = [
	{
		id: 1,
		title: 'Events',
	},
	{
		id: 2,
		title: 'Organizations',
	}
];

export default {
	name: 'Subscribes',

	components: {
		SubscribeItem,
	},

	data: () => ({
		tabs,
	}),
}
</script>

<style lang="scss">
	.subscribes-height {
		height: 80vh;
	}
</style>