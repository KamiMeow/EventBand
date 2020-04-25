<template>
  <v-app-bar color="primary" clipped-left dark app>
    <div>
      <v-img src="/logo.png" contain />
    </div>
    <v-spacer />

    <v-toolbar-items>
      <v-btn
        v-for="item in toolbarItems"
        :key="item.link"
        :to="item.link"
        class="toolbar--items headline text-none"
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
  { title: 'Da',  link: '/'     },
  { title: 'Net', link: '/net'  },
  { title: 'Profile', link: '/profile'  },
  { title: 'SignIn', link: '/signIn'  },
  { title: 'SignUp', link: '/signUp'  },
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
