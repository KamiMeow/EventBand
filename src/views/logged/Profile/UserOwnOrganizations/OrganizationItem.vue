<template>
	<swiper-slide 
		style="min-width: 120px;"
	>
		<v-layout fill-height justify-center align-center>
			<v-card 
				color="secondary"
				max-width="160px"
			>
				<v-layout column>
						<v-img 
							contain
							height="64"
							:src="noLogo" />
						<v-card-subtitle class="align-self-center white--text"> 
						<v-btn
							class="white--text"
							x-small
							text
							to="/"
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
				logo: 'no-logo',
				reputation: 0,
				uuid: 'none',
				name: 'no-name',
			}),
		},
	},

	components: {
		SwiperSlide,
	},

	computed: {
		noLogo() {
			return '/logo-organization.png';
		}
	}
}
</script>

<style lang="scss">
</style>