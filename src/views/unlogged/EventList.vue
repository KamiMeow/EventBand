<template>
  <v-container
		style="height: 100%;"
		fluid
	>
	<v-layout>
		<v-col
			color="secondary"
			cols="9">
		</v-col>
		<v-divider vertical ></v-divider>
		<v-col
			class="d-flex flex-column justify-start align-center"
			cols="3">
			<v-expansion-panels
				multiple
				inset
				>
      <v-expansion-panel
				elevation="0">
        <v-expansion-panel-header> Themes </v-expansion-panel-header>
        <v-expansion-panel-content>
          
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
		</v-col>
	</v-layout>
	</v-container>
</template>

<script>

const tags = [
	{
		text: '3D-modeling',
		icon: 'mdi-desktop-mac-dashboard',
	},
	{
		text: 'Science',
		icon: 'mdi-atom',
	},
	{
		text: 'Music',
		icon: 'mdi-guitar-acoustic',
	},
	{
		text: 'Sport',
		icon: 'mdi-volleyball',
	},
	{
		text: 'Art',
		icon: 'mdi-brush',
	},
	{
		text: 'Religion',
		icon: 'mdi-christianity',
	},
];

export default {
	data() {
		return {
			tags,

		}
	},
}
</script>