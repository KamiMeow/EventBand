<template>
	<v-row justify="start" class="ml-3">
    <v-dialog v-model="dialog" persistent max-width="30vw">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" class="mt-2 align-self-start" dark v-on="on">Change password</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Change password</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field 
									v-model="oldPassword"
									label="Old password*"
									required/>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field 
									v-model="newPassword"
									label="New password*"
									required/>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog = false">Close</v-btn>
          <v-btn color="success" @click="changePassword">Change</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
	data: () => ({
		dialog: false,
		oldPassword: '',
		newPassword: '',
	}),

	methods: {
		changePassword() {
			this.dialog = false;
		}
	}
}
</script>