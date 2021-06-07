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
