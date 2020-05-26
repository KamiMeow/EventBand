<template>
  <v-layout
    class="mx-auto overflow-hidden"
  >
		<v-app-bar
			color="primary"
			dark
			app
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-card
				class="overflow-hidden"
				style="height: fit-content; min-height: fit-content"
				height="auto"
				width="360px"
				absolute
			>
				<v-navigation-drawer
					v-model="drawer"
					absolute
					bottom
					temporary
				>
					<v-layout column>
						<template v-for="item in toolbarItems">
							<v-btn
								v-if="item.needLogin === 'all' || item.needLogin === isLogged"
								:key="item.link"
								:to="item.link"
								class="toolbar--items title text-none"
								color="secondary"
								text
							>
								{{ item.title }}
							</v-btn>
						</template>
						<v-btn
							v-if="isLogged"
							class="toolbar--items title text-none"
							color="secondary"
							text
							@click="logout"
						>
							Logout
						</v-btn>

					</v-layout>

				</v-navigation-drawer>
			</v-card>
		</v-app-bar>  
  </v-layout>
</template>

<script>
const toolbarItems = [
  { title: 'MainPage',    link: '/',            needLogin: 'all'  },
  { title: 'Profile',     link: '/profile',     needLogin: true   },
  { title: 'SignIn',      link: '/sign-in',     needLogin: false  },
  { title: 'SignUp',      link: '/sign-up',     needLogin: false  },
  { title: 'Event feed',  link: '/events/feed', needLogin: true   },
  { title: 'Event list',  link: '/events/list', needLogin: false  },
  { title: 'Event page',  link: '/event/e9c976b2-a77c-442a-8ffd-ff2a3ff4ee6a',    needLogin: 'all'   },
];

export default {
	name: 'MobileToolbar',
	data: () => ({
		drawer: false,
		group: null,
		toolbarItems,
	}),

	computed: {
    isLogged() {
      return this.$store.getters['auth/getIsLogged'];
    },
  },

	watch: {
		group () {
			this.drawer = false
		},
	},
}
</script>