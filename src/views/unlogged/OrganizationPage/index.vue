<template>
	<v-layout 
		class="pt-12"
		justify-center
		fill-height
		wrap
		
	>
		<v-flex xs9
			class="mt-12"
		>
			<organization-info
				:organization="organization"
				:followersAmount="followersAmount"
				:rating="rating"
			/>
		</v-flex>
		<v-flex xs9
			class="mt-5"
		>	
			<div>
				<span class="display-1 font-weight-medium ml-4"> Founder & Activists </span>
			</div>
			<v-divider/>
			<v-layout
				class="px-4"
				justify-start
				wrap
			>
				<v-flex xs12 sm12 md8 lg8
					v-for="(person, i) in persons"
					:key="i"
					class="my-4"
				>
					<v-card class="custom-elevation">
						<v-card-title>
							{{ person.surname }} {{ person.name }}
						</v-card-title>
					</v-card>
				</v-flex>
			</v-layout>
		</v-flex>
		<v-flex xs9
			class="mt-5"
		>	
			<div>
				<span class="display-1 font-weight-medium ml-4"> Events </span>
			</div>
			<v-divider/>
			<v-layout 
			class="my-2" 
				justify-center
				wrap
			>
				<v-flex
					xs12 sm10 md12
					v-for="i in events"
					:key="i.uuid"
				>
					<event-item 
						:event="i"
						:tickets="i.tickets"
						:tags="i.tags"
						:logo="organization.logo"
						:canSubscribe="!isOrg && isLogged"
						:canView="true"
						:canEdit="false"
					/>
				</v-flex>
			</v-layout>
		</v-flex>
	</v-layout>
</template>

<script>
import EventItem from '@/components/helper/EventItem';
import OrganizationInfo from '@/components/helper/OrganizationInfo';

export default {
	name: 'OrganizationPage',
	
	components: {
		OrganizationInfo,
		EventItem,
	},

	created() {
		console.log(this.$route.params.uuid);
		this.requestOrganizationInfo();
	},
	
	data: () => ({
		events: null,
		persons: null,

		organization: null,
		followersAmount: null,
		rating: null,
	}),

	computed: {
		isOrg() {
			return this.$store.getters['auth/getIsLoggedAsOrganization'];
		},
		isLogged() {
			return this.$store.getters['auth/getIsLogged'];
		},
	},

	methods: {

		async requestOrganizationInfo() {
			await this.$store.dispatch('nonauth/requestOrganizationInfo', this.$route.params.uuid);
			await this.setPageInfo();
		},
		
		setPageInfo() {
			this.events = this.$store.getters['nonauth/getCurrentOrganization'].events;
			this.persons = this.$store.getters['nonauth/getCurrentOrganization'].organizers;
			this.organization = this.$store.getters['nonauth/getCurrentOrganization'].organization;
			this.followersAmount = this.$store.getters['nonauth/getCurrentOrganization'].subscribers;
			this.rating = this.$store.getters['nonauth/getCurrentOrganization'].organization.reputation;
		},
	},

	beforeDestroy() {
		this.$store.dispatch('nonauth/resetCurrentOrganization');
	},
}
</script>