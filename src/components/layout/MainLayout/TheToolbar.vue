<template>
  <v-app-bar 
    color="primary" 
		class="vh-toolbar"
    dark
    app
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
</template>

<script>
const toolbarItems = [
  { title: 'MainPage',    link: '/',            needLogin: 'all'  },
  { title: 'Profile',     link: '/profile',     needLogin: true   },
  { title: 'SignIn',      link: '/sign-in',     needLogin: false  },
  { title: 'SignUp',      link: '/sign-up',     needLogin: false  },
  { title: 'Event feed',  link: '/events/feed', needLogin: true   },
  { title: 'Event list',  link: '/events/list', needLogin: false  },
  { title: 'Event page',  link: '/events/e9c976b2-a77c-442a-8ffd-ff2a3ff4ee6a',    needLogin: 'all'   },
];

export default {
  name: "TheToolbar",
  
  data: () => ({
    toolbarItems,
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
