<template>
	<v-layout wrap>
		<v-flex xs12>
			<v-layout justify-center>
				<form-base
					ref="form"
					minWidth="600px"
					@submit.prevent="createNews"
				>
					<template #title> 
						<span class="headline">
							Create news
						</span>
					</template>
					
						<v-text-field
							v-model="title"
							prepend-icon="mdi-subtitles-outline"
							append-icon="mdi-close"
							maxlength="100"
							label="News title"
							outlined
							counter
							dense
							@click:append="title = ''"
						/>
						<v-textarea
							v-model="text"
							prepend-icon="mdi-text"
							label="News text"
							rows="6"
							no-resize
							clearable
							outlined
							counter
							filled
						/>

					<template #actions>
						<v-layout justify-space-around>
							<v-btn
								color="warning darken-3"
							to="/my-organization"
							>	
								to profile
							</v-btn>
							<v-btn
								color="success"
								type="submit"
								:loading="isRequesting"
							>
								<v-icon left>
									mdi-email-receive-outline
								</v-icon>
								Submit news
							</v-btn>
						</v-layout>
					</template>
				</form-base>
			</v-layout>
		</v-flex>
		<v-layout wrap justify-center>
			<v-flex 
				v-for="newsItem in news"
				:key="newsItem.uuid"
				xs8
			>
				<news-item
					:news="newsItem"
					:showOrganizationName="false"
				/>
			</v-flex>
		</v-layout>
	</v-layout>
</template>

<script>
import FormBase from '@/components/base/FormBase';
import NewsItem from '@/components/helper/NewsItem';

export default {
	name: 'CreateNewsForm',

	components: {
		FormBase,
		NewsItem,
	},
	
	created() {
		this.requestMyNews();
	},
	
	data: () => ({
		isRequesting: false,
		
		title: '',
		text: '',
	}),

	computed: {
		rules() {
			return this.$store.getters['getRules'];
		},
		news() {
			return this.$store.getters['organization/getNews'];
		},
	},

	methods: {
		async createNews() {
			this.isRequesting = true;
			await this.$store.dispatch('organization/createNews', {
				title: this.title,
				text: this.text,
				image: 'no-image',
			});
			this.isRequesting = false;
			console.log('news is created');
		},

		requestMyNews() {
			this.$store.dispatch('organization/getMyNews');
		},
	},

	

}
</script>