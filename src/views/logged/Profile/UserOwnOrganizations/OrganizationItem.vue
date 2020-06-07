<template>
	<swiper-slide 
		style="min-width: 120px;"
	>
		<v-layout fill-height justify-center align-center>
			<v-card 
				class="elevation-0"
				max-width="160px"
			>
				<v-layout column>
						<v-responsive>
							<v-layout justify-center>
								<v-img 
									:aspect-ratio="3/4"
									class="custom-elevation"
									height="64"
									max-width="64"
									:src="`https://event-band-api.ru:5000/static/organizations/${organization.logo}`"
								/>
							</v-layout>
						</v-responsive>
						<v-card-subtitle class="align-self-center white--text"> 
						<v-btn
							x-small
							text
							@click="signInAsOrganization"
						>
							{{ organization.name }} 
							<v-icon right>
								mdi-arrow-right-bold-circle
							</v-icon>
						</v-btn>
					</v-card-subtitle>
				</v-layout>
			</v-card>
		</v-layout>
		<v-snackbar
			v-model="snackbar"
			:color="snackbarType"
		>
			{{ snackbarMessage }}
			<v-icon>
				mdi-close-circle
			</v-icon>
		</v-snackbar>
	</swiper-slide>
</template>

<script>
import { SwiperSlide } from 'vue-awesome-swiper';

export default {
	name: 'OrganizationItem',
	props: {
		organization: {
			type: Object,
			default: () => ({
				logo: undefined,
				reputation: 0,
				uuid: 'none',
				name: 'no-name',
			}),
		},
	},

	created() {
		
	},

	data: () => ({
		snackbar: false,
		snackbarMessage: '',
		snackbarType: 'info',
	}),

	components: {
		SwiperSlide,
	},

	methods: {
		async signInAsOrganization() {
			let res = await this.$store.dispatch('organization/signInAsOrganization', this.organization.uuid);
			if (res.message) {
				this.snackbarMessage = res.message.message;
				this.snackbarType = res.message.type;
			}
			if (res.isNext) {
				this.$router.push(`/my-organization/info`);
			}
		},
	},

	computed: {
		noLogo() {
			return '/logo-organization.png';
		},

		isOrganization() {
			return this.$store.getters['auth/getIsLoggedAsOrganization'];
		}
	}
}
</script>

<style lang="scss">
</style>