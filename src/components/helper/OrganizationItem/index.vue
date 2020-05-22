<template>
	<v-card 
		:max-width="maxWidth"
		min-width="500"
		:tile="tile"
		:outlined="outlined"
		:flat="flat"
	>
		<v-toolbar
			color="primary"
			dense
		>
			<v-card-title class="pa-0">
				<v-layout align-center>
					<slot name="prependTitleContent"></slot>
					<span class="grey--text text--lighten-3"> {{ organization.name + ' ' }} </span>
					<slot name="appendTitleContent"></slot>
				</v-layout>
			</v-card-title>
		</v-toolbar>
		<v-card-subtitle>
			<span class="black--text">
				{{ organization.description }}
			</span>
		</v-card-subtitle>
		<v-card-actions>
			<v-layout justify-end>
				<template v-if="forSubscribe">
					<v-btn 
						:loading="loading"
						color="success"
						small
						@click="subscribe"
					>
						Subscribe
					</v-btn>
				</template>
				<template v-else-if="forView">
					<v-btn 
						color="success"
						small
						to="/"
					>
						View
					</v-btn>
				</template>
			</v-layout>
		</v-card-actions>
		<v-snackbar
			v-model="snackbar"
			:color="type"
		>
			{{ snackbarMessage }}
			
			<v-btn 
				icon
				@click="snackbar = false"
			>
				<v-icon> mdi-close </v-icon>
			</v-btn>
		</v-snackbar>
	</v-card>
</template>

<script>
export default {
	name: 'OrganizationItem',

	props: {
		organization: Object,
		forSubscribe: {
			type: Boolean,
			default: true,
		},
		forView: {
			type: Boolean,
			default: false,
		},
		tile: {
			type: Boolean,
			default: false,
		},
		flat: {
			type: Boolean,
			default: false,
		},
		outlined: {
			type: Boolean,
			default: false,
		},
		"maxWidth": {
			type: Number || String,
			default: undefined,
		},
	},

	data: () => ({
		loading: false,
		snackbarType: 'info',
		snackbar: false,
		snackbarMessage: 'no message',
	}),

	methods: {
		async subscribe() {
			this.loading = true;
			let response = await this.$store.dispatch('profile/subscribeOnOrganization', this.organization.uuid);
			this.snackbar = true;
			this.loading = false;
			this.snackbarType = response.type;
			this.snackbarMessage = response.message;
		},
	},

	computed: {

		type() {
			return this.snackbarType;
		},
	},
}
</script>