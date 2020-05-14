<template>
	<swiper-slide class="mx-4">
		<v-responsive
			:aspect-ratio="16/9"
		>
			<v-card 
				class="max-company-size d-flex flex-column align-center pt-4" 
				color="secondary"
			> 
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
					</v-btn>
				</v-card-subtitle>
			</v-card>
		</v-responsive>
	</swiper-slide>
</template>

<script>
import { SwiperSlide } from 'vue-awesome-swiper';

export default {
	name: 'OrganizationItem',
	props: {
		organization: {
			type: Object,
			default: {
				logo: 'no-logo',
				reputation: 0,
				uuid: 'none',
				name: 'no-name',
			},
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
	.max-company-size {
		max-width: 10vw;
		max-height: 15vh;
		width: 10vw;
		height: 15vh;
	}
</style>