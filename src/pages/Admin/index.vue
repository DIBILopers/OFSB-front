<template>
  <div class="q-pa-md q-gutter-md">
    <!-- <q-btn color="primary" label="Primary" @click="getUserData" /> -->
       <q-btn class="row align-center" :disable="started" @click="oddedit = true" color="white" text-color="black" label="Register" icon="edit" align="right" />
      <div id="oddss" class="row q-gutter-xs text-center col">
        <q-dialog v-model="oddedit" persistent class="col">
            <q-card>
                <q-card-section class="col-4 items-right q-gutter-md">
                <q-input class="" type="text" outlined color="black" v-model="fullname" label="Full Name" />
                <q-input class="" type="text" outlined color="black" v-model="address" label="Address" />
                <q-input class="" type="text" outlined color="black" v-model="contactnumber" label="Contact Number" />
                <q-radio v-model="role" val="cashier" label="Cashier" color="red" />
                <q-radio v-model="role" val="admin" label="Admin" color="blue" />
                </q-card-section>

                <q-card-actions align="right">
                <q-btn :disable="savestart" @click="save = true" label="Save" color="green" v-close-popup />
                <q-btn label="Cancel" color="primary" v-close-popup />
        <q-dialog v-model="save" persistent class="col-4">
            <q-card>
                <q-card-section class="col q-gutter-md">
                 <q-label >Successfully Saved!</q-label>
                <!-- <q-label v-model="fullname">{{fullname}}</q-label>
                <q-label v-model="address">{{address}}</q-label>
                <q-label v-model="contactnumber">{{contactnumber}}</q-label> -->
                <q-btn class="col" size="sm" align="center" label="Okay" color="primary" v-close-popup />
                </q-card-section>
            </q-card>
        </q-dialog>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
    <div id="history">
        <q-table
            class="my-sticky-column-table"
            title="History"
            :data="user_data"
            :columns="columns"
            row-key="name"
        />
    </div>
  </div>
</template>
<script>
import { axiosCont } from 'boot/axios'
export default {
  data () {
    return {
      modal: {
        bground: ''
      },
      winnerPop: false,
      started: false,
      oddedit: false,
      savestart: false,
      save: false,
      fullname: '',
      address: '',
      role: '',
      winner: '',
      columns: [
        {
          name: 'Id',
          required: true,
          label: 'Match Number',
          align: 'center',
          field: 'Id',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'Match Number',
          align: 'center',
          field: 'name',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'role',
          required: true,
          label: 'Match Number',
          align: 'center',
          field: 'role',
          format: val => `${val}`,
          sortable: true
        }
      ],

      user_data: []
    }
  },
  methods: {
    getUserData () {
      axiosCont.get('http://localhost:8000/user/data', {

      }).then(response => {
        console.log('this respo')
        console.log(response.data)
        this.user_data = response.data
      })
    },
    displayWinner (text) {
      console.log(text)
      if (text === 'meron') {
        this.winner = 'MERON'
        this.modal.bground = 'bg-red'
      } else {
        this.winner = 'WALA'
        this.modal.bground = 'bg-blue'
      }
      this.winnerPop = true
      this.started = false
    },
    startmatch () {
      this.started = true
    },
    editOdd () {
      this.oddedit = false
    }
  },
  mounted () {
    this.getUserData()
  }
}
</script>
