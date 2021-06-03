<template>
  <div class="q-pa-md q-gutter-lg">
    <div id="match" class="row q-gutter-xs text-center">
        <q-card dark bordered class="col text-black bg-white my-card">
            <q-card-section>
                <div class="text-h3">Match #</div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section>
                <div class="text-h1">{{ this.current_data.match_number }}</div>
            </q-card-section>
        </q-card>
    </div>
    <div id="oddss" class="row q-gutter-xs text-center">
        <q-card dark bordered class="col bg-red-7 my-card">
            <q-card-section>
                <div class="text-h1">MERON</div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section>
                <div class="text-h3">{{ this.current_data.meron_odd }}</div>
            </q-card-section>
        </q-card>

        <q-card dark bordered class="col bg-blue-7 my-card">
            <q-card-section>
                <div class="text-h1">WALA</div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section>
                <div class="text-h3">{{ this.current_data.wala_odd }}</div>
            </q-card-section>
        </q-card>
    </div>

    <div id="list" class="row q-gutter-xs ">
        <q-list class="col" bordered separator>
          <q-item clickable v-ripple>
            <q-item-section>Meron</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>Item with caption</q-item-label>
              <q-item-label caption>Caption</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label overline>OVERLINE</q-item-label>
              <q-item-label>Item with caption</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
    </div>
    <q-btn color="primary" @click="winnerPop = true" label="Primary" />
    <div id="oddss" class="row q-gutter-xs text-center">
        <q-dialog v-model="winnerPop" persistent>
            <q-card>
                <q-card-section class="q-pa-lg bg-red text-white row text-center q-gutter-md">
                  <div class="text-h1">MERON</div>
                  <div class="text-h1">WINS</div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
    <!-- <div id="history">
        <q-table
            class="my-sticky-column-table"
            title="History"
            :data="data"
            :columns="columns"
            row-key="name"
        />
    </div> -->
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
      ],

      matchData: []
    }
  },
  methods: {
    getMatchData () {
      this.matchTable.loading = true
      axiosCont.get('matches/getdata', {

      }).then(response => {
        console.log('this respo')
        console.log(response.data)
        this.matchData = response.data
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
    this.getCurrentMatch()
    // this.matchTable.loading = false
  }
}
</script>
