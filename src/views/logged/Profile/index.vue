<template>
  <v-container class="d-flex justify-center" fluid>
    <v-layout
			class="custom-elevation d-flex mt-10 flex-column"
			style="max-width: 75vw;"
		>
      <v-layout>
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

      <v-layout

			>
        <v-col cols="12">
          <div class="headline">My organizations</div>
					<v-divider></v-divider>
					<v-carousel
						cycle
						height="200"
						hide-delimiter-background
						show-arrows-on-hover
					>
						<v-carousel-item
							v-for="(slide, i) in slides"
							:key="i"
						>
							<v-sheet
								:color="colors[i]"
								height="100%"
							>
								<v-row
									class="fill-height"
									align="center"
									justify="center"
								>
									<div class="display-3">{{ slide }} Slide</div>
								</v-row>
							</v-sheet>
						</v-carousel-item>
					</v-carousel>
        </v-col>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import OrganizationItem from './OrganizationItem';

export default {
  data() {
    return {
      nickname: "Ryab4ik",
			email: "example@gmail.com",
			
			colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
    };
  },
  methods: {
    editProfile() {},
    changePassword() {}
  }
};
</script>