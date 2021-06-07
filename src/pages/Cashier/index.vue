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
        <div class="col q-gutter-sm" style="padding-right: 1px">
            <q-card dark bordered class="bg-red-7 my-card">
                <q-card-section>
                    <div class="text-h2" style="padding-top: 10px">MERON</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    <div class="text-h3"> {{ current_data === null ? 'NO MATCHES' : current_data.meron_odd }} </div>
                </q-card-section>
            </q-card>
            <q-btn size="xl" style="width: 98.5%;" color="red" @click="chooseSide('MERON')" push label="MERON" />
        </div>

        <div class="col q-gutter-sm" style="padding-left: 1px;">
            <q-card dark bordered class="bg-blue-7 my-card">
                <q-card-section>
                    <div class="text-h2" style="padding-top: 10px">WALA</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    <div class="text-h3"> {{ current_data === null ? 'NO MATCHES' : current_data.wala_odd }} </div>
                </q-card-section>
            </q-card>
            <q-btn size="xl" style="width: 98.5%" color="blue" push label="WALA"  @click="chooseSide('WALA')"/>
        </div>
    </div>

   <q-card style="margin-left: auto; margin-right: auto; margin-top: 70px; max-width: 999px; width: 100%">
       <q-card-section class="row q-gutter-md">
        <div class="col-5 q-gutter-md">
          <!-- <q-input outlined v-model="nickname" label="Nickname" /> -->
          <q-input :disable="disabe_betting" outlined v-model="betamount" label="Bet">
            <template v-slot:before>
              <q-icon name="person"/>
            </template>
          </q-input>
            <q-card-actions align="right">
             <q-btn :disable="disabe_betting" class="full-width" icon="monetization_on" @click="createBet" label="Bet" color="green" v-close-popup />
           </q-card-actions>
        </div>
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
              <q-item-label> Odds:</q-item-label>
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
      console.log(this.betamount + ',' + oddPercentage)
    }
  },
  computed: {
    total_payout () {
      return ((this.odds - 100) / 100) * parseInt(this.betamount) + parseInt(this.betamount)
    },
    bet_prize () {
      return ((this.odds - 100) / 100) * parseInt(this.betamount)
    }
  },
  computed: {
    computedBet () {
      return (parseInt(this.betamount) * (this.odds - 100) / 100) + parseInt(this.betamount)
    }
  },
  mounted () {
    this.getCurrentMatch()
  }
}
</script>
