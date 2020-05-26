<template>
	<v-card class="custom-elevation">
		<v-layout 
			justify-space-around
			column
		>
			<v-card-title> 
				<v-layout justify-center> Menu </v-layout> 
			</v-card-title>
			<new-organization-dialog/>
			<v-btn
				class="my-2"
				color="primary"
				@click="openEditOrganizationForm"
			>
				Edit organization info
			</v-btn>
			<v-btn
				class="my-2"
				color="primary"
				to="/my-organization/event/create"
			>
				Create event
			</v-btn>
			<v-btn
				class="my-2"
				color="primary"
				@click="openCreateNewsForm"
			>
				Create news
			</v-btn>
			<v-btn
				class="my-2"
				color="primary"
				@click="logoutAsOrganization"
			>
				Back to user profile
			</v-btn>

		</v-layout>
	</v-card>
</template>

<script>
import NewOrganizationDialog from './NewOrganizerDialog';

export default {
	name: 'MenuControl',

	components: {
		NewOrganizationDialog,
	},

	methods: {
		openEditOrganizationForm() {
			this.$router.push('/my-organization/edit');
		},

		openCreateEventForm() {
			console.log('open create event form!');
		},

		openCreateNewsForm() {
			this.$router.push('/my-organization/news/create');
		},
		
		logoutAsOrganization() {			
			this.$store.dispatch('auth/logoutAsOrganization');
			this.$router.replace('/profile');
		},
	},
}
</script>