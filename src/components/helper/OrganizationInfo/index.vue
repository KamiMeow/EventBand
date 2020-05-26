<template>
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
							<span> Followers ( {{followersAmount}} ) </span>
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
								<v-img :src="`https://event-band-api.ru:5000/static/organizations/${organization.logo}`"/>
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
</template>

<script>
export default {
	name: 'OrganizationInfo',

	props: {
		organization: Object,
		followersAmount: Number,
		rating: Number,
	},

	data: () => ({
		length: 10,
	}),

	computed: {

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
				case 'xl': return 170;
				default: return 128;
			}
		}
	},
}
</script>