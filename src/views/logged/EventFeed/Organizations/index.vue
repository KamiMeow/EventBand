<template>
	<v-layout
		class="pa-4"
		justify-start
		column
	>
		<v-alert 
			v-if="!organizations.length"
			type="info"
			class="text-center"
		>
			<span class="headline"> No recommended organizations </span>
		</v-alert>
		<template v-else>
			<organization-item
				v-for="o in organizations"
				:key="o.uuid"
				:organization="o"
				:maxWidth="750"
				minWidth="750"
				class="my-4"
			/>
		</template>
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