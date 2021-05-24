<template>
  <div class="q-pa-md q-gutter-lg">

    <!-- <q-btn color="primary" label="Primary" @click="getUserData" /> -->
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
      meron: 100,
      wala: 10,
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
