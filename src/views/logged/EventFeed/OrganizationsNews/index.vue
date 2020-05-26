<template>
	<v-layout
		class="pa-4"
		justify-start
		column
	>
		<news-item
			v-for="(v, i) in news"
			:key="i"
			:news="v"
			:organization="v.Organization"
			:showOrganizationName="true"
		/>
	</v-layout>
</template>

<script>
import NewsItem from '@/components/helper/NewsItem';

export default {
	name: 'OrganizationsNews',

	components: {
		NewsItem,
	},

	computed: {
		news() {
			return this.$store.getters['profile/getOrganizationsNews'];
		},
	},

}
</script>