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
      return this.$store.getters['auth/getIsLoggedAsOrganization'];
    },
	},
};
</script>

<style>

.v-stepper,
.custom-elevation,
.v-stepper__header,
.v-btn-toggle--selected,
.custom-elevation,
.v-data-table {
  border-radius: 6px !important;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1) !important;
}

.v-card__text, .v-card__title {
  word-break: normal !important;
}

.title--font {
  font-family: 'Baloo Bhaina 2'
}

.cursor--pointer {
  cursor: pointer;
}

.no-select {
  user-select: none;
}

/* .v-expansion-panel,
.v-expansion-panels,
.v-expansion-panel-header,
.v-expansion-panel-content,
.v-expansion-panel::before,
.v-expansion-panels--flat>.v-expansion-panel, */
</style>
