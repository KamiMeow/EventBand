<template>
	<v-layout
		class="d-flex flex-column justify-start align-center"
		:class="maxFilterHeight"
		style="overflow-y: auto;"
	>
		<v-form>
		<v-expansion-panels
			:value="expandedPanels"
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
								:key="i"
								class="shrink"
							>
								<v-chip
									color="primary"
									close
									@click:close="selectedTags.splice(i, 1)"
								>
									{{ tag.name }}
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
									:key="tag.uuid"
									class="shrink"
								>
									<v-chip
										@click="selected.push(tag)"
									>
										{{ tag.name }}
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
								thumb-label="always"
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
									:max="2500"
									:min="0"
									thumb-label="always"
									class="align-center"
									hide-details
								>
									<template v-slot:prepend>
										<v-text-field
											:value="range[0]"
											:min="minPrice"
											style="width: 60px"
											class="mt-0 pt-0"
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
											hide-details
											single-line
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
									:label="isPeriod ? 'Period' : 'One-day'"
								/>
							</v-col>
							<v-col
								cols="6"
							>
								<calendar-input 
									v-model="dateFrom"/>
							</v-col>
							<v-col
								cols="6"
							>
								<time-input v-model="timeFrom"/>
							</v-col>
							<template
								v-if="isPeriod"
							>
								<v-col
									cols="6"
								>
									<calendar-input 
										v-model="dateTo"/>
								</v-col>
								<v-col
									cols="6"
								>
									<time-input v-model="timeTo" />
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
									thumb-label="always"
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
		</v-form>
	</v-layout>
</template>

<script>

import CalendarInput from '@/components/helper/DateTimePicker/CalendarInput';
import TimeInput from '@/components/helper/DateTimePicker/TimeInput';

export default {
	name: 'Filters',

	components: {
		CalendarInput,
		TimeInput,
	},

	async created() {
		await this.$store.dispatch('nonauth/requestAllTags');
		this.items = this.$store.getters['nonauth/getAllTags'];
	},

	beforeDestroy() {
		clearTimeout(this.timer);
	},
	
	data: () => ({

			timer: {},
			date: new Date().toISOString().substr(0, 10),
      menu: false,

			selected: [],
			items: [],
			
			minPeople: 1,
			maxPeople: 2500,
			maxPeopleLimit: 60,

			minPrice: 0,
			maxPrice: 0,
			range: [0, 0],

			dateFrom: '2020-05-10',
			dateTo: new Date().toISOString().substr(0, 10),
			timeTo: '',
			timeFrom: '',


			isFree: true,
			isPeriod: false,

			minRate: 3,

			expandedPanels: [0, 1, 2, 3, 4],
	}),

	methods: {
		changeWholeForm(e) {
			console.log(1);
		},

		requestEvents() {
			clearTimeout(this.timer);
			// console.log([...this.selected].map( v => v.id));
			
			this.timer = setTimeout( () => {
				console.log(this.maxPrice);
				
				this.$store.dispatch('nonauth/requestEvents', {
					dateFrom: this.dateFrom,
					dateTo: this.dateTo,
					priceFrom: this.range[0],
					priceTo: this.range[1],
					people: this.maxPeopleLimit,
					tags: [...this.selected].map( v => v.id) || [],
					reputation: this.minRate,
				});
			}, 1000);
		},
	},

	computed: {
		tags() {
			return this.items;
		},
		selectedTags() {
			return this.selected;
		},
		maxFilterHeight() {
			switch (this.$vuetify.breakpoint.name) {
				case 'xs': 
				case 'sm': 
				case 'md': 
					return 'vh-xs';
				case 'xl': 
				case 'lg': 
					return 'vh-lg';
				default: 
					return 'vh-lg';
			}
		},

	},

	watch: {

		selected(val) {
			this.requestEvents();
		},

		isFree(val) {
			if (val) {
				this.range = [0, 0];
			}
			this.requestEvents();
		},
		
		isPeriod(val) {
			this.dateTo = this.dateFrom;
			this.requestEvents();
		},

		minRate(val) {
			this.requestEvents();
		},

		range(val) {
			this.requestEvents();
		},
		
		maxPeopleLimit(val) {

			this.requestEvents();
		},

		dateFrom(val) {
			this.requestEvents();
		},
		
		dateTo(val) {
			this.requestEvents();
		},


		// minPrice(val) {
		// 	console.log('MIN ', val);
		// 	this.range[0]
		// },

		// maxPrice(val) {
		// 	console.log('MAX ', val);
		// },
	},
}
</script>

<style lang="scss" scoped>
	.vh-lg { 
		height: 80vh;
		max-height: 80vh;
	}

	.vh-xs { 
		height: 60vh;
		max-height: 60vh;
	}

	::-webkit-scrollbar { /* chrome based */
    width: 0px;  /* ширина scrollbar'a */
    background: transparent;  /* опционально */
	}
</style>