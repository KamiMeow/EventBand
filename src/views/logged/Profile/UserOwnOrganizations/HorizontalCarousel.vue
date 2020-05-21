<template>
	<v-layout fill-width class="py-4">
		<swiper 
			:options="swiperOptions"
			class="swiper px-5"
			style=" width: 100%" 
		>
			<slot></slot>
			<div class="swiper-button-prev" slot="button-prev"></div>
			<div class="swiper-button-next" slot="button-next"></div>
		</swiper>	
	</v-layout>
</template>


<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
	name: 'horizontal-carousel',

	components: {
		Swiper,
		SwiperSlide,
	},

	directives: {
		directive,
	},

	data: () => ({
		swiperOptions: {
			slidesPerView: 8,
			grabCursor: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
		}
	}),
	
}
</script>


<style lang="scss" scoped>

</style>