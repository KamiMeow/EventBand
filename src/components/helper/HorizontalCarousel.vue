<template>
	<swiper class="swiper" :options="swiperOptions">
		<slot></slot>
		<div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
	</swiper>
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
			slidesPerView: 5,
			spaceBetween: 30,
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