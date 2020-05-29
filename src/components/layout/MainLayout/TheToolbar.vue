<template>
	<v-layout>
		<v-app-bar 
			color="primary" 
			class="d-none d-md-inline-block d-lg-inline-block"
			dark
			app
			clipped-right
		>
			<div>
				<v-img src="/logo.png" contain />
			</div>
			<v-spacer />

			<v-toolbar-items>
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
			</v-toolbar-items>
		</v-app-bar>
		<!-- <div class="d-inline d-sm-inline d-md-none">
			<mobile-toolbar />
		</div> -->
	</v-layout>
</template>

<script>
const toolbarItems = [
  { title: 'MainPage',    link: '/',            needLogin: 'all'  },
  { title: 'Profile',     link: '/profile',     needLogin: true   },
  { title: 'SignIn',      link: '/sign-in',     needLogin: false  },
  { title: 'SignUp',      link: '/sign-up',     needLogin: false  },
  { title: 'Event feed',  link: '/events/feed', needLogin: true   },
  { title: 'Event list',  link: '/events/list', needLogin: 'all'  },
];

// import MobileToolbar from './MobileToolbar';

export default {
	name: "TheToolbar",
	
	components: {
		// MobileToolbar,
	},
  
  data: () => ({
		toolbarItems,
		drawer: false,
  }),

  computed: {
    isLogged() {
      return this.$store.getters['auth/getIsLogged'];
    },
  },

  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.replace({ name: 'sign-in' });
    },
  },
};
</script>

<style lang="scss" scoped>
	.vh--toolbar {
		height: 10vh;
	}
</style>
