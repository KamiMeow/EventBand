<template>

	<v-layout 
		fill-height
		justify-center
		wrap
	>
	 <v-flex xs8>

		<form-base
			ref="form"
			:maxWidth="'800px'"
			:minWidth="'600px'"
			@submit.prevent="submitEventInfo"
		>
			<template #title>
				<span> Enter info for Event </span>
			</template>
			<v-text-field
				v-model="name"
				:rules="[rules.required, rules.min('event-name')]"
				append-icon="mdi-close"
				label="Event name"
				tabindex="1"
				outlined
				dense
				@click:append="name = ''"
			/>

			<v-textarea
				v-model="description"
				:rules="[rules.required, rules.min('event-description')]"
				tabindex="2"
				rows="6"
				no-resize
				clearable
				outlined
				counter
			/>

			<v-layout justify-space-around>
				<v-flex xs5>
					<calendar-input
						v-model="dateFrom"
						:rules="[rules.required]"
						:showCurrent="minDate"
						tabindex="3"
					/>
				</v-flex>
				<v-flex xs5>
					<time-input
						v-model="timeFrom"
						:rules="[rules.required]"
						tabindex="4"
					/>
				</v-flex>
			</v-layout>
			<v-layout justify-space-around>
				<v-flex xs5>
					<calendar-input
						v-model="dateTo"
						:rules="[rules.required]"
						:showCurrent="dateFrom"
						tabindex="5"
					/>
				</v-flex>
				<v-flex xs5>
					<time-input
						v-model="timeTo"
						:rules="[rules.required]"
						tabindex="6"
					/>
				</v-flex>
			</v-layout>
			
			<template #actions>
				<v-layout justify-space-around>
					<v-btn
						color="warning"
						@click="reset"
					>
						Reset data
					</v-btn>
					<v-btn
						color="success"
						type="sumbit"
						tabindex="7"
					>
						Submit info
					</v-btn>
				</v-layout>
			</template>
		</form-base>
	 </v-flex>
		<v-flex xs3>
			<v-card>
				<v-layout column>
					<v-card-title>
						<span> Set tags to your Event </span>
					</v-card-title>
					<v-card-subtitle>
						<span> (minimum 1 - maximum 10) </span>
					</v-card-subtitle>
					<span class="title mx-4">
						Selected tags ({{selectedTags.length}})
					</span>
					<v-divider/>
					<v-layout wrap class="pa-2">
						<v-chip
							v-for="(tag, i) in selectedTags"
							:key="tag.uuid"
							class="ma-1"
							small
							close
							@click:close="selectedTags.splice(i,1)"
						>
							{{tag.name}}
						</v-chip>
					</v-layout>
					<span class="title mx-4">
						All tags ({{tags.length - selectedTags.length}})
					</span>
					<v-divider/>
					<v-layout wrap class="pa-2">
						<v-chip
							v-for="tag in tags"
							:key="tag.uuid"
							v-if="!selectedTags.includes(tag)"
							class="ma-1"
							small
							@click="selectTag(tag)"
						>
							{{tag.name}}
						</v-chip>
					</v-layout>
				</v-layout>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import FormBase from '@/components/base/FormBase';
import CalendarInput from '@/components/helper/DateTimePicker/CalendarInput';
import TimeInput from '@/components/helper/DateTimePicker/TimeInput';

export default {
	name: 'EventInfoBlock',

	components: {
		FormBase,
		CalendarInput,
		TimeInput,
	},

	data: () => ({
		name: '',
		description: '',
		minDate: new Date().toISOString().substr(0, 10),
		dateFrom: new Date().toISOString().substr(0, 10),
		dateTo: new Date().toISOString().substr(0, 10),
		timeFrom: '00:00',
		timeTo: '00:00',

		selectedTags: [],
		tags: [],
	}),

	created() {
		this.setDataForEditEvent();
		this.tags = this.$store.getters['nonauth/getAllTags'];
	},

	computed: {
		rules() {
			return this.$store.getters['getRules'];
		},

		isEditEvent() {
			return this.$store.getters['organization/getIsOnEdit'];
		},

		editableEvent() {
			return this.$store.getters['organization/getEditableEvent'];
		},
	},
	
	methods: {

		async setDataForEditEvent() {
			if (!this.isEditEvent) return;

			await this.$store.dispatch('nonauth/requestAllTags');
			this.name = this.editableEvent.name;
			this.description = this.editableEvent.name;
			this.selectedTags = this.editableEvent.tags;
			this.dateFrom = this.editableEvent.datetimeFrom.split('T')[0];
			this.dateTo = this.editableEvent.datetimeTo.split('T')[0];
		},

		submitEventInfo() {
			if (this.selectedTags.length == 0) return this.$refs.form.setAlert('Set at least ONE tag to your Event', 'warning');

			if (this.isEditEvent) {
				return this.$store.dispatch('organization/setEventInfoBlock', {
					name: this.name,
					description: this.description,
					datetimeFrom: `${this.dateFrom}T${this.timeFrom}Z`,
					datetimeTo: `${this.dateTo}T${this.timeTo}Z`,
					tags: this.selectedTags.map( t => t.id),
				});
			}

			this.$emit('handle-event-info-block', {
				name: this.name,
				description: this.description,
				dateFrom: `${this.dateFrom}`,
				timeFrom: `${this.timeFrom}`,
				dateTo: `${this.dateTo}`,
				timeTo: `${this.timeTo}`,
				tags: this.selectedTags.map( t => t.id),
			});
		},

		selectTag(tag) {
			if (this.selectedTags.length >= 10) return;
			this.selectedTags.push(tag)
		},

		reset() {
			this.$refs.form.resetForm();
		},
	},
}
</script>