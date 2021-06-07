<template>
    <div class="q-pa-lg text-white">
        <div class="row">
            <div class="col-6 text-center">
              <q-card dark bordered class="col text-black bg-white my-card">
                <q-card-section>
                    <div class="text-h4">Match #</div>
                </q-card-section>
                <q-separator inset />
                <q-card-section class="q-pa-md text-h3">
                    {{ current_data === null ? 'NO MATCHES' : current_data.match_number }}
                </q-card-section>
              </q-card>

               <q-card class="q-mt-md" style="background: radial-gradient(circle, rgb(255, 163, 163) 0%, rgb(184, 0, 6) 100%)">
                  <q-card-section>
                    <div class="text-h4">MERON</div>
                  </q-card-section>
                  <q-separator dark inset />
                  <q-card-section class="q-pa-md text-h3">
                   120
                  </q-card-section>
                </q-card>

               <q-card class="q-mt-md" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
                  <q-card-section>
                    <div class="text-h4">WALA</div>
                  </q-card-section>
                  <q-separator dark inset />
                  <q-card-section class="q-pa-md text-h3">
                   100
                  </q-card-section>
                </q-card>
            </div>
            <div class="col-6">
            </div>

    <div class="row q-gutter-sm">
      <q-card class="col">
        <q-card-section class="row text-right q-gutter-md">
          <div class="col text-h1">
            100000
          </div>
        </q-card-section>
        <q-separator dark color="grey-7" inset />
        <q-card-section class="row q-gutter-md">
          <q-btn class="col" outline color="black" label="100" />
          <q-btn class="col" outline color="black" label="500" />
          <q-btn class="col" outline color="black" label="1000" />
        </q-card-section>
        <q-card-section class="row q-gutter-md">
          <q-btn class="col" outline color="black" label="2000" />
          <q-btn class="col" outline color="black" label="3000" />
          <q-btn class="col" outline color="black" label="4000" />
        </q-card-section>
        <q-card-section class="row q-gutter-md">
          <q-btn class="col" outline color="black" label="5000" />
        </q-card-section>
      </q-card>
      <q-card class="col">
       <q-card-section class="row q-gutter-md">
        <div class="q-pa-md col">
          <q-list bordered separator>
              <template>
                <div class="card">
                  <div class="card-title bg-primary text-white">
                    <q-item class="column">
                      <q-item-label align="left" v-model="sultada" class="text-h6" style="margin-top: 10px">Sultada # 24</q-item-label>
                      <q-item-label align="left" v-model="sultada" class="text-subtitle2" style="margin-bottom: 10px"> May 20, 2021  1:03.00 PM </q-item-label>
                    </q-item>
                  </div>
                </div>
              </template>
            <q-item style="padding-top: 20px; margin-left: 6px">
                <q-item-label>Bet Side <b :class="bet_color">{{ betside }}</b></q-item-label>
            </q-item>
            <q-item style="padding-top: 20px; margin-left: 6px">
              <q-item-label> Odds: {{ odds }}</q-item-label>
            </q-item>
            <q-item style="padding-top: 20px; margin-left: 6px">
                <q-item-label v-model="betamount">Bet Amount: <strong>{{ betamount }}</strong></q-item-label>
            </q-item>
              <q-item style="padding-top: 20px; margin-left: 6px">
              <q-item-label>Bet Prize: {{ bet_prize }}</q-item-label>
            </q-item>
            <q-item >
                <q-item-label>Total Payout: <strong>{{ computedBet }}</strong></q-item-label>
            </q-item>
              <q-card-actions align="left" style="padding-bottom: 25px; padding-top: 25px; margin-left: 10px">
                <q-btn-group push>
                  <q-btn color="green" glossy text-color="white" push label="Print" icon="print" style="padding-right: 5px"></q-btn>
                  <q-btn color="primary" glossy text-color="white" push label="Back" style="padding-right: 10px; padding-left: 10px"></q-btn>
                </q-btn-group>
              </q-card-actions>
          </q-list>
        </div>
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
      betside: '',
      bet_color: '',
      loading: true,
      winnerPop: false,
      started: false,
      oddedit: false,
      bet: 0,
      sultada: '#23',
      nickname: 'bords',
      betamount: 0,
      disabe_betting: true,
      betprize: 0,
      odds: 0,
      totalpayout: 0,
      winner: '',
      meron: 0,
      wala: 0,
      ended: 0,
      current_data: []
    }
  },
  methods: {
    getCurrentMatch () {
      this.loading = true
      axiosCont.get('matches/current', {

      }).then(response => {
        console.log('this respo')
        console.log(response.data)
        this.current_data = response.data
        this.meron = this.current_data === null ? 0 : this.current_data.meron_odd
        this.wala = this.current_data === null ? 0 : this.current_data.wala_odd
        this.ended = this.current_data === null
        this.loading = false
        // window.location.reload()
      })
    },
    chooseSide (text) {
      this.betside = text
      this.bet_color = text === 'MERON' ? 'text-h6 text-red' : 'text-h6 text-blue'
      this.odds = text === 'MERON' ? this.current_data.meron_odd : this.current_data.wala_odd
      this.disabe_betting = false
    },
    createBet () {
      const oddPercentage = (this.odds - 100) / 100
      this.betprize = parseInt(this.betamount) * oddPercentage
      this.totalpayout = parseInt(this.betprize) + parseInt(this.betamount)
      this.disabe_betting = true
      console.log(this.betamount + ',' + oddPercentage)
    }
  },
  computed: {
    computedBet () {
      return ((this.odds - 100) / 100) * parseInt(this.betamount) + parseInt(this.betamount)
    },
    bet_prize () {
      return ((this.odds - 100) / 100) * parseInt(this.betamount)
    }
  },
  mounted () {
    this.getCurrentMatch()
  }
}
</script>
