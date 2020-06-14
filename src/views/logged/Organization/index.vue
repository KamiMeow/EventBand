<template>
	<v-layout class="pt-8"
		column
	>
		<v-flex xs10>
			<v-layout justify-space-around>
				<v-flex xs9
					class="mx-4"
				>
					<organization-info
						:followersAmount="followersAmount"
						:organization="organization"
						:rating="rating"
					/>
				</v-flex>
			</v-layout>
		</v-flex>

		<v-layout justify-center wrap>
			<v-flex 
				v-for="event in events"
				:key="event.uuid"
				xs9
			>
				<event-item
					:event="event"
					:tickets="event.tickets"
					:tags="event.tags"
					:logo="organization.logo"
					:canSubscribe="false"
					:canView="true"
					:canEdit="true"
				/>
			</v-flex>
		</v-layout>
	</v-layout>
</template>

<script>
import OrganizationInfo from '@/components/helper/OrganizationInfo';
import MenuControl from './MenuControl';
import EventItem from '@/components/helper/EventItem';

export default {
	name: 'Organization',

	components: {
		OrganizationInfo,
		MenuControl,
		EventItem,
	},

	data: () => ({
		isPreloading: true,

	}),

	created() {
		this.requestMyOrganizationInfo();
	},

	computed: {
		followersAmount() {
			return this.$store.getters['organization/getFollowersAmount'];
		},
		organization() {
			return this.$store.getters['organization/getActualOrganization'];
		},
		rating() {
			return this.$store.getters['organization/getActualOrganization'].reputation;
		},
		events() {
			return this.$store.getters['organization/getEvents'];
		},
	},

	methods: {
		async requestMyOrganizationInfo() {
			this.isPreloading = true;
			await this.$store.dispatch('organization/getMyOrganizationInfo');
			setTimeout( () => { this.isPreloading = false; }, 750);
		},

		
	},
}
</script>