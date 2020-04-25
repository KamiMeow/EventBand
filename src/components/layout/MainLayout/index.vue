<template>
  <v-content>
    <the-toolbar />

    <v-container fluid class="px-0 mt-4">
      <v-layout fill-height justify-center>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-layout>
    </v-container>

    <the-footer />
  </v-content>
</template>

<script>
import TheToolbar from './TheToolbar';
import TheFooter from './TheFooter';

export default {
  name: 'MainLayout',

  components: {
    TheToolbar,
    TheFooter,
  },
};
</script>