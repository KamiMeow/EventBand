<template>
	<v-layout>
		<v-flex 
			class="text-center"
			xs2 
		>
			<v-avatar size="128">
				<v-img :src="userAvatar" />
			</v-avatar>
		</v-flex>
		<v-flex 
			class="pt-2"
			grow 
		>
			<div class="headline">
				<span class="font-weight-medium"> {{ surname }} {{ name }} </span>
				<span> ({{ nickname }}) </span>
			</div>
			<div class="title font-weight-regular grey--text text--darken-1"> {{ email }} </div>
		</v-flex>
		<v-flex 
			xs3
			class="pl-8 left-border"
		>
			<div>
				<change-password-form/>
			</div>
			<div class="my-3">
				<create-organization-form/>
			</div>
			<div>
				<edit-profile-form/>
			</div>
		</v-flex>
	</v-layout>
</template>

<script>
import ChangePasswordForm from "./ChangePasswordForm";
import CreateOrganizationForm from "./CreateOrganizationForm";
import EditProfileForm from "./EditProfileForm";

export default {
	name: 'UserInfo',

	components: {
		ChangePasswordForm,
		CreateOrganizationForm,
		EditProfileForm,
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
		surname() {
			return this.$store.getters['profile/getActualUser'].surname;
		},
		name() {
			return this.$store.getters['profile/getActualUser'].name;
		},
		userAvatar() {
			return this.$store.getters['profile/getActualUser'].avatar;
		},
	},
}
</script>


<style lang="scss">
	.left-border {
		border-left: 2px solid black;
	}
</style>