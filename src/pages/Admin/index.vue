<template>
  <div class="q-pa-md q-gutter-md">
    <!-- <q-btn color="primary" label="Primary" @click="getUserData" /> -->
    <q-btn class="row align-center" @click="modal.generate = true" color="green" text-color="white" label="Generate Matches" icon="add" align="right" />
    <q-dialog v-model="modal.generate" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Enter number of matches</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input outlined dense v-model="numberOfmatches" type="number" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn color="green" label="Generate" @click="modal.confirmGenerate = true, modal.generate = false" />
          <q-btn color="red" label="Cancel" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modal.confirmGenerate" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6"><q-icon name="warning" class="text-red" style="font-size: 3rem;" />Enter password to confirm</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="password" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn @click="generate" color="green" flat label="Confirm" v-close-popup />
          <q-btn color="red" flat label="Cancel" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
        bground: '',
        confirmGenerate: false,
        generate: false
      },
      numberOfmatches: 0,
      password: '',
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
      axiosCont.get('user/data', {

      }).then(response => {
        console.log('this respo')
        console.log(response.data)
        this.user_data = response.data
      })
    },
    generate () {
      axiosCont.post('matches/generate', {
        matches: this.numberOfmatches,
        password: this.password
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
