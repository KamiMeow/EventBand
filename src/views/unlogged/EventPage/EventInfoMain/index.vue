<template>
	<v-card class="custom-elevation">
		<v-layout column>
			<v-card-title>
				<v-layout>
					<span class="headline"> Event </span>
					<v-spacer/>

					<chat v-if="isLogged && !isOrg" />
				</v-layout>
			</v-card-title>

			<v-divider/>
			<span class="title pl-4 pt-3"> Tags </span>

			<v-layout 
				class="px-4 pb-3"
				wrap
			>
				<v-chip
					v-for="(tag, i) in tags"
					:key="i"
					class="ma-1"
				>
					{{tag.name}}
				</v-chip>
			</v-layout>

			<span class="title pl-4 "> Date </span>
			<v-layout wrap justify-center>
				<v-flex xs5>
					<v-text-field
						v-model="dateFrom"
						prepend-icon="mdi-calendar-today"
						readonly
					/>
				</v-flex>
				<v-flex xs5>
					<v-text-field
						v-model="timeFrom"
						prepend-icon="mdi-av-timer"
						readonly
					/>
				</v-flex>
				<v-flex xs5>
					<v-text-field
						v-model="dateTo"
						prepend-icon="mdi-calendar-today"
						readonly
					/>
				</v-flex>
				<v-flex xs5>
					<v-text-field
						v-model="timeTo"
						prepend-icon="mdi-av-timer"
						readonly
					/>
				</v-flex>
			</v-layout>

			<organization-item
				:organization="organization"
				:forSubscribe="false"
				minWidth="auto"
				class="mt-2"
				forView
				tile
				flat
			/>
		</v-layout>
	</v-card>
</template>

<script>
import OrganizationItem from '@/components/helper/OrganizationItem';
import Chat from '@/components/helper/Chat';


export default {
	name: 'EventInfoDetailed',

	components: {
		OrganizationItem,
		Chat,
	},

	computed: {
		tags() {
			return this.$store.getters['nonauth/getCurrentEvent'].tags;
		},
		dateFrom() {
			return this.$store.getters['nonauth/getCurrentEvent'].event.datetimeFrom.split('T')[0].replace('-', '.');
		},
		dateTo() {
			return this.$store.getters['nonauth/getCurrentEvent'].event.datetimeTo.split('T')[0].replace('-', '.');
		},
		timeFrom() {
			return this.$store.getters['nonauth/getCurrentEvent'].event.datetimeFrom.split('T')[1].split('.')[0];
		},
		timeTo() {
			return this.$store.getters['nonauth/getCurrentEvent'].event.datetimeTo.split('T')[1].split('.')[0];
		},
		organization() {
			return this.$store.getters['nonauth/getCurrentEvent'].organization;
		},
		isLogged() {
			return this.$store.getters['auth/getIsLogged'];
		},

		isOrg() {
			return this.$store.getters['auth/getIsLoggedAsOrganization'];
		}
		
	},

	methods: {
		goToOrganizationPage() {
			console.log(1);
		},
	},
}
</script>