<template>
  <div class="q-pa-md q-gutter-md">
    <!-- <q-btn color="primary" label="Primary" @click="getUserData" /> -->
    <q-btn class="row align-center bg-green glossy text-white" @click="modal.generate = true" text-color="white" label="Generate Matches" icon="add" align="right" />
    <q-dialog v-model="modal.generate" persistent>
      <q-card dark class="q-pa-sm" style="min-width: 350px; width: 400px; background: rgba(0,0,0, 0.60)">
        <q-card-section>
          <div class="text-h6 text-white">Enter number of matches</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dark outlined dense v-model="numberOfmatches" type="number" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat color="green" label="Generate" @click="modal.confirmGenerate = true, modal.generate = false" />
          <q-btn flat color="red" label="Cancel" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modal.confirmGenerate" persistent>
      <q-card dark class="q-pa-sm" style="min-width: 350px; width: 400px; background: rgba(0,0,0, 0.60)" >
        <q-card-section>
          <div class="text-h6"><q-icon name="warning" class="text-red" style="font-size: 3rem;" />Enter password to confirm</div>
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
          <q-btn @click="generate" color="green" flat label="Confirm" v-close-popup />
          <q-btn color="red" flat label="Cancel" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="text-h5">Matches</div>
    <div id="history">
      <q-table
          title="Matches"
          :data="matchTable.data"
          :columns="matchTable.columns"
          :filter="matchTable.filter"
          :loading="matchTable.loading"
          row-key="name"
      >
          <template v-slot:top>
              <q-btn unelevated outline class="bg-green glossy text-white" @click="oddEdit = true" label="Add Match" icon="add" />
              <q-space />
              <q-input borderless dense debounce="300" filled color="grey-7" placeholder="Search" v-model="matchTable.filter">
                  <template v-slot:append>
                      <q-icon name="search" />
                  </template>
              </q-input>
          </template>
          <template v-slot:body="props">
              <q-tr :props="props">
                  <q-td key="match_number" :props="props">{{ props.row.match_number }}</q-td>
                  <q-td key="meron_odd" :props="props">{{ props.row.meron_odd }}</q-td>
                  <q-td key="wala_odd" :props="props">{{ props.row.wala_odd }}</q-td>
                  <q-td key="meron_total" :props="props">{{ props.row.meron_total }}</q-td>
                  <q-td key="wala_total" :props="props">{{ props.row.wala_total }}</q-td>
                  <q-td key="winner" :props="props">{{ props.row.winner }}</q-td>
                  <q-td key="action" :props="props" class="q-gutter-xs">
                      <q-btn color="green-6" class="btn-action"  @click="oddEdit = true" :disable="matchTable.tableLoading" icon="edit" size="sm" dense flat>
                          <q-tooltip content-class="grey" :delay="550" anchor="top middle" self="center middle">Update</q-tooltip>
                      </q-btn>
                      <q-btn color="red-6" class="btn-action" :disable="matchTable. tableLoading" icon="delete" size="sm" dense flat>
                          <q-tooltip content-class="grey" :delay="550" anchor="top middle" self="center middle">Delete</q-tooltip>
                      </q-btn>
                  </q-td>
              </q-tr>
          </template>
      </q-table>
    </div>
  </div>
</template>
<script>
import { axiosCont } from 'boot/axios'

export default {
  data () {
    return {
      isPwd: true,
      matchTable: {
        loading: false,
        filter: null,
        tableLoading: false,
        data: [],
        columns: [
          {
            name: 'match_number',
            required: true,
            label: 'Match Number',
            align: 'center',
            field: 'match_number',
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'meron_odd',
            required: true,
            label: 'Meron Odd',
            align: 'center',
            field: 'meron_odd',
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'wala_odd',
            required: true,
            label: 'Wala Odd',
            align: 'center',
            field: 'wala_odd',
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'meron_total',
            required: true,
            label: 'Meron Bets',
            align: 'center',
            field: 'meron_total',
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'wala_total',
            required: true,
            label: 'Wala Bets',
            align: 'center',
            field: 'wala_total',
            format: val => `${val}`,
            sortable: true
          },
          {
            name: 'winner',
            required: true,
            label: 'Winner',
            align: 'center',
            field: 'winner',
            format: val => `${val}`,
            sortable: true
          }
        ]
      },
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
      winner: ''
    }
  },
  methods: {
    getMatchData () {
      this.matchTable.loading = true
      axiosCont.get('matches/getdata', {

      }).then(response => {
        console.log('this respo')
        console.log(response.data)
        this.matchTable.data = response.data
        this.matchTable.loading = false
      })
    },
    generate () {
      axiosCont.post('matches/generate', {
        number_of_matches: this.numberOfmatches,
        password: this.password
      }).then(response => {
        this.user_data = response.data
        this.getMatchData()
        this.matchTable.loading = false
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
    this.getMatchData()
    console.log(this.$store.state.reload.changed)
    // this.matchTable.loading = false
  }
}
</script>
