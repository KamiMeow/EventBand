<template>
	<v-layout>
		<v-tabs
      background-color="primary"
      dark
    >
			
      <v-tabs-slider></v-tabs-slider>

      <v-tab
        :href="`#tab-events`"
      >
        Events
      </v-tab>
      <v-tab
        :href="`#tab-organizations`"
      >
        Organizations
      </v-tab>

      <v-tab-item
        :value="`tab-events`"
      >
        <v-container
					class="pa-5"
					fluid
				>
					<v-layout wrap justify-center align-center>
						<v-alert 
							v-if="!events.length"
							type="info"
							border="top"
							>
							<span class="headline">
								You are not subscribed to any events
							</span>
						</v-alert>
						<template v-else> 
							<v-flex
								xs12
								v-for="item in events"
								:key="item.uuid"
							>
								<subscribe-item 
									:stableSubInfo="item"
									itemType="Event"
								/>
							</v-flex>
						</template>
					</v-layout>
				</v-container>
      </v-tab-item>
      <v-tab-item
        :value="`tab-organizations`"
      >
        <v-container
					class="pa-5"
					fluid
				>
					<v-layout wrap justify-center align-center>
						<v-alert 
							v-if="!organizations.length"
							type="info"
							border="top"
							>
							<span class="headline">
								You are not subscribed to any organizations
							</span>
						</v-alert>
						<template v-else> 
							<v-flex
								xs12
								v-for="item in organizations"
								:key="item.uuid"
							>
								<subscribe-item 
									:stableSubInfo="item"
									itemType="Organization"
								/>
							</v-flex>
						</template>
					</v-layout>
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

	computed: {
		organizations() {
			return this.$store.getters['profile/getUserSubOrganizations'];
		},

		events() {
			return this.$store.getters['profile/getUserSubEvents'];
		},
	},
}
</script>

<style lang="scss">
	
</style>