<template>
  <v-container
		class="d-flex flex-column"
		fluid
	>
		<v-layout 
			v-if="isPreloading"
			justify-center
			align-center
			fill-height
		>
			<v-progress-circular
				color="secondary"
				size="64"
				indeterminate
			/>
		</v-layout>
		<template v-else>
			<filters/>
			<v-layout justify-center align-center wrap>
				<v-flex 
					color="secondary"
					lg9 md8 sm12 xs12
				>
					<ya-map/>
				</v-flex>
			</v-layout>
			<v-layout 
				class="my-8" 
				justify-center
				wrap
			>
				<v-flex
					xs12 sm10 md10
					v-for="i in events"
					:key="i.uuid"
				>
					<event-item 
						:event="i"
						:tickets="i.tickets"
						:tags="i.tags"
						:canSubscribe="true"
						:canView="true"
						:canEdit="false"
					/>
				</v-flex>
			</v-layout>
		</template>
	</v-container>
</template>

<script>

// import yaMap from '@/components/helper/Ya-map';
import yaMap from './Ya-map';
import Filters from './Filters';
import EventItem from '@/components/helper/EventItem';

export default {
	name: 'EventList',

	components: {
		yaMap,
		Filters,
		EventItem,
	},

	created() {
		this.isPreloading = true;
		this.setUpPageContent();
	},

	beforeDestroy() {
		this.$store.dispatch('nonauth/resetEvents');
	},	

	data: () => ({
		isPreloading: true,
	}),

	computed: {
		events() {
			return this.$store.getters['nonauth/getEvents'];
		},
	},

	methods: {
		breakPreloading() {
			this.isPreloading = false;
		},

		async setUpPageContent() {
			await this.$store.dispatch('nonauth/requestAllTags');
			let timer = setTimeout(() => {
				this.breakPreloading();
				clearTimeout(timer);
			}, 300);
		},
	},
}
</script>

<style lang="scss" scoped>
	// ::-webkit-scrollbar {
  //   width: 0px;
  //   background: transparent;
	// }
</style>