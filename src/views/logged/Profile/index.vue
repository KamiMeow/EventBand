<template>
	<v-layout 
		class="mt-5"
		justify-center
	>
		<v-flex xs9>
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
	
	created() {
		this.$store.dispatch('profile/getProfile');
	},

};
</script>

<style lang="scss">
	::-webkit-scrollbar {
    width: 0px;
    background: transparent;
	}
</style>