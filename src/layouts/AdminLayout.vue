<template>
  <div class="bg-white q-pa-md">
  <q-layout view="hHh Lpr lff">
      <q-header elevated style="background: #24292e;">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title class="text-amber-6 text-subtitle">
            <q-avatar> <img src="~assets/roaster-logo.png"> </q-avatar>
            Sabongan</q-toolbar-title>
            <div id="user-actions" class = "q-gutter-xs">
            <q-btn round outline color="amber" size="sm" icon="logout" @click="logout"/>
        </div>
        </q-toolbar>
      </q-header>

      <q-drawer
        style="font-size: 15pt"
        v-model="drawer"
        show-if-above
        :width="280"
        :breakpoint="500"
        bordered
        content-class="bg-blue-grey-1 text-grey-9"
      >
        <q-scroll-area class="fit">
          <q-list>
            <template v-for="(menuItem, index) in menuList">
              <q-item :key="index" clickable :to="menuItem.route" active-class="bg-primary  text-white" :active="menuItem.label === 'History'" v-ripple @click="minify(menuItem.route)">
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
const menuList = [
  {
    icon: 'home',
    label: 'Home',
    separator: false,
    route: '/admin/home'
  },
  {
    icon: 'grid_view',
    label: 'Control Panel',
    separator: false,
    route: '/admin/control-panel'
  },
  {
    icon: 'tv',
    label: 'Big Screen',
    separator: false,
    route: '/admin/big-screen'
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false,
    route: '/admin/settings'
  }
]

export default {
  data () {
    return {
      drawer: false,
      menuList
    }
  },
  methods: {
    minify (a) {
      if (a === '/admin') {
        this.miniState = true
      } else {
        this.miniState = false
      }
    },
    logout () {
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
  #user-actions {
  position: relative;
  }
  </style>
