<template>
  <div class="q-pa-md row q-gutter-lg">
    <div class="container col">
      <div id="match" class="row q-gutter-xs text-center">
        <q-card dark bordered class="col text-black bg-white my-card">
            <q-card-section>
                <div class="text-h3">Match # {{ pastSize }}</div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section>
                <div class="text-h1 text-red">{{ current_data === null ? 'NO MATCHES' : current_data.match_number }}</div>
            </q-card-section>
        </q-card>
      </div>
      <div id="oddss" class="row q-gutter-xs q-mt-md text-center">
          <q-card dark bordered class="col bg-red-7 my-card">
              <q-card-section>
                  <div class="text-h1">MERON</div>
              </q-card-section>

              <q-separator dark inset />

              <q-card-section>
                  <div class="text-h3">{{ current_data === null ? 0 : current_data.meron_odd }}</div>
              </q-card-section>
          </q-card>

          <q-card dark bordered class="col bg-blue-7 my-card">
              <q-card-section>
                  <div class="text-h1">WALA</div>
              </q-card-section>

              <q-separator dark inset />

              <q-card-section>
                  <div class="text-h3">{{ current_data === null ? 0 : current_data.wala_odd }}</div>
              </q-card-section>
          </q-card>
      </div>
      <div id="winnerPop" class="row justify-center q-gutter-xs">
        <q-dialog  v-model="winnerPop">
          <q-card style="width:500px;" :class="modal.bground">
              <q-card-section class="text-white text-center">
                <div class="text-h1">{{ winner }}</div>
                <div class="text-h1">{{ winnerConcat }}</div>
              </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
    <div class="container col-3">
      <div id="list" class="row ">
        <!-- <div class="col"></div> -->
        <div class="col q-gutter-sm">
          <div bordered separator v-for="match in recent_data" :key="match.match_number">
            <q-card v-if="match.winner == 'MERON'" class="bg-red text-white my-card q-pa-md text-left" >
              <q-card-section class="text-h3">#{{ match.match_number }} {{ match.winner }} WINS</q-card-section>
            </q-card>
            <q-card v-else-if="match.winner == 'WALA'" class="bg-blue text-white my-card q-pa-md text-left" >
              <q-card-section class="text-h3">#{{ match.match_number }} {{ match.winner }} WINS</q-card-section>
            </q-card>
            <q-card v-else-if="match.winner == 'DRAW'" class="bg-green text-white my-card q-pa-md text-left" >
              <q-card-section class="text-h3">#{{ match.match_number }} {{ match.winner }} MATCH</q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { axiosCont } from 'boot/axios'

export default {
  data () {
    return {
      winnerPop: false,
      winner: '',
      winnerConcat: '',
      isPwd: true,
      matchTable: {
        loading: false,
        filter: null,
        tableLoading: false
      },
      modal: {
        bground: '',
        confirmGenerate: false,
        generate: false
      },
      numberOfmatches: 0,
      password: '',
      save: false,
      current_data: [],
      recent_data: [],
      pastSize: 0,
      matchData: []
    }
  },
  methods: {
    getCurrentMatch () {
      this.matchTable.loading = true
      axiosCont.get('matches/current', {

      }).then(response => {
        this.current_data = response.data
        this.matchTable.loading = false
      })
    },
    getRecentMatch () {
      this.matchTable.loading = true
      axiosCont.get('matches/recent', {

      }).then(response => {
        this.recent_data = response.data
        // console.log('lul')
        // console.log(this.recent_data)
        // console.log(this.recent_data[0].is_displayed)
        if (this.recent_data[0].is_displayed) {
          this.displayWinner(this.recent_data[0].winner)
          setTimeout(() => {
            axiosCont.put('matches/is-displayed/' + this.recent_data[0].id, {
            }).then(response => {
              this.winnerPop = false
            })
          }, 5000)
        }
        this.matchTable.loading = false
      })
    },
    displayWinner (text) {
      if (text === 'MERON') {
        this.winner = 'MERON'
        this.winnerConcat = 'WINS'
        this.modal.bground = 'bg-red'
      } else if (text === 'WALA') {
        this.winner = 'WALA'
        this.winnerConcat = 'WINS'
        this.modal.bground = 'bg-blue'
      } else {
        this.winner = 'DRAW'
        this.winnerConcat = 'MATCH'
        this.modal.bground = 'bg-green'
      }
      this.winnerPop = true
      // this.started = false
    },
    startmatch () {
      this.started = true
    },
    editOdd () {
      this.oddedit = false
    }
  },
  mounted () {
    this.getCurrentMatch()
    this.getRecentMatch()
    setInterval(() => {
      this.getCurrentMatch()
      if (this.current_data !== null) {
        this.getRecentMatch()
      }
    }, 1000)
    // this.matchTable.loading = false
  }
}
</script>
