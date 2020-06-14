<template>
	<v-navigation-drawer
		width="450px"
		permanent
		floating
		clipped
		right
		app
	>
		<v-form>
			<div class="title text-center my-2">Filters</div>

			<toggle-element>
				<template #title>Themes</template>

				<v-layout wrap>
					<v-chip
						v-for="(tag, i) in selectedTags"
						:key="tag.uuid"
						color="primary ma-1"
						close
						@click:close="selectedTags.splice(i, 1)"
					>
						{{ tag.name }}
					</v-chip>
				</v-layout>

				<v-layout wrap class="mt-4">
					<template v-for="tag in tags">
						<v-chip
							v-if="!selected.includes(tag)"
							:key="tag.uuid"
							class="ma-1"
							@click="selected.push(tag)"
						>
							{{ tag.name }}
						</v-chip>
					</template>
				</v-layout>
			</toggle-element>

			<toggle-element>
				<template #title>Event people limit</template>

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
			</toggle-element>

			<toggle-element>
				<template #title>Price</template>

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
			</toggle-element>

			<toggle-element>
				<template #title>Date</template>

				<v-layout wrap justify-space-between>
					<v-flex xs5>
						<calendar-input 
							v-model="dateFrom"
							:showCurrent="new Date().toISOString().substr(0, 10)"
						/>
					</v-flex>
					<v-flex xs5>
						<time-input v-model="timeFrom"/>
					</v-flex>
					
					<v-flex xs5>
						<calendar-input 
							v-model="dateTo"
							:showCurrent="dateFrom"
						/>
					</v-flex>
					<v-flex xs5>
						<time-input v-model="timeTo" />
					</v-flex>
				</v-layout>
			</toggle-element>

			<toggle-element>
				<template #title>Rating</template>

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
			</toggle-element>
		</v-form>
	</v-navigation-drawer>
</template>

<script>
import CalendarInput from '@/components/helper/DateTimePicker/CalendarInput';
import TimeInput from '@/components/helper/DateTimePicker/TimeInput';
import ToggleElement from '@/components/base/ToggleElement'

export default {
	name: 'Filters',

	components: {
		CalendarInput,
		ToggleElement,
		TimeInput,
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
		maxPeople: 5000,
		maxPeopleLimit: 2000,

		minPrice: 0,
		maxPrice: 0,
		range: [0, 0],

		dateFrom: new Date().toISOString().substr(0, 10),
		dateTo: new Date().toISOString().substr(0, 10),
		timeTo: '00:00',
		timeFrom: '00:00',

		minRate: 3,
	}),

	methods: {
		requestEvents() {
			clearTimeout(this.timer);
			
			this.timer = setTimeout( () => {
				
				this.$store.dispatch('nonauth/requestEvents', {
					params: {
						dateFrom: this.dateFrom,
						dateTo: this.dateTo,
						priceFrom: this.range[0],
						priceTo: this.range[1],
						people: this.maxPeopleLimit,
						tags: [...this.selected].map( v => v.id) || [],
						reputation: this.minRate,
					}, 
					isLogged: this.$store.getters['auth/getIsLogged'],
				});
			}, 1000);
		},
	},

	computed: {
		tags() {
			return this.$store.getters['nonauth/getAllTags'];
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
			let start = Date.parse(this.dateFrom);
			let end = Date.parse(this.dateTo);
			let diff = start - end;
			
			this.dateTo = diff > 0 ? this.dateFrom : this.dateTo;
			this.requestEvents();
		},
		
		dateTo(val) {
			this.requestEvents();
		},
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