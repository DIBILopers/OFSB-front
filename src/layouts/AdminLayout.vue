<template>
  <div class="bg-white">
    <q-layout view="hHh Lpr lFf">
      <q-header elevated style="background: #24292e;">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title class="text-amber-6 text-subtitle">
            <q-avatar> <img src="~assets/roaster-logo.png"> </q-avatar>
            Sabongan</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        style="font-size: 15pt;"
        v-model="drawer"
        show-if-above
        :width="280"
        :breakpoint="500"
        bordered
        content-class="bg-grey-10 text-white"
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

      <q-footer class="row" style="background: rgba(250, 250, 250, 0.2)">
        <div class="text-right q-pa-lg col-12">
          <img height="20px" src="~assets/codeblood/small.png">
            &nbsp;
          <img height="20px" src="~assets/codeblood/small-text.png">
        </div>
        <div class="col"></div>
      </q-footer>
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
    route: '/big-screen'
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
    }
  }
}
</script>
