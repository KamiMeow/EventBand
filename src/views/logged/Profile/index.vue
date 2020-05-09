<template>
  <v-container class="d-flex flex-column justify-center align-center" fluid>
    <v-layout
			class="custom-elevation d-flex flex-column align-content-center"
			style="max-width: 75vw;"
		>
      <v-layout
				style="max-height: 20vh; height: 20vh;"
			>
        <v-col class="pr-0 ma-0" cols="1">
          <v-img
						class="pa-0 ma-0"
						src="/Avatar.png"
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
					>{{ nickname }}</v-btn>
          <v-btn
						class="title pa-0"
						disabled
						x-large
						left
						text
						tile
					>{{ email }}</v-btn>
        </v-col>
        <v-divider vertical />

        <v-col cols="2" >
          <edit-profile-form/>
          <change-password-form/>
        </v-col>
      </v-layout>

      <v-layout 
				class="d-flex flex-column justify-start px-4">
          <div class="headline">My own organizations</div>
					<v-divider></v-divider>
					<v-layout
						class="my-2"
						style="overflow-x: auto; width: 100%; height: fit-content">
						<horizontal-carousel class="px-8"> 
							<organization-item
								v-for="i in 20"
								:key="i"
							></organization-item>
						</horizontal-carousel>
					</v-layout>
      </v-layout>
			<subscribes class="px-4" />
    </v-layout>
  </v-container>
</template>

<script>
import HorizontalCarousel from '@/components/helper/HorizontalCarousel';
import OrganizationItem from './OrganizationItem';
import EditProfileForm from './EditProfileForm';
import ChangePasswordForm from './ChangePasswordForm';
import Subscribes from './Subscribes';

export default {
	name: 'Profile',

	components: {
		ChangePasswordForm,
		HorizontalCarousel,
		OrganizationItem,
		EditProfileForm,
		Subscribes,
	},
	
  
	computed: {
		userInfo() {
			return this.$store.getters['auth/getActualUser'];
		},
		nickname() {
			return this.$store.getters['auth/getActualUser'].nickname;
		},
		email() {
			return this.$store.getters['auth/getActualUser'].email;
		},
	},

  methods: {
    editProfile() {},
    changePassword() {}
  }
};
</script>

<style lang="scss">
	::-webkit-scrollbar {
    width: 0px;
    background: transparent;
	}
</style>