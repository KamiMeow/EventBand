<template>
	<v-row justify="start" class="ml-3">
    <v-dialog v-model="dialog" persistent max-width="30vw">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" class="mt-2 align-self-start" dark v-on="on">Edit profile</v-btn>
      </template>
      <v-card>
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
  </v-row>
</template>


<script>
export default {
	name: 'EditProfileForm',

	data: () => ({
		dialog: false,
	}),

	computed: {
		userInfo() {
			return this.$store.getters['auth/getEditableUser'];
		}
	},

	methods: {
		saveProfileInfo() {
			this.dialog = false;
			this.$nextTick( () => {
				this.$store.dispatch('auth/setActualUser', this.userInfo);
			});
		},

		closeDialog() {
			this.dialog = false;
			this.$nextTick( () => {
				this.$store.dispatch('auth/unsetEditableUser');
			});
		},
	}

}
</script>