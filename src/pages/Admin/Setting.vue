<template>
  <div class="q-pa-md q-gutter-md">
     <!-- start dialog -->
        <div id="oddss" class="row q-gutter-xs text-center col">
            <q-dialog v-model="oddEdit"  persistent>
                <q-card dark class="q-pa-sm" style="width: 400px; background: rgba(0,0,0, 0.78)">
                    <q-card-section class="col-4 items-right q-gutter-md">
                    <div class="text-h6 text-amber-7">ADD USERS</div>
                    <q-input dark filled color="grey-7" v-model="fullName" label="Full Name" />
                    <q-input dark v-model="password" color="grey-7" label="Password" filled :type="isPwd ? 'password' : 'text'">
                        <template v-slot:append>
                        <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                        />
                        </template>
                    </q-input>
                     <q-select dark color="grey-7" filled v-model="roles" :options-dark="false" :options="options" label="Roles" emit-value map-options />
                    </q-card-section>
                    <q-card-actions align="right">
                        <q-btn flat :disable="savestart" @click="onStore" label="Save" color="green" v-close-popup />
                        <q-btn flat @click="clear()" label="Cancel" color="grey" v-close-popup />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    <!-- end dialog -->
    <!-- start table -->
    <div class="text-h2 text-center ">Tournament Settings</div>
    <div class="row q-gutter-md">
      <div class="col">
          <q-btn class="full-width" size="xl" color="red" @click="modal.confirmReset = true" label="RESET" />
      </div>
      <div class="col ">
        <q-btn class="full-width" size="xl" color="green" label="NEW TOURNAMENT" />
      </div>
    </div>
    <div class="row">
      <div class="col text-h2 text-center q-mt-md">STATISTICS</div>
    </div>
    <div class="row">
      <div class="col" id="history">
        <q-table
            title="Users"
            :data="userData"
            :columns="columns"
            :filter="filter"
            :loading="loading"
            row-key="name"
        >
        <template v-slot:top>
            <q-btn unelevated outline class="bg-green glossy text-white" :disable="started" @click="oddEdit = true" label="Register" icon="add" />
            <q-space />
            <q-input borderless dense debounce="300" filled color="grey-7" placeholder="Search" v-model="filter">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </template>
        <template v-slot:body="props">
            <q-tr :props="props">
                <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                <q-td key="roles" :props="props">{{ props.row.roles }}</q-td>
                <q-td key="action" :props="props" class="q-gutter-xs">
                    <q-btn color="green-6" class="btn-action"  @click="oddEdit = true" :disable="tableLoading" icon="edit" size="sm" dense flat>
                        <q-tooltip content-class="grey" :delay="550" anchor="top middle" self="center middle">Update</q-tooltip>
                    </q-btn>
                    <q-btn color="red-6" class="btn-action" @click="onDelete(props.row)" :disable="tableLoading" icon="delete" size="sm" dense flat>
                        <q-tooltip content-class="grey" :delay="550" anchor="top middle" self="center middle">Delete</q-tooltip>
                    </q-btn>
                </q-td>
            </q-tr>
        </template>
        </q-table>
      </div>
    </div>
    <div class="row">
      <q-dialog v-model="modal.confirmReset" persistent>
        <q-card dark class="q-pa-sm" style="min-width: 350px; width: 400px; background: rgba(0,0,0, 0.60)" >
          <q-card-section>
            <div class="text-h6"><q-icon name="warning" class="text-red" style="font-size: 3rem;" />Enter password to confirm reset</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input dark dense color="" v-model="password" :type="isPwd ? 'password' : 'text'">
                  <template v-slot:prepend>
                    <q-icon name="vpn_key" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn @click="thanos" color="green" flat label="Confirm" v-close-popup />
            <q-btn color="red" flat label="Cancel" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <!-- end table  -->
  </div>
</template>

<script>
import { axiosCont } from 'boot/axios'
export default {
  data () {
    return {
      triggerUpdate: true,
      savestart: false,
      oddEdit: false,
      started: false,
      fullName: '',
      password: '',
      roles: null,
      isPwd: true,
      filter: null,
      loading: false,
      tableLoading: false,
      modal: {
        bground: '',
        confirmReset: false,
        generate: false
      },
      columns: [
        { name: 'id', required: true, label: '#', align: 'center', field: 'id', sortable: true },
        { name: 'name', required: true, label: 'Name', align: 'left', field: 'name', format: val => `${val}`, sortable: true },
        { name: 'roles', required: true, label: 'Role', align: 'left', field: 'role', format: val => `${val}`, sortable: true },
        { name: 'action', align: 'center', label: 'Action' }
      ],
      userData: [
        {
          id: 1,
          name: 'john doe',
          roles: 1
        }
      ],
      options: [
        {
          label: 'Admin',
          value: 1
        },
        {
          label: 'Cashier',
          value: 2
        }
      ]
    }
  },
  methods: {
    thanos () {
      this.started = true
      axiosCont.delete('matches/thanos', {
      })
    },
    onStore () {
      this.tableLoading = true
      console.log(this.fullName)
      console.log(this.password)
      console.log(this.roles)
      axiosCont.get('user/data', {

      }).then(response => {
        console.log(response.data)
        this.tableLoading = false
        this.userData = response.data
        this.clear()
      })
    },
    onDelete () {

    },
    clear () {
      this.fullName = null
      this.password = null
      this.roles = null
    }
  },
  watch: {
    oddEdit () {
    //   if (this.oddEdit === true) {
      if (this.triggerUpdate === true) {
        console.log('btch')
      } else {
        console.log('yawa')
      }
    //   }
    }
  }
}
</script>
