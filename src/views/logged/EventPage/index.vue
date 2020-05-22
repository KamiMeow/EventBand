<template>
  <v-layout column justify-start>
		<v-card
			class="mx-5 my-2"
			tile
			flat
		>
			<v-toolbar flat>
				<v-toolbar-title class="display-1"> {{ event.name + ' '}} (Event)  </v-toolbar-title>
			</v-toolbar>
			<v-card-text>
				<v-layout column>
					<span class="title"> Description </span>
					<v-divider/>
					<span class="mt-2">
						{{ event.description }}
					</span> 
				</v-layout>
				<v-layout class="mt-8" column>
					<span class="title"> Event`s tags </span>
					<v-divider></v-divider>
					<v-layout wrap>
						<v-chip
							v-for="(tag, i) in tags"
							:key="i"
							class="ma-1"
							small
						>
							{{ tag.name }}
						</v-chip>
					</v-layout>
				</v-layout>
			</v-card-text>
		</v-card>
		<organization-item
			:organization="organization"
			:forSubscribe="false"
			:forView="true"
			:tile="true"
			:flat="true"
			:outlined="true"
			class="mx-5 my-2"
		>
			<template #appendTitleContent>
				<span class="grey--text text--lighten-2"> (Organization) </span>					
			</template>
		</organization-item>
		<template v-if="!tickets.length">
			<v-alert
				class="align-self-center"
				max-width="400px"
				type="warning"
				dismissible
			>
				<span> Event has not tickets right now! </span> 
			</v-alert>
		</template>
		<v-layout 
			class="mx-5"
			column
			v-else>
			
			<v-list
				max-width="300px"
				three-line
			>
				<v-list-group>
					<template #activator>
						<span class="title"> Event`s tickets </span>			
					</template>
					<template v-for="(ticket, i) in tickets">
						<v-list-item 
							:key="i" 
							color="primary" 
						> 
							<v-list-item-icon>
								<v-icon> mdi-ticket </v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title> {{ ticket.name }} </v-list-item-title>
								<v-list-item-subtitle> {{ ticket.description }} </v-list-item-subtitle>
								<v-list-item-subtitle> {{ ticket.price }} (Price)</v-list-item-subtitle>
								<v-list-item-subtitle> {{ ticket.count }} (Count)</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-divider :key="i"></v-divider>
					</template>
				</v-list-group>
			</v-list>
		</v-layout>
		<ya-map>
			<ymap-marker 
				:markerId="1"
				:coords="coords"
			>
			</ymap-marker>
		</ya-map>
	</v-layout>
</template>

<script>
import YaMap from '@/components/helper/Ya-map';
import OrganizationItem from '@/components/helper/OrganizationItem';
import { ymapMarker } from 'vue-yandex-maps';

export default {
	name: 'EventPage',

	components: {
		OrganizationItem,
		ymapMarker,
		YaMap,
	},

	data: () => ({
		uuid: 'no-uuid'
	}),

	created() {
		this.uuid = this.$route.params.uuid;
	},

	computed: {
		organization() {
			return this.$store.getters['nonauth/getCurrentEvent'].organization;
		},
		event() {
			return this.$store.getters['nonauth/getCurrentEvent'].event;
		},
		tickets() {
			// return [];
			return this.$store.getters['nonauth/getCurrentEvent'].tickets;
		},
		tags() {
			return this.$store.getters['nonauth/getCurrentEvent'].tags;
		},
		coords() {
			let event = this.$store.getters['nonauth/getCurrentEvent'].event;
			let regexp = /\(|\)/g;
			let result = event.coords.replace(regexp,'').split(',').map(v => +v);
			
			return result;
		}
	},
}
</script>