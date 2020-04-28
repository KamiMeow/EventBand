<template>
  <v-footer
		class="py-10"
    color="primary"
    dark
    app
  >
		<v-col
			cols="3">
			<span 
				class="px-3 body-2" aria-label="Написать в поддержку" data-direction="top">
				&copy; {{ new Date().getFullYear() }} — all rigths reserved
			</span>
		</v-col>
		<v-col
			cols="6"
			class="d-flex flex-row justify-center align-center">
			<v-img
				v-for="icn in icons"
				:key="icn"
				:src="pathToIcons + icn + format"
				class="ma-1"
				max-width="32"
				max-height="32"
			></v-img>
		</v-col>
		<v-col
			cols="3"
			align="right">
			Privacy | Conditions	
		</v-col>
  </v-footer>
</template>

<script>
/**
 * Компонент футера
 */


export default {
	name: 'TheFooter',
	data() {
		return {
			pathToIcons: "/socmedia-icons/socmedia-",
			format: ".png",
			icons: ['1', '2', '3', '4'],
		}
	},
};
</script>

<style lang="scss" scoped>
</style>
