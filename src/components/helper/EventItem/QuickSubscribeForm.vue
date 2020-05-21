<template>	
	<v-row justify="center" >
    <v-dialog v-model="dialog" persistent max-width="50vw">
      <template #activator="{ on }">
        <v-btn class="align-self-center"  color="primary" dark v-on="on">Quick subscribe</v-btn>
      </template>
      <v-card>
				<v-layout justify-center>
					<v-card-title class="title">For quick subscribe fill the following fields</v-card-title>
				</v-layout>
				<v-layout
					justify-center
				>
					<form-base 
						ref="quickForm"
						@submit.prevent="subscribeOnEvent">
						<template #title>
							Quick subscribe form
						</template>
						<v-layout
							column
							align-content-center
							justify-center
						> 
							<v-text-field
								v-model="email"
								:rules="[rules.email, rules.required]"
								label="Your e-mail"
								class="width-l"
								outlined
								dense
							/>
							<v-text-field
								v-model="surname"
								:rules="[rules.required, rules.min('surname')]"
								label="Your surname"
								class="width-l"
								maxlength="20"
								type="email"
								outlined
								dense
							/>
							<v-text-field
								v-model="name"
								:rules="[rules.required, rules.min('name')]"
								label="Your name"
								class="width-l"
								maxlength="20"
								outlined
								dense
							/>
						</v-layout>
						<v-layout column>
							<span class="headline align-self-center" > Tickets </span>
							<v-radio-group v-model="radio">
								<v-tooltip 
									v-for="ticket in tickets"
									:key="ticket.uuid"
									left
								>
									<template #activator="{ on }">
										<v-radio 
											color="black"
											:label="ticket.name"
											:value="ticket.uuid"
											v-on="on"
										/>
									</template>
									<span> {{ ticket.description }} </span>
								</v-tooltip>
							</v-radio-group>
						</v-layout>
						<template #actions>
							<v-layout 
								fill-width
								justify-center
							>
								<v-btn color="error" text @click="dialog = false">Back</v-btn>
								<v-btn type="submit" color="green darken-1 white--text">Subscribe</v-btn>
							</v-layout>
						</template>
					</form-base>
				</v-layout>
      </v-card>
    </v-dialog>
		<v-dialog 
			v-model="cbDialog"
			width="400px"
			class="pa-0"
		>
			<v-alert
				border="top"
				type="info"
				class="ma-0"
			> 
				{{ cbMessage }} 
			</v-alert>
		</v-dialog>
  </v-row>
</template>

<script>
import FormBase from '@/components/base/FormBase';

export default {
	name: 'QuickSubscribeForm',

	components: {
		FormBase,
	},
	
	props: {
		tickets: Array,
	},

	data: (vm) => ({
		dialog: false,
		cbDialog: false,
		email: '',
		surname: '',
		name: '',
		radio: vm.tickets[0].uuid,

		cbMessage: 'nothing happend',
	}),

	computed: {
		rules() {
			return this.$store.getters['getRules'];
		},
	},

	methods: {
		async subscribeOnEvent() {
			let message = await this.$store.dispatch('nonauth/subscribeOnEvent', {
				ticketUuid: this.radio,
				email: this.email,
				surname: this.surname, 
				name: this.name,
			});

			// console.log(this.$refs.quickForm);
			
			// this.$refs.quickForm.reset();
			this.cbDialog = true;
			this.cbMessage = message;
			this.dialog = false;
		},

	},

	watch: {
		radio(val) {
			console.log(val);
		}
	}

}
</script>

<style src="@/scss/_width.scss" lang="scss">
	
</style>