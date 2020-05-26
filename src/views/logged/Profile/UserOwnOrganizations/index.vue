<template>
	 <v-layout 
			class="px-4"
			wrap
		>
		<v-flex xs12>
			<div class="headline">My own organizations</div>
			<v-divider></v-divider>
		</v-flex>
		<v-flex xs12>
			<template v-if="!organizations.length">
				<v-layout class="my-4" justify-center align-center>
					<v-alert 
						type="info"
						border="top"
					>
						<span> Subscribe to an organization or create your own </span> 
					</v-alert>
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
		</v-flex>
	</v-layout>
</template>

<script>
import HorizontalCarousel from './HorizontalCarousel';
import OrganizationItem from './OrganizationItem';

export default {
	name: 'UserOwnOrganizations',

	components: {
		HorizontalCarousel,
		OrganizationItem,
	},


	computed: {
		organizations() {
			return this.$store.getters['profile/getUserOrganizations'];
		},
	},

}
</script>