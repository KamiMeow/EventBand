<template>
	<v-dialog
		v-model="dialog"
		max-width="600px"
		persistent
	>
		<template #activator="{ on }">
			<v-btn
				v-on="on"
				class="align-self-center ma-2"
				color="secondary"
				depressed
				right
				small
			>
				Book ticket
			</v-btn>
		</template>
		<form-base
			ref="form"
			maxWidth="600px"
			@submit.prevent="bookTicket"
		>
			<template #title>
				<span class="title my-3"> Fill in the following fields </span>
			</template>
			<v-layout column>
				<v-flex xs8>
					<v-text-field
						v-model="email"
						:rules="[rules.required, rules.email]"
						label="Email"
						maxlength="30"
						outlined
						counter
						dense
					/>
				</v-flex>
				<v-flex xs8>
					<v-text-field
						v-model="surname"
						:rules="[rules.required, rules.min('surname')]"
						label="Surname"
						maxlength="60"
						outlined
						counter
						dense
					/>
				</v-flex>
				<v-flex xs8>
					<v-text-field
						v-model="name"
						:rules="[rules.required, rules.min('name')]"
						label="Name"
						maxlength="60"
						outlined
						counter
						dense
					/>
				</v-flex>
			</v-layout>
			<template #actions>
				<v-layout justify-space-around>
					<v-btn
						color="error"
						@click="dialog = false"
					>
						Close
					</v-btn>
					<v-btn
						color="success darken-1"
						type="submit"
					>
						Book ticket
					</v-btn>
				</v-layout>
			</template>
		</form-base>	
	</v-dialog>
</template>

<script>
import FormBase from '@/components/base/FormBase';

export default {
	name: 'bookDialog',

	components: {
		FormBase,
	},

	props: {
		ticketUuid: String,
	},

	data: () => ({
		dialog: false,

		email: '',
		surname: '',
		name: '',

	}),

	computed: {
		rules() {
			return this.$store.getters['getRules'];
		},
	},

	methods: {
		async bookTicket() {
			let message = await this.$store.dispatch('nonauth/subscribeOnEvent', {
				ticketUuid: this.ticketUuid,
				email: this.email,
				surname: this.surname, 
				name: this.name,
			});

			this.$refs.form.resetForm();
			this.dialog = false;
			this.$store.dispatch('notification/set', {
				message: message,
				type: 'warning',
			});
		},
	},
}
</script>