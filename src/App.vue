<template>
  <v-app>
    <notification />
    
    <organization-layout v-if="isOrganizationLayout" />
    <main-layout v-else />
  </v-app>
</template>

<script>
import OrganizationLayout from '@/components/layout/OrganizationLayout';
import Notification from '@/components/layout/Notification';
import MainLayout from '@/components/layout/MainLayout';

export default {
  name: 'App',

  components: {
    OrganizationLayout,
    Notification,
    MainLayout,
  },

  computed: {
    isOrganizationLayout() {
      return false;
    },
  },
};
</script>

<style>
.title--font {
  font-family: 'Baloo Bhaina 2'
}

.cursor--pointer {
  cursor: pointer;
}

.no-select {
  user-select: none;
}
</style>
