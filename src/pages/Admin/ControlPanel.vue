<template>
  <div class=" q-gutter-md">
    <div id="match" class="row q-gutter-xs text-center">
        <q-card dark bordered class="col text-black bg-white my-card">
            <q-card-section>
                <div class="text-h3">Match #</div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section>
                <div class="text-h1 text-red">{{ current_data === null ? 'NO MATCHES' : current_data.match_number }}</div>
            </q-card-section>
        </q-card>
    </div>
    <div id="oddss" class="row text-center">
        <div class="col">
            <q-card dark bordered class="bg-red-7 my-card">
                <q-card-section>
                    <div class="text-h1">MERON</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    <div class="text-h3">{{ current_data === null ? 'NO MATCHES' : current_data.meron_odd }}</div>
                </q-card-section>
            </q-card>
            <!-- <q-btn class="q-mt-sm full-width" size="xl" :disable="!started" @click="displayWinner('meron')" color="red" label="MERON WINS" /> -->
        </div>

        <div class="col">
            <q-card dark bordered class="bg-blue-7 my-card">
                <q-card-section>
                    <div class="text-h1">WALA</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    <div class="text-h3">{{ current_data === null ? 'NO MATCHES' : current_data.wala_odd }}</div>
                </q-card-section>
            </q-card>
            <!-- <q-btn class="q-mt-sm full-width" size="xl" :disable="!started" @click="displayWinner('wala')" color="primary" label="WALA WINS" /> -->
        </div>
    </div>

    <div id="odds-button" class="row q-pa q-gutter-sm text-center">
        <div class="col ">
          <q-btn class="full-width" size="xl" :disable="!started || ended" @click="displayWinner('meron')" color="red" label="MERON WINS" />
        </div>
        <div class="col ">
          <q-btn class="full-width" size="xl" :disable="!started || ended" @click="displayWinner('draw')" color="green" label="Draw" />
        </div>
        <div class="col ">
          <q-btn class="full-width" size="xl" :disable="!started || ended" @click="displayWinner('wala')" color="primary" label="WALA WINS" />
        </div>
    </div>

    <div id="winnerPop" class="row justify-center q-gutter-xs">
      <q-dialog  v-model="winnerPop">
        <q-card style="width:500px;" :class="modal.bground">
            <q-card-section class="text-white row">
              <div class="text-h1 text-center">{{ winner }}</div>
            </q-card-section>
        </q-card>
      </q-dialog>
    </div>

    <div id="control" class="row q-gutter-xs text-center">
        <div bordered class="col q-gutter-sm bg-white ">
          <q-btn size="xl" :disable="started || ended" @click="oddedit = true" color="primary" label="Edit Odds" icon="edit" />
          <q-btn size="xl" :disable="started || ended" @click="startmatch" color="amber-6" :icon="started ? 'pause' : 'play_arrow'" :label="started? 'Match Started' : 'Start Match'" />
            <!-- <q-btn size="xl" :disable="!started" @click="endmatch" color="red" label="End Match" /> -->
        </div>
    </div>

    <div id="oddss" class="row q-gutter-xs text-center">
        <q-dialog v-model="oddedit" persistent class="col-8">
          <q-card dark class="q-pa-sm" style="min-width: 550px; width: 400px; background: rgba(0,0,0, 0.80)">
            <q-card-section>
              <div class="text-h6 text-white">EDIT ODDS</div>
            </q-card-section>
            <q-card-section class="q-gutter-md">
              <q-input dark class="text-h5" type="number" outlined color="red" v-model="meron" label="Meron" />
              <q-input dark class="text-h5" outlined type="number" v-model="wala" label="Wala" />
            </q-card-section>

            <q-card-actions align="right">
            <q-btn size="lg" label="Save" flat color="green" @click="editOdd" v-close-popup />
            <q-btn size="lg" label="Cancel" flat color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
    </div>

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
      reloadPage: false,
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
        bground: ''
      },
      current_data: [],
      winnerPop: false,
      started: false,
      ended: false,
      oddedit: false,
      meron: 100,
      wala: 100,
      winner: '',
      web_connection: null
    }
  },
  methods: {
    getMatchData () {
      this.matchTable.loading = true
      axiosCont.get('matches/getdata', {

      }).then(response => {
        console.log('this respo')
        console.log((response.data).reverse())
        this.matchTable.data = response.data
        this.matchTable.loading = false
      })
    },
    getCurrentMatch () {
      this.matchTable.loading = true
      axiosCont.get('matches/current', {

      }).then(response => {
        console.log('this respo')
        console.log(response.data)
        this.current_data = response.data
        this.meron = this.current_data === null ? 0 : this.current_data.meron_odd
        this.wala = this.current_data === null ? 0 : this.current_data.wala_odd
        this.ended = this.current_data === null
        this.matchTable.loading = false
        // window.location.reload()
      })
    },
    nextMatch (winText) {
      axiosCont.put('matches/next/' + this.current_data.id, {
        winner: winText,
        current_match_number: this.current_data.match_number
      }).then(response => {
        console.log('next')
        console.log(response.data)
        if (response.data !== 'NO MORE MATCHES') {
          this.getCurrentMatch()
        }
        // window.location.reload()
      })
    },
    editOdd () {
      this.oddedit = false
      axiosCont.put('matches/edit-odd/' + this.current_data.id, {
        meron_odd: this.meron,
        wala_odd: this.wala,
        match_number: this.current_data.match_number
      }).then(response => {
        console.log('save')
        console.log(response.data)
        this.current_data = response.data
        this.$store.commit('reload/changeState', true)
        this.$q.localStorage.set('meron', this.meron)
        this.$q.localStorage.set('wala', this.wala)
        this.$store.commit('reload/changeOdds', { meron: this.meron, wala: this.wala })
        console.log('state: ' + this.$store.state.reload.changed)
        this.getCurrentMatch()
      })
    },
    displayWinner (text) {
      console.log(text)
      if (text === 'meron') {
        this.winner = 'MERON WINS'
        this.modal.bground = 'bg-red'
      } else if (text === 'wala') {
        this.winner = 'WALA WINS'
        this.modal.bground = 'bg-blue'
      } else {
        this.winner = 'DRAW MATCH'
        this.modal.bground = 'bg-green'
      }
      this.winnerPop = true
      this.nextMatch(this.winner.split(' ')[0])
      this.started = false
    },
    startmatch () {
      this.started = true
      axiosCont.put('matches/start-match/' + this.current_data.id, {
      })
    }
  },
  mounted () {
    this.getCurrentMatch()
    this.getMatchData()
  }
}
</script>
