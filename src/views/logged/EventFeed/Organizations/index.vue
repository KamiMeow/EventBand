<template>
	<v-layout
		class="pa-4"
	>
		Organizations
	</v-layout>
</template>

<script>
export default {
	name: 'Organizations',

	async created() {
		await this.$store.dispatch('profile/requestOrganizationsNews');
		console.log(this.$store.getters['profile/getOrganizationsNews']);
		
	} 
}
</script>