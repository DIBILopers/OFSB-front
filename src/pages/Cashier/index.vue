<template>
  <div class="q-pa-md q-gutter-lg">
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
    <div id="oddss"  class="row q-gutter-xs text-center">
        <div class="col q-gutter-sm">
            <q-card dark bordered class="bg-red-7 q-pa-md my-card">
                <q-card-section>
                    <div class="text-h2" style="font-size:7vw;">MERON</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    <div class="text-h3"> {{ current_data === null ? 'NO MATCHES' : current_data.meron_odd }} </div>
                </q-card-section>
            </q-card>
            <q-btn size="xl" color="red" label="MERON" @click="chooseSide('MERON')" />
        </div>

        <div class="col q-gutter-sm">
            <q-card dark bordered class="bg-blue-7 q-pa-md my-card">
                <q-card-section>
                    <div class="text-h2" style="font-size:7vw;" >WALA</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    <div class="text-h3"> {{ current_data === null ? 'NO MATCHES' : current_data.wala_odd }} </div>
                </q-card-section>
            </q-card>
            <q-btn size="xl" color="blue" label="WALA" @click="chooseSide('WALA')" />
        </div>
    </div>
   <q-card>
       <q-card-section class="row q-gutter-md">
        <div class="col-5 q-gutter-sm">
          <!-- <q-input outlined v-model="nickname" label="Nickname" /> -->
          <q-input :disable="disabe_betting" outlined v-model="betamount" label="Bet" />
            <q-card-actions align="right">
             <q-btn :disable="disabe_betting" class="full-width" icon="monetization_on" @click="createBet" label="Bet" color="green" v-close-popup />
           </q-card-actions>
        </div>
        <div class="q-pa-md col bg-">
          <q-list bordered padding>
            <q-item >
              <q-item-label align="" v-model="sultada" class="text-h5">Sultada # {{ current_data === null ? 'NO MATCHES' : current_data.match_number }} </q-item-label>
            </q-item>
            <q-item >
              <q-item-label align="" v-model="sultada">May 20, 2021 / 1:03.00 PM</q-item-label>
            </q-item>
            <q-item >
                <q-item-label>Bet Side:  <b :class="bet_color">{{ betside }}</b></q-item-label>
            </q-item>
              <q-item >
              <q-item-label v-model="odds"> Odds: {{ odds }}</q-item-label>
            </q-item>
            <q-item >
                <q-item-label v-model="betamount">Bet Amount: <strong>{{ betamount }}</strong></q-item-label>
            </q-item>
              <q-item >
              <q-item-label>Bet Prize: <strong>{{ betprize }}</strong></q-item-label>
            </q-item>
            <q-item >
                <q-item-label>Total Payout: <strong>{{ totalpayout }}</strong></q-item-label>
            </q-item>
              <q-card-actions align="left">
                <q-btn label="Print" icon="print" color="green" v-close-popup />
                <q-btn label="Back" color="primary" v-close-popup />
              </q-card-actions>
          </q-list>
        </div>
          </q-card-section>
      </q-card>
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
      // console.log(this.betamount * oddPercentage)
    }
  },
  mounted () {
    this.getCurrentMatch()
  }
}
</script>
