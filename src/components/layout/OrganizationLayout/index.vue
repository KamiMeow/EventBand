<template>
  <v-content>
    <the-toolbar />

    <v-container fluid fill-height class="px-0 mt-4">
      <v-layout fill-height justify-center class="pb-8">
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
  name: 'OrganizationLayout',

  components: {
    TheToolbar,
    TheFooter,
  },
};
</script>