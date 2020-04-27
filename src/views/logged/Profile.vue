<template>
  <v-container class="d-flex justify-center" fluid>
    <v-layout
			class="elevation-5 d-flex mt-10 flex-column"
			style="max-width: 75vw;"
		>
      <v-layout style="height: 180px;">
        <v-col class="pr-0 ma-0" cols="1">
          <v-img
						class="pa-0 ma-0"
						src="/Avatar.png"
						max-width="128"
					/>
        </v-col>

        <v-col
					class="d-flex flex-column justify-start align-start ml-0 pl-0"
					cols="8"
				>
          <v-btn
						class="display-1 pa-0"
						x-large
						left
						text
						tile
					>{{ nickname }}</v-btn>
          <v-btn
						class="title pa-0"
						disabled
						x-large
						left
						text
						tile
					>{{ email }}</v-btn>
        </v-col>
        <v-divider vertical />

        <v-col cols="2">
          <v-btn
						color="primary"
						class="mt-2"
						@click="editProfile"
					>Edit profile</v-btn>
          <v-btn
						color="primary"
						class="mt-2"
						@click="changePassword"
					>Change password</v-btn>
        </v-col>
      </v-layout>

      <v-layout>
        <v-col cols="12">
          <div class="headline">My subscriptions</div>
        </v-col>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      nickname: "Ryab4ik",
      email: "example@gmail.com"
    };
  },
  methods: {
    editProfile() {},
    changePassword() {}
  }
};
</script>