<template>
	<v-col
		class="d-flex flex-column justify-start align-center"
		cols="3">
		<v-expansion-panels
			multiple
			accordion
		>
			Filters
		<v-expansion-panel
			elevation="0">
			<v-expansion-panel-header> Themes </v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-row
					align="center"
					justify="start"
				>	
					<v-col
						v-for="(tag, i) in selectedTags"
						:key="tag.text"
						class="shrink"
					>
						<v-chip
							color="primary"
							close
							@click:close="selectedTags.splice(i, 1)"
						>
							<v-icon
								left
								v-text="tag.icon"
							></v-icon>
							{{ tag.text }}
						</v-chip>
					</v-col>
				</v-row>
				<v-row
					align="center"
					justify="start"
				>
					<template
						v-for="tag in tags"
					>
						<v-col
							v-if="!selected.includes(tag)"
							:key="tag.text"
							class="shrink"
						>
							<v-chip
								@click="selected.push(tag)"
							>
								<v-icon
									left
									v-text="tag.icon"
								></v-icon>
								{{ tag.text }}
							</v-chip>
						</v-col>
					</template>
				</v-row>
			</v-expansion-panel-content>
		</v-expansion-panel>
		<v-expansion-panel
			elevation="0">
			<v-expansion-panel-header> Event people limit </v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-row>
					<v-slider
						v-model="maxPeopleLimit"
						:max="maxPeople"
						:min="minPeople"
						class="align-center"
						hide-details
					>
						<template v-slot:append>
							<v-text-field
								v-model="maxPeopleLimit"
								:max="maxPeople"
								style="width: 60px"
								class="mt-0 pt-0"
								type="number"
								hide-details
								single-line
							></v-text-field>
						</template>
					</v-slider>
				</v-row>
			</v-expansion-panel-content>
		</v-expansion-panel>
		<v-expansion-panel
			elevation="0">
			<v-expansion-panel-header> Price </v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-row>
					<v-col cols="12">
						<v-switch 
							v-model="isFree"
							:label="isFree ? 'Free' : 'Paid'"
						/>
					</v-col>
					<v-col
						v-if="!isFree"
					>
						<v-range-slider
							v-model="range"
							:max="120"
							:min="1"
							class="align-center"
							hide-details
						>
							<template v-slot:prepend>
								<v-text-field
									:value="range[0]"
									:min="minPrice"
									class="mt-0 pt-0"
									style="width: 60px"
									type="number"
									hide-details
									single-line
									@change="$set(range, 0, $event)"
								></v-text-field>
							</template>
							<template v-slot:append>
								<v-text-field
									:value="range[1]"
									:max="maxPrice"
									style="width: 60px"
									class="mt-0 pt-0"
									type="number"
									single-line
									hide-details
									@change="$set(range, 1, $event)"
								></v-text-field>
							</template>
						</v-range-slider>
					</v-col>
				</v-row>
			</v-expansion-panel-content>
		</v-expansion-panel>
		<v-expansion-panel
			elevation="0">
			<v-expansion-panel-header> Date </v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-row>
					<v-col
						cols="12"
					>
						<v-switch 
							v-model="isPeriod"
							:label="isPeriod ? 'One-day' : 'Period'"
						/>
					</v-col>
					<v-col
						cols="6"
					>
						<calendar-input/>
					</v-col>
					<v-col
						cols="6"
					>
						<time-input/>
					</v-col>
					<template
						v-if="isPeriod"
					>
						<v-col
							cols="6"
						>
							<calendar-input/>
						</v-col>
						<v-col
							cols="6"
						>
							<time-input/>
						</v-col>
					</template>
				</v-row>
			</v-expansion-panel-content>
		</v-expansion-panel>
		<v-expansion-panel
			elevation="0">
			<v-expansion-panel-header> Rating </v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-row>
					<v-col
						cols="12"
					>
						<v-slider
							v-model="minRate"
							label="Min rate"
							class="align-center"
							thumb-label
							max="10"
							min="1"
							hide-details
						>
							<template v-slot:append>
								<v-text-field
									v-model="minRate"
									style="width: 60px"
									class="mt-0 pt-0"
									type="number"
									max="10"
									hide-details
									single-line
								></v-text-field>
							</template>
						</v-slider>
					</v-col>
				</v-row>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
	</v-col>
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
	name: 'Filters',

	components: {
		CalendarInput,
		TimeInput,
	},
	
	data: () => ({
		date: new Date().toISOString().substr(0, 10),
      menu: false,

			selected: [],
			items,
			
			minPeople: 1,
			maxPeople: 350,
			maxPeopleLimit: 60,

			minPrice: 1,
			maxPrice: 120,
			range: [1, 20],

			isFree: true,
			isPeriod: false,

			minRate: 3,
	}),

	computed: {
		tags() {
			return this.items;
		},
		selectedTags() {
			return this.selected;
		}
	},
}
</script>