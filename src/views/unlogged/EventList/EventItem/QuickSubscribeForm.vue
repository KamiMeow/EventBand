<template>	
	<v-row justify="center" >
    <v-dialog v-model="dialog" persistent max-width="50vw">
      <template #activator="{ on }">
        <v-btn color="primary" dark v-on="on">Quick subscribe</v-btn>
      </template>
      <v-card>

						<v-layout justify-center>
							<v-card-title class="title">For quick subscribe fill the following fields</v-card-title>
						</v-layout>
						<v-layout
							justify-center
						>
								<form-base 

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
  </v-row>
</template>

<script>
import FormBase from '@/components/base/FormBase';

export default {
	name: 'QuickSubscribeForm',
	components: {
		FormBase,
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
		subscribeOnEvent() {
			console.log(lol);
			
		}
	},
}
</script>

<style src="@/scss/_width.scss" lang="scss">
	
</style>