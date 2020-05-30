<template>
	<v-dialog v-model="dialog" persistent max-width="600px">
		<template v-slot:activator="{ on }">
			<v-btn color="primary" dark v-on="on">Edit profile</v-btn>
		</template>
		<v-card>
			<v-layout 
				justify-center
				align-content-center	
			>
				<v-dialog
					width="400"
					v-model="postDialog">
					<v-alert type="error"> 
						{{ postMessage }}
					</v-alert>
				</v-dialog>	
			</v-layout>
			<v-card-title>
				<span class="headline">Profile info</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12" sm="6" md="4">
							<v-text-field 
								v-model="userInfo.email"
								label="Email*"
								required/>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field 
								v-model="userInfo.nickname"
								label="Nickname*"/>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								v-model="userInfo.surname"
								label="Surname*"
								required
							/>
						</v-col>
						<v-col cols="12">
							<v-text-field 
								v-model="userInfo.name"
								label="Name*"
								required/>
						</v-col>
					</v-row>
				</v-container>
				<small>*indicates required field</small>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="error" @click="closeDialog">Close</v-btn>
				<v-btn color="success" @click="saveProfileInfo">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>


<script>
export default {
	name: 'EditProfileForm',

	data: () => ({
		dialog: false,
		postDialog: false,
		postMessage: '',
	}),

	computed: {
		userInfo() {
			return this.$store.getters['profile/getEditableUser'];
		}
	},

	methods: {
		async saveProfileInfo() {
			this.dialog = false;
			
			let resp = await this.$store.dispatch('profile/setActualUser', this.userInfo) || {};
			console.log('sos',resp);
			
			if (resp.message) {
				this.$store.dispatch('notification/set', {
					message: resp.message,
					type: 'error',
				});
			}
		},

		closeDialog() {
			this.dialog = false;
			this.$nextTick( () => {
				this.$store.dispatch('profile/unsetEditableUser');
			});
		},
	}

}
</script>