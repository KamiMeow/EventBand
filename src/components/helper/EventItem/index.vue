<template>
	<v-card
		class="pa-2 my-2 custom-elevation"
		outlined
	>

		<v-layout>
			<!-- {{logo || event.organization.logo}} -->
			<v-flex xs1>
				<v-avatar size="128px">
					<v-img :src="`https://event-band-api.ru:5000/static/organizations/${logo || event.organization.logo}`" />
				</v-avatar>
			</v-flex>

			<v-flex xs3 class="pl-4">
				<v-layout column>
					<v-card-title class="headline" > {{ event.name }} </v-card-title>
					<v-card-subtitle class="subtitle-1 pa-0 pl-4 text-truncate">
						{{ event.description }}
					</v-card-subtitle>
				</v-layout>
			</v-flex>
			<v-flex xs2>
				<div class="text-center "> Tags </div>
				<v-layout wrap>
					<v-chip
						v-for="(tag, i) in tags"
						:key="i" 
						class="ma-1"
						small
					> 
						{{ tag.name || tag }} 
					</v-chip>
				</v-layout>
			</v-flex>
			<v-flex xs3 class="left-border pl-4">
				<v-layout column>
					<span class="align-self-center"> Info </span>
					<div> Max tickets amount 
						<span class="orange--text text--darken-4"> ({{ event.count }}) </span>
					</div>
					<div> Min ticket price 
						<span class="green--text text--darken-2"> ({{ minimumPrice }}) </span>  
					</div>
					<div> Starting
						<span class="pink--text text--darken-4"> {{ dateFrom }} </span>
					</div>
					<div> Ending
						<span class="pink--text text--darken-4"> {{ dateTo }} </span>
					</div>
				</v-layout>
			</v-flex>
			<v-flex xs3>
				<v-layout fill-height wrap align-center>
					<quick-subscribe-form 
						v-if="canSubscribe"
						:tickets="tickets"/>
					<v-btn
						v-if="canView"
						:to=" isOrg ? `/my-organization/event/${event.uuid}` : `/event/${event.uuid}`"
						color="accent"
						block
					>
						View
					</v-btn>
					<v-btn
						v-if="canEdit"
						color="secondary"
						block
						@click="openEditForm"
					>
						Edit event
					</v-btn>
					<v-btn
						v-if="canEdit"
						color="secondary darken-3"
						block
						@click="openChatEditPage"
					>
						Edit chat
					</v-btn>
				</v-layout>
			</v-flex>
		</v-layout>
	</v-card>
</template>

<script>
import CalendarInput from '@/components/helper/DateTimePicker/CalendarInput';
import TimeInput from '@/components/helper/DateTimePicker/TimeInput';
import QuickSubscribeForm from './QuickSubscribeForm';

export default {
	name: 'EventItem',

	components: {
		QuickSubscribeForm,
		CalendarInput,
		TimeInput,
	},

	props: {
		tickets: Array,
		event: Object,
		tags: Array,
		logo: {
			type: String,
			default: undefined,
		},

		canSubscribe: true,
		canView: true,
		canEdit: false,
	},

	created() {
		console.log(this.event);		
	},
	
	data: () => ({
		path: 'logo-organization.png',
	}),

	computed: {
		dateFrom() {
			return this.event.datetimeFrom.split('T')[0];
		},
		dateTo() {
			return this.event.datetimeTo.split('T')[0];
		},
		imagePath() {
			return this.path; 
		},
		isLogged() {
			return this.$store.getters['auth/getIsLogged'];
		},

		isOrg() {
			return this.$store.getters['auth/getIsLoggedAsOrganization'];
		},

		minimumPrice() {
			if (this.event.price === undefined) {
				return this.event.minPrice;
			} else {
				return this.event.price;
			}
		},
	},

	methods: {
		openEditForm() {
			this.$store.dispatch('organization/setEditableEvent', {
				uuid: this.event.uuid,
				name: this.event.name,
				description: this.event.description,
				datetimeFrom: this.event.datetimeFrom,
				datetimeTo: this.event.datetimeTo,
				coords: this.event.coords,
				count: this.event.count || 1,
				tags: this.tags,
				tickets: this.tickets,
			});
			this.$store.dispatch('organization/setIsOnEditTrue');
			this.$router.push('/my-organization/event/create');
		},

		openChatEditPage() {
			this.$store.dispatch('eventchat/setChatUuid', this.event.chatUuid);
			this.$router.push('/my-organization/chat/edit');
		},
	},
}
</script>

<style lang="scss" scoped>

	.left-border {
		border-left: 2px solid gray;
	}
	
</style>