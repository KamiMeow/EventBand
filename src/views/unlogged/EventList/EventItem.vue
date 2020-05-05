<template>
	<v-card
		class="pa-2 my-2 d-inline-block"
		style="max-width: 65vw; min-width: 65vw"
		color="secondary"
		elevation="0"
		tile
	>
		<v-container>
			<v-layout row class="ma-0 px-3" align-center>
				<v-flex
					xl1 lg1
				>
					<v-img
						height="100"
						width="100"
						:src="imagePath"/>
				</v-flex>
				<v-flex xl4 lg4 md4>
					<v-layout
						class="d-flex flex-column px-3">
						<p class="text-left white--text headline" > {{ eventName }} </p>
						<p class="text-left white--text" > {{ eventDescription }} </p>
					</v-layout>
				</v-flex>
				<v-flex 
					xl2 lg2 
					style="max-height: 130px; overflow-y: auto;"
				>
					<v-layout
						class="d-flex flex-column"
						style="">
						<v-chip
							v-for="tag in tags"
							:key="tag.text"
							color="primary"
							class="my-1"
							small
						>
							<v-icon
								left
								v-text="tag.icon"
							></v-icon>
							{{ tag.text }}
						</v-chip>
					</v-layout>
				</v-flex>
				<v-flex xl2 lg2 class="px-2 pt-1 white--text">
					<p> Price:  {{ price }} $ </p>
					<p> Participants: {{ currentParticipantsAmount }} / {{ maxParticipantsAmount }} </p>
					<p> Date: <v-btn class="white--text" text v-text="date" /> Time: <v-btn class="white--text" text v-text="time" /> </p>
				</v-flex>
				<v-flex xl3 lg3>
					<v-card-actions>
						<v-layout  class="d-flex flex-column justify-start py-3">
							<v-btn 
								color="primary"
								class="mb-1"
								depressed
								x-large
							> subscribe 
							</v-btn>
							<v-btn 
								color="secondary"
								class="my-1"
								depressed
							> view 
							</v-btn>
							<v-btn 
								color="primary"
								class="my-1"
								text
								> don`t show again 
							</v-btn>
						</v-layout>
					</v-card-actions>
				</v-flex>
			</v-layout>
		</v-container>
	</v-card>
</template>

<script>
import CalendarInput from '@/components/helper/DateTimePicker/CalendarInput';
import TimeInput from '@/components/helper/DateTimePicker/TimeInput';

const items = [
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
	name: 'EventItem',

	components: {
		CalendarInput,
		TimeInput,
	},
	
	data: () => ({
		path: '/logo-organization.png',
		name: 'Event name',
		price: '20',
		date: '4.21.2020',
		time: '01:25 PM',
		currentParticipantsAmount: 35,
		maxParticipantsAmount: 100,
		description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem illo ducimus quas praesentium repellendus. Itaque, officiis dolor corrupti`,
		items,
	}),

	computed: {
		imagePath() {
			return this.path; 
		},
		eventName() {
			return this.name;
		},
		eventDescription() {
			return this.description;
		},
		tags() {
			return this.items;
		},
		eventDate() {
			return this.date;
		},
		eventTime() {
			return this.time;
		}
	},
}
</script>

<style lang="scss" scoped>
	::-webkit-scrollbar { 
    width: 0px;  
    background: transparent;
	}
</style>