<template>
  <v-img
    src="/blur-bg-main.png"
		lazy-src="/blur-bg-main.png"
		class="pb-8"
  >
		<v-layout 
			wrap
			justify-center
			align-center
			fill-height
			class="mx-12 px-12"
		>
			<v-flex xs12 sm12 md3 lg4
				class="my-2"
				v-for="offer in offers"
				:key="offer.icon"
			>
				<v-layout justify-center>
					<v-card
						class="py-5 px-1 semi-opacity"
						max-width="350"
						outlined
						tile
					>
						<div class="d-flex flex-column align-center white--text">
							<v-img
								:src="'/'+ offer.icon +'-icon.'+ offer.format"
								:lazy-src="'/'+ offer.icon +'-icon.'+ offer.format"
								class="my-2"
							/>

							<v-card-title class="display-1 mt-2"> {{ offer.title }} </v-card-title>
							<v-card-text align="center" class="body-1 mt-3 mb-6">
								{{ offer.text }}
							</v-card-text>
						</div>
					</v-card>
				</v-layout>
			</v-flex>
		</v-layout>
  </v-img>
</template>

<script>

const offers = [
	{
		icon: 'search',
		format: 'png',
		title: 'Search events',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nulla rerum animi numquam voluptate velit ad veniam earum vitae reiciendis.',
	},
	{
		icon: 'calendar',
		format: 'png',
		title: 'Subscribe on events',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nulla rerum animi numquam voluptate velit ad veniam earum vitae reiciendis.',
	},
	{
		icon: 'chat',
		format: 'png',
		title: 'Intercourse',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nulla rerum animi numquam voluptate velit ad veniam earum vitae reiciendis.',
	},
];


export default {
	name: 'MainPage',
	data: () => ({
		offers,
	}),
}
</script>


<style lang="scss" scoped>
	.semi-opacity {
		background-color: rgba($color: #FFFFFF, $alpha: 0.25) !important;
   	border-color: white !important;
		border-width: 2px !important;
		border-radius: 0px !important;
	}
</style>
