<template>
		<v-flex xs10>
			<v-dialog
				v-model="addDialog"
				max-width="500px"
				@click:outside="leftDialog"
			>
				<template #activator="{on}">
				<v-layout column>
					<v-btn
						v-on="on"
						color="primary"
						class="my-2"
						@click="addDialog = true"
					>
						Add organizer
					</v-btn>			
				</v-layout>
				</template>
					<form-base
						ref="addOrganizerForm"
						@submit.prevent="sendInviteToUser"
					>
						<template #title>
							<div class="text-center">
								<span class="title"> Write E-mail address User you want to make as Organizer </span>
							</div>
						</template>
						<v-text-field
							v-model="email"
							label="E-mail address"
							:rules="[rules.email, rules.required]"
							type="email"
							outlined
							dense

							prepend-icon="mdi-email"
							append-icon="mdi-close"
							@click:append="email = ''"
							counter
						/>
						<template #actions>
							<v-layout justify-center>
								<v-btn
									:loading="isRequesting"
									class="text-center"
									type="submit"
									color="info"
								>
									Send invite
								</v-btn>
							</v-layout>
						</template>
					</form-base>
			</v-dialog>
		</v-flex>
</template>

<script>
import FormBase from '@/components/base/FormBase';

export default {
	name: 'NewOrganizerDialog',

	components: {
		FormBase,
	},

	data: () => ({
		addDialog: false,
		isRequesting: false,
		
		email: '',
	}),

	computed: {
		rules() {
			return this.$store.getters['getRules'];
		},
	},

	methods: {
		async sendInviteToUser() {
			this.isRequesting = true;
			await this.$store.dispatch('organization/sendInviteBeOrganizer', this.email);
			this.isRequesting = false;
			
			this.leftDialog();
		},

		leftDialog() {
			this.$refs.addOrganizerForm.resetValidation();
			this.$refs.addOrganizerForm.resetForm();
		},
	},
}
</script>