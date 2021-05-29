<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff">
      <q-header elevated class="bg-blue-9">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Talpakan na</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        style="font-size:15pt"
        v-model="drawer"
        show-if-above
        :width="300"
        :breakpoint="500"
        bordered
        content-class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list>

            <template v-for="(menuItem, index) in menuList">
              <q-item :key="index" clickable :to="menuItem.route" active-class="bg-blue text-white" :active="menuItem.label === 'History'" v-ripple @click="minify(menuItem.route)">
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
    separator: false
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
