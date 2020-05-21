<template>
	<v-card 
		max-width="750"
		min-width="500"
	>
		<v-toolbar
			color="primary"
			dense
		>
			<v-card-title class="pa-0">
				<span class="grey--text text--lighten-3"> {{ organization.name }} </span>
			</v-card-title>
		</v-toolbar>
		<v-card-subtitle>
			<span>
				{{ organization.description }}
			</span>
		</v-card-subtitle>
		<v-card-actions>
			<v-layout justify-end>
				<v-btn 
					color="success"
					:loading="loading"
					small
					@click="subscribe"
				>
					Subscribe
				</v-btn>
			</v-layout>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: 'OrganizationItem',

	props: {
		organization: Object,
		loading: false,
	},

	methods: {
		subscribe() {
			this.loading = true; return;
			this.$store.dispatch('profile/subscribeOnOrganization');
		},
	},
}
</script>