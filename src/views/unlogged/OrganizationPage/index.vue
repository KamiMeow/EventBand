<template>
	<v-layout 
		class="pt-12"
		justify-center
		fill-height
	>
		<v-flex xs9
			class="mt-12"
		>
			<v-card class="custom-elevation">
				<v-layout column>
					<v-card-title>
						<v-layout 
							class="mx-2"
							wrap
						>
							<v-flex xs12 sm12 md2 lg2
								class="d-xs-flex d-md-none"
							>
								<v-layout :class="justify">
									<v-avatar :size="avatarSize">
										<v-img src="/Avatar.png"/>
									</v-avatar>
								</v-layout>
							</v-flex>
							<v-flex grow>
								<v-layout column>
									<span class="display-1 font-weight-medium"> {{organization.name}} </span>
									<span> Followers ( {{organization.subscribers}} ) </span>
									<span> Reputation ( {{organization.reputation}} ) </span>
									<v-rating
										:value="rating"
										:length="length"
										:size="ratingSize"
										background-color="accent lighten-3"
										color="accent lighten-1"
										half-increments
										readonly
										dense
									/>
								</v-layout>
							</v-flex>
							<v-flex xs12 sm12 md2 lg2
								class="d-none d-md-flex d-lg-flex"
							>
								<v-layout :class="justify">
									<v-avatar :size="avatarSize">
										<v-img src="/Avatar.png"/>
									</v-avatar>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-card-title>
					<v-divider/>
					<v-card-text>
						<v-layout class="title">
							{{organization.description}}
						</v-layout>
					</v-card-text>
				</v-layout>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
export default {
	name: 'OrganizationPage',

	created() {
		this.$store.dispatch('nonauth/requestOrganizationInfo', this.$route.params.uuid);
	},
	
	data: () => ({
		length: 10,
	}),

	computed: {
		organization() {
			return this.$store.getters['nonauth/getCurrentOrganization'];
		},

		rating: {
			get() {
				return this.$store.getters['nonauth/getCurrentOrganization'].reputation;
			},
			set(val) {  },
		},

		ratingSize() {
			switch (this.$vuetify.breakpoint.name) {
				case 'xs': return 16;
				case 'sm': return 32;
				case 'md': return 32;
				case 'lg': return 32;
				case 'xl': return 32;
			}
		},

		justify() {
			switch(this.$vuetify.breakpoint.name) {
				case 'xs': 
				case 'sm': return 'justify-center'
			}
		},

		avatarSize() {
			switch(this.$vuetify.breakpoint.name) {
				case 'xs': 
				case 'sm': return 256;
				case 'md':
				case 'lg': return 128;
				case 'xl': return 256;
				default: return 128;
			}
		}
	},

	beforeDestroy() {
		this.$store.dispatch('nonauth/resetCurrentOrganization');
	},
}
</script>