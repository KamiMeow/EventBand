<template>
	<v-card
		class="my-4"
	>
		
		<v-toolbar 
			v-if="showOrganizationName"
			color="secondary"
		>
			<v-toolbar-title class="white--text"> {{ organization.name }} </v-toolbar-title>
		</v-toolbar>

		<v-card-title>
			<v-flex xs12>
				<div> 
					Topic: <span class="grey--text text--darken-2"> {{ news.title }} </span>
				</div>
			</v-flex>
		
		</v-card-title>
		<v-card-text>
			<v-layout>
				<span class="grey--text text--darken-3"> {{ news.text }} </span>
			</v-layout>
		</v-card-text>
		<v-divider></v-divider>
		<v-card-subtitle class="pa-0 px-4"> 
			<v-flex xs12>
				<span class="subtitle-2">
					Created at: {{ dateAt }} ({{timeAt}})
				</span>
			</v-flex>
		</v-card-subtitle>
	</v-card>
</template>

<script>
export default {
	name: 'NewsItem',

	props: {
		showOrganizationName: {
			type: Boolean,
			default: true,
		},
		news: {
			type: Object,
			default: () => ({
				uuid: '01f77df9-d732-4d2a-907d-7ad4edadf7e0',
				title: 'News Title',
				text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea non cupiditate praesentium inventore voluptatem quas?',
				createdAt: '2020-05-21T13:51:35.073Z',
			}),
		},
		organization: {
			type: Object,
			default: () => ({
				uuid: 'bfc0de35-5789-4746-aef3-aa5bc393836a',
				logo: 'no-homo.jpg',
				name: 'Org name',
			}),
		}
	},

	computed: {
		dateAt() {
			return this.news.createdAt.split('T')[0];
		},

		timeAt() {
			return this.news.createdAt.split('T')[1].split('Z')[0].split('.')[0];
		},
	},

}
</script>