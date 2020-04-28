<template>
  <v-img
    src="/blur-bg-main.png"
    style="height: 90%"
  >
		<v-container
			class="d-flex justify-space-around align-center"
			style="height: 90%"
			fluid
		>
			<v-card
				v-for="offer in offers"
				:key="offer.icon"
				class="py-5 px-1 semi-opacity"
				width="350"
				outlined
				tile
			>
				<div class="d-flex flex-column align-center white--text">
					<v-img
						:src="'/'+ offer.icon +'-icon.'+ offer.format"
					></v-img>
					<v-card-title class="headline"> {{ offer.title }} </v-card-title>
					<v-card-text align="center" class="title">
						{{ offer.text }}
					</v-card-text>
				</div>
			</v-card>			
		</v-container>
		
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
	data() {
		return {
			offers,
		}
	},
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
