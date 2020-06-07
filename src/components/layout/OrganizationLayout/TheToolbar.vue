<template>
  <v-app-bar 
    color="primary" 
    clipped-left 
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
						v-if="item.needLogin === 'all' || item.needLogin === isLogged "
						:key="item.link"
						:to="item.link"
						class="toolbar--items title text-none"
						color="secondary"
						text
					>
						{{ item.title }}
					</v-btn>
				</template>
				
				<new-organization-dialog/>
				<v-btn
					class="toolbar--items title text-none"
					color="secondary"
					text
					@click="logoutAsOrganization"
				>
					To user profile
				</v-btn>
			</v-toolbar-items>
  </v-app-bar>
</template>

<script>
import NewOrganizationDialog from './NewOrganizerDialog';
/**
 * Компонент верхнего меню
 */
const toolbarItems = [
  { title: 'Organization',    link: '/my-organization/info', needLogin: true  },
  { title: 'Create event',    link: '/my-organization/event/create', needLogin: true  },
  { title: 'Create news',    link: '/my-organization/news/create', needLogin: true  },
  { title: 'Edit info',    link: '/my-organization/edit', needLogin: true  },
];


export default {
	name: "TheToolbar",

	components: {
		NewOrganizationDialog,
	},
	
	data: () => ({
		toolbarItems,
		drawer: false,
	}),
	
	computed: {
    isLogged() {
      return this.$store.getters['auth/getIsLoggedAsOrganization'];
    },
	},
	
	methods: {
		logoutAsOrganization() {			
			this.$store.dispatch('auth/logoutAsOrganization');
			this.$router.replace('/profile');
		},
	},
};
</script>
