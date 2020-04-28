import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary:    '#2E3E4F',
        secondary:  '#8F7FB4',
        accent:     '#842FAC',
        warning:    '#FE891F',
        error:      '#FF5252',
        info:       '#2196F3',
				success:    '#4CAF50',
      },
    },
  },
});
