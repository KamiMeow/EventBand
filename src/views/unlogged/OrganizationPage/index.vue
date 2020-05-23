<template>
	<div class="mt-10"> {{ organization.name }} </div>
</template>

<script>
export default {
	name: 'OrganizationPage',

	created() {
		this.$store.dispatch('nonauth/requestOrganizationInfo', this.$route.params.uuid);
	},
	
	computed: {
		organization() {
			return this.$store.getters['nonauth/getCurrentOrganization'];
		},
	},

	beforeDestroy() {
		this.$store.dispatch('nonauth/resetCurrentOrganization');
	},
}
</script>