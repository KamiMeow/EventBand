<template>
	<v-card
		class="my-2 py-4"
	>
		<v-layout
			fill-width
			wrap
		>
			<v-flex xs1 md1
				class="pl-3"
			>
				<v-avatar
					size="64px"
				>
					<v-img
						:aspect-ratio="3/4"
						:src="`https://event-band-api.ru:5000/static/organizations/${stableSubInfo.logo || stableSubInfo.organization.logo}`"
					/>
				</v-avatar>
			</v-flex>
			<v-flex xs6>
				<v-layout fill-width> 
					<v-card-title class="pa-0 pl-4 text-truncate"> {{ stableSubInfo.name }} </v-card-title>
				</v-layout>
				<v-layout wrap>
					<v-card-text
						class="pa-0 pl-4 text-truncate" 
					> 
						 {{ stableSubInfo.description}}
					</v-card-text> 
				</v-layout>
			</v-flex>
			<template v-if="itemType === 'Event'">
				<v-flex xs12>
					<v-list>
						<v-list-group>
							<template #activator>
								<v-list-item-content >
									<v-list-item-title class="title text-center" > 
										Your tickets 
									</v-list-item-title>
								</v-list-item-content>
							</template>
							<v-list-item
								three-line
								v-for="ticket in stableSubInfo.tickets"
								:key="ticket.uuid"
							>	
								<v-list-item-content>
									<v-flex xs2 class="text-center">
										<reject-event-dialog :subUuid="ticket.uuid" subType="Event"/>
									</v-flex>
									<v-flex xs6 class="text-center">
										<v-list-item-title class="subtitle-1" > {{ ticket.name }} </v-list-item-title>
										<v-list-item-subtitle class="subtitle-1" > {{ ticket.description }} </v-list-item-subtitle>
										<v-list-item-subtitle class="subtitle-1" > (Price {{ticket.price}}$) </v-list-item-subtitle>
									</v-flex>
									<v-flex xs4>
										<span> Dates </span>
										<div>
											<span class="subtitle-2"> (from) {{ ticket.datetimeFrom }} </span>
										</div>
										<div>
											<span class="subtitle-2"> (to) {{ ticket.datetimeTo }} </span>
										</div>
									</v-flex>
									<v-flex xs12>
										<v-divider/>
									</v-flex>
								</v-list-item-content>
							</v-list-item>
						</v-list-group>
					</v-list>
				</v-flex>
			</template>
			<template v-else>
				<v-flex class="text-right pr-4">
					<reject-event-dialog 
						:subUuid="stableSubInfo.uuid"
						subType="Organization"
					/>
				</v-flex>
			</template>
		</v-layout>
	</v-card>
</template>

<script>
import rejectEventDialog from './rejectEventDialog';

export default {
	name: 'SubscribeItem',

	props: {
		"stableSubInfo": {
			type: Object,
			default: () => ({
				uuid: undefined,
				path: "/Avatar.png",
				name: "no-name",
				description: "no-description with no frame and rest with fillings awesome problems i think yes reptiloid human boy",
				tickets: [],
			})
		},
		"itemType": {
			type: String,
			default: 'Event' || 'Organization',
		}
	},

	created() {

	}	,

	components: {
		rejectEventDialog,
	},

	methods: {
		goToItemPage() {
			console.log("This is an " + this.itemType);
			console.log(this.stableSubInfo.tickets);
			
		}
	},
}
</script>