<template>
	<v-layout justify-center>
		<v-flex xs8>
			<v-layout justify-center>
				<form-base
					ref="form"
					@submit.prevent="submitNewOrganizationInfo"
					:minWidth="'600px'"
				>
					<template #title>
						<span class="display-1"> Edit information </span>
					</template>
					<v-text-field
						v-model="name"
						label="Organization name"
						append-icon="mdi-close"
						maxlength="100"
						outlined
						counter
						dense
						@click:append="name = ''"
					/>
					<v-textarea
						v-model="description"
						label="Description"
						rows="6"
						no-resize
						clearable
						outlined
						filled
					/>

					<template #actions>
						<v-layout justify-space-around>
							
							<v-btn
								color="error darken-2"
								@click="toProfile"
							>
								To profile
							</v-btn>

							<v-btn
								color="warning darken-2"
								@click="setOrgInfo"
							>
								Reset
							</v-btn>

							<v-btn
								color="success darken-2"
								:loading="isRequesting"
								@click="submitNewOrganizationInfo"
							>
								Submit info
							</v-btn>
				
						</v-layout>
					</template>
				</form-base>
			</v-layout>
		</v-flex>
	</v-layout>
</template>

<script>
import FormBase from '@/components/base/FormBase';

export default {
	name: 'EditOrganizationForm',

	components: {
		FormBase,
	},

	created() {
		this.setOrgInfo();
	},

	data: () => ({
		isRequesting: false,
		
		name: '',
		description: '',
	}),

	computed: {
		rules() {
			return this.$store.getters['getRules'];
		},
	},

	methods: {

		toProfile() {
			this.$router.push('/my-organization');
		},

		setOrgInfo() {
			this.name = this.$store.getters['organization/getActualOrganization'].name;
			this.description = this.$store.getters['organization/getActualOrganization'].description;
			console.log(this.name, this.description);
		},
		
		async submitNewOrganizationInfo() {
			this.isRequesting = true;
			let { message = null } = await this.$store.dispatch('organization/updateOrganizationInfo', { name: this.name, description: this.description, });
			this.isRequesting = false;
		},
	},
}
</script>