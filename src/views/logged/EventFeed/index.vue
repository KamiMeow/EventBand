<template>
  <v-layout wrap align-content-start>
		<v-toolbar 
			color="primary"
			class="white--text"
			flat 
		>
			<v-toolbar-title> Recommended content & Organizations news </v-toolbar-title>
		</v-toolbar>
		<v-tabs centered>
			<v-tab> Events </v-tab>
			<v-tab> Organizations </v-tab>
			<v-tab> News </v-tab>

			<v-tab-item>
				<events/>
			</v-tab-item>
			<v-tab-item>
				<organizations/>
			</v-tab-item>
			<v-tab-item>
				<organizations-news/>
			</v-tab-item>
		</v-tabs>
	</v-layout>
</template>

<script>
import OrganizationsNews from "./OrganizationsNews";
import Organizations from "./Organizations";
import Events from "./Events";

export default {
	name: 'EventFeed',
	
	components: {
		OrganizationsNews,
		Organizations,
		Events,
	},

	created() {
		this.$store.dispatch('profile/requestRecomendedContent');
		this.$store.dispatch('profile/requestOrganizationsNews');
	},
}
</script>