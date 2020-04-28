<template>
  <v-app-bar 
    color="primary" 
    height="80"
    dark
    app
  >
    <div>
      <v-img src="/logo.png" contain />
    </div>
    <v-spacer />

    <v-toolbar-items>
      <v-btn
        v-for="item in toolbarItems"
        :key="item.link"
        :to="item.link"
        class="toolbar--items title text-none"
        color="secondary"
        text
      >
        {{ item.title }}
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
const toolbarItems = [
  { title: 'MainPage',  link: '/'},
  { title: 'Profile', link: '/profile'  },
  { title: 'SignIn', link: '/sign-in'  },
  { title: 'SignUp', link: '/sign-up'  },
  { title: 'Event feed', link: '/events/feed'  },
  { title: 'Event list', link: '/events/list'  },
  { title: 'Event page', link: '/events/5'  },
];

export default {
  name: "TheToolbar",
  
  data: () => ({
    toolbarItems,
  }),
};
</script>

<style lang="scss" scoped>
</style>
