<template>
	<swiper-slide class="mx-4">
		<v-card 
			class="max-company-size d-flex flex-column align-center pt-4" 
			color="secondary"
		> 
				<v-img 
						contain
						height="64"
						src="/men.png" />
			<v-card-subtitle class="align-self-center white--text"> 
				<v-btn
					class="white--text"
					x-small
					text
					to="/"
				>
					{{ OrganizationName }} 
				</v-btn>
			</v-card-subtitle>
		</v-card>
	</swiper-slide>
</template>

<script>
import { SwiperSlide } from 'vue-awesome-swiper';

export default {
	name: 'OrganizationItem',
	props: {
		OrganizationName: {
			type: String,
			default: 'Company name',
		},
	},

	components: {
		SwiperSlide,
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