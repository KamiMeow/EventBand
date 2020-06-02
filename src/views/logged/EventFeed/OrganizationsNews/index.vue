<template>
	<v-layout
		class="pa-4"
		justify-start
		column
	>
		<v-alert 
			v-if="!news.length"
			type="info"
			class="text-center"
		>
			<span class="headline"> No recommended news </span>
		</v-alert>
		<template v-else>
			<news-item
				v-for="(v, i) in news"
				:key="i"
				:news="v"
				:organization="v.Organization"
				:showOrganizationName="true"
			/>
		</template>
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