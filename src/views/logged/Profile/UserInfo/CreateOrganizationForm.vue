<template>
	<v-dialog 
		v-model="dialog"
		width="700px"
		persistent
	>
		<template #activator="{ on }">
			<v-btn
				v-on="on"
				color="primary"
			> 
				Create organization
			</v-btn>	
		</template>

		<template #default>
			<v-card>

				<v-layout justify-center>
					<form-base
						ref="form"
						@submit="createNewOrganization"
					>	
						<template #title>
							<span> Create your own Organization </span>
						</template>
						<template #default>
							<v-layout column align-center>
								<v-text-field
									v-model="name"
									:rules="[rules.required]"
									label="Organization name"
									class="width-l"
									outlined
									dense
								/>
								<v-textarea
									v-model="description"
									:rules="[rules.required]"
									label="Description"
									class="width-l"
									outlined
								/>
								<vue-dropzone 
									ref="myVueDropzone" 
									id="dropzone" 
									:options="dropzoneOptions"
									@vdropzone-success="fileAdded"
								/>
							</v-layout>
						</template>
						<template #actions>
							<v-layout justify-space-around> 
								<v-btn 
									color="error" 
									@click="closeForm"
								> 
									Close
								</v-btn>
								<v-btn 
									color="success"
									type="submit"
								> 
									Create 
								</v-btn>
							</v-layout>
						</template>
					</form-base>
				</v-layout>
			</v-card>
		</template>
		<v-dialog z-index="10" v-model="resultDialog" width="600px" max-width="600px">
			<v-alert
				type="error"
				align="center"
			>
				{{ dialogMessage }}

			</v-alert> 
		</v-dialog>
	</v-dialog>
</template>

<script>
import FormBase from '@/components/base/FormBase';
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'


export default {
	name: 'CreateOrganizationForm',
	components: {
		FormBase,
		vueDropzone: vue2Dropzone,
	},

	data: () => ({
		dialog: false,
		resultDialog: false,

		dropzoneOptions: {
			url: 'https://httpbin.org/post',
			addRemoveLinks: true,
			thumbnailWidth: 150,
			maxFilesize: 0.5,
			// maxFiles: 1,
			// headers: { "My-Awesome-Header": "header value" }
		},

		name: '',
		description: '',
		logo: {},

		dialogMessage: '',
	}),

	computed: {
		rules() {
			return this.$store.getters['getRules'];
		},
	},

	methods: {

		closeForm() {
			this.$refs.form.resetForm();
			this.$refs.form.resetValidation();
			this.$refs.myVueDropzone.removeAllFiles();
			this.dialog = false;
		},
		
		async createNewOrganization() {
			
			let filesCount = this.$refs.myVueDropzone.getAcceptedFiles().length;
			if (filesCount > 1 || filesCount == 0) {
				return this.$refs.form.setAlert('Make sure you uploaded the only one file', 'warning');
			}

			let message = await this.$store.dispatch('organization/createNewOrganization', {
				name: this.name,
				description: this.description,
				logo: this.$refs.myVueDropzone.getAcceptedFiles()[0],
			});

			if (message) {
				
				console.log(message);
				this.$refs.form.setAlert(message.message, 'error');
				this.resultDialog = true;
				console.log(this.resultDialog);
				
				this.dialogMessage = message;
			} else {
				this.$refs.form.resetForm();
				this.$refs.form.resetValidation();
				this.$refs.myVueDropzone.removeAllFiles();
				this.dialog = false;
			}

		},

		fileAdded(file, resp) {
			console.log(this.$refs.myVueDropzone.getAcceptedFiles());
		}
	},
}
</script>

<style src="@/scss/_width.scss" lang="scss"></style>