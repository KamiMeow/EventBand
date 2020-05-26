<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="time"
    transition="scale-transition"
    min-width="300"
    ref="menu"
    offset-y
  >
    <template #activator="{ on }">
      <v-text-field
        v-model="time"
        append-icon="mdi-clock-outline"
        label="Pick time"
        readonly
        v-on="on"
      />
    </template>

    <v-time-picker
      v-if="menu"
      v-model="time"
      full-width
      format="24hr"
      :use-seconds="useSeconds"
			@click:minute="$refs.menu.save(time)"
    />
  </v-menu>
</template>

<script>
export default {
  name: 'TimeInput',

  props: {
		value: String,
		useSeconds: {
			type: Boolean,
			default: false,
		}
  },

  data: () => ({
    menu: false,
  }),

  computed: {
    time: {
      get() {
        return this.value;
      },
      set(time) {
        this.$emit('input', time);
      },
    },
  },
};
</script>
