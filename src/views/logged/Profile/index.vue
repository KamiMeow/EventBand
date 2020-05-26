<template>
	<v-layout 
		class="mt-5"
		justify-center
	>
		
		 <v-progress-circular
		 	v-if="profileIsLoading"
      :size="70"
      :width="7"
      color="accent"
			class="align-self-center"
      indeterminate
    ></v-progress-circular>
		<v-flex 
			v-else
			xs9
		>
			<v-card class="pa-4">
				<v-layout column>
					<user-info/>
					<user-own-organizations/>
					<user-subscriptions/> 
				</v-layout>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>

import UserInfo from './UserInfo';
import UserOwnOrganizations from './UserOwnOrganizations';
import UserSubscriptions from './Subscribes';

export default {
	name: 'Profile',

	components: {
		UserInfo,
		UserOwnOrganizations,
		UserSubscriptions,
	},
	
	data: () => ({
		profileIsLoading: true,
	}),

	created() {
		this.getProfile();
	},

	methods: {
		async getProfile() {
			if (this.isLoggedAsOrganization) return;
			this.profileIsLoading = true;
			await this.$store.dispatch('profile/getProfile');
			this.profileIsLoading = false;
		},
	},

	computed: {
		isLoggedAsOrganization() {
			return this.$store.getters['auth/getIsLoggedAsOrganization'];
		}
	},

};
</script>

<style lang="scss">
	::-webkit-scrollbar {
    width: 0px;
    background: transparent;
	}
</style>