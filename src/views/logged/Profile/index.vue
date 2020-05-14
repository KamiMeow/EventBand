<template>
  <v-layout 
		class="px-12 py-10 mb-10"
		justify-center 
		column 
	>
    <v-layout
			class="custom-elevation"
			align-content-center
			column
		>
      <v-layout>
        <v-col class="pr-0 ma-0" cols="2">
          <v-img
						class="pa-0 ma-0"
						:src="userAvatar"
						max-width="128"
					/>
        </v-col>

        <v-col
					class="d-flex flex-column justify-start align-start ml-0 pl-0"
					cols="8"
				>
          <v-btn
						class="display-1 pa-0"
						x-large
						left
						text
						tile
					>
						{{ nickname }}
					</v-btn>
          <v-btn
						class="title pa-0"
						disabled
						x-large
						left
						text
						tile
					> 
						{{ email }} 
					</v-btn>
        </v-col>

        <v-col cols="2" >
          <edit-profile-form/>
          <change-password-form/>
					<create-organization-form btnText="Create organization"/>
        </v-col>
      </v-layout>

      <v-layout 
				class="px-4"
				justify-start
				column
			>
          <div class="headline">My own organizations</div>
					<v-divider></v-divider>
					<v-layout
						style="overflow-x: auto; height: fit-content"
						class="my-2"
						fill-width
					>
					<template v-if="!organizations.length">
						<v-layout class="dislay-2 grey--text" justify-center>
							<create-organization-form 
								btnText="NO ORGANIZATIONS"
							/>
						</v-layout>
					</template>
					<template v-else>
						<horizontal-carousel class="px-8"> 
							<organization-item
								v-for="org in organizations"
								:key="org.uuid"
								:organization="org"
							/>
						</horizontal-carousel>
					</template>
					</v-layout>
      </v-layout>
			<subscribes class="px-4" />
    </v-layout>
  </v-layout>
</template>

<script>
import HorizontalCarousel from '@/components/helper/HorizontalCarousel';
import OrganizationItem from './OrganizationItem';
import EditProfileForm from './EditProfileForm';
import ChangePasswordForm from './ChangePasswordForm';
import Subscribes from './Subscribes';
import CreateOrganizationForm from './CreateOrganizationForm';

export default {
	name: 'Profile',

	components: {
		CreateOrganizationForm,
		ChangePasswordForm,
		HorizontalCarousel,
		OrganizationItem,
		EditProfileForm,
		Subscribes,
	},
	
	created() {
		this.$store.dispatch('profile/getProfile');
	},

	computed: {
		userInfo() {
			return this.$store.getters['profile/getActualUser'];
		},
		nickname() {
			return this.$store.getters['profile/getActualUser'].nickname;
		},
		email() {
			return this.$store.getters['profile/getActualUser'].email;
		},
		userAvatar() {
			return this.$store.getters['profile/getActualUser'].avatar;
		},
		organizations() {
			console.log(this.$store.getters['profile/getUserOrganizations']);
			
			return this.$store.getters['profile/getUserOrganizations'];
		},
	},

  methods: {
		editProfile() {},
		changePassword() {},
		
  }
};
</script>

<style lang="scss">
	::-webkit-scrollbar {
    width: 0px;
    background: transparent;
	}
</style>