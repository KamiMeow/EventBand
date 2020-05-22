<template>
	<v-layout
		class="pa-4"
		align-center
		justify-start
		column
	>
		<organization-item
			v-for="o in organizations"
			:key="o.uuid"
			:organization="o"
			:maxWidth="750"
		>
		</organization-item>
	</v-layout>
</template>

<script>
import OrganizationItem from '@/components/helper/OrganizationItem'

export default {
	name: 'Organizations',

	components: {
		OrganizationItem,
	},

	computed: {
		organizations() {
			return this.$store.getters['profile/getRecomendedOrganizations'];
		}
	},
}
</script>