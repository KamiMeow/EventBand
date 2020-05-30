<template>
  <v-footer
    class="grey--text subtitle-2 px-2 mt-12"
    color="primary"
		app
  >
		<v-col cols="3">
			<span class="px-3">
				&copy; {{ new Date().getFullYear() }} — all rigths reserved
			</span>
		</v-col>

		<v-col
			class="d-flex flex-row justify-center align-center py-0"
			cols="6"
		>	
			<v-btn
				v-for="icon in icons"
				:key="icon.icon"
				:href="icon.link"
				color="white"
				icon
			>
				<v-icon>
					{{icon.icon}}
				</v-icon>
			</v-btn>
		</v-col>

		<v-col shrink align="right">
			Privacy
		</v-col>
  </v-footer>
</template>

<script>
const icons = [
	{
		icon: 'mdi-instagram',
		link: 'https://twitter.com/cantsleepanymo',
	},
	{
		icon: 'mdi-facebook',
		link: 'https://twitter.com/cantsleepanymo',
	},
	{
		icon: 'mdi-twitter',
		link: 'https://twitter.com/cantsleepanymo',
	},
	{
		icon: 'mdi-email',
		link: 'mailto:info.event.band.api',
	},

];

export default {
	name: 'TheFooter',
	data: () => ({
		icons,
	}),
};
</script>

<style lang="scss" scoped>
	.vh--footer { 
		height: 10vh;
	}
</style>
