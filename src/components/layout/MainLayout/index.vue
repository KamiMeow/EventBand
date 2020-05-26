<template>
  <v-content class="pb-0">
    <the-toolbar />
    
    <v-container fill-height fluid class="pa-0">
      <v-layout justify-center class=" pb-10">
        <v-slide-y-transition mode="out-in">
					<router-view/>
        </v-slide-y-transition>
      </v-layout>
    </v-container>

    <the-footer/>
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