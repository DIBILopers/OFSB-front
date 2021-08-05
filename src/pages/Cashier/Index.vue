<template>
    <div class="q-pa-lg text-white">
      <div class="row q-col-gutter-lg">
          <div class="col-4 text-center">
            <q-card dark bordered class="col text-black bg-white my-card">
              <q-card-section>
                  <div class="text-h4">Match # </div>
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
                  {{ current_data === null ? '0' : current_data.meron_odd }}
                </q-card-section>
              </q-card>

              <q-card class="q-mt-md" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
                <q-card-section>
                  <div class="text-h4">WALA</div>
                </q-card-section>
                <q-separator dark inset />
                <q-card-section class="q-pa-md text-h3">
                  {{ current_data === null ? '0' : current_data.wala_odd }}
                </q-card-section>
              </q-card>
          </div>
<!-- start of right section -->
        <div class="col-8">
          <div class="row q-mb-md q-col-gutter-md">
            <div class="col-6">
              <q-btn size="lg" class="full-width" style="background: radial-gradient(circle, rgb(255, 163, 163) 0%, rgb(184, 0, 6) 100%)" push label="MERON"  @click="chooseSide('MERON')" :disable="disable_betting"/>
            </div>
            <div class="col-6">
              <q-btn size="lg"  class="full-width" style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"  push label="WALA"   @click="chooseSide('WALA')" :disable="disable_betting"/>
            </div>
          </div>
          <div class="row q-gutter-sm">
            <q-card class="col">
              <q-card-section class="row text-right q-gutter-md">
                <div class="col text-black text-h4">
                  {{ numberFormat(betamount) }}
                </div>
              </q-card-section>
              <q-separator dark color="grey-7" inset />
              <q-card-section class="row q-gutter-md">
                <q-btn :disable="disable_betting" class="col text-h6" outline color="black" label="100" @click="amount('100')" />
                <q-btn :disable="disable_betting" class="col text-h6" outline color="black" label="500" @click="amount('500')" />
                <q-btn :disable="disable_betting" class="col text-h6" outline color="black" label="1,000" @click="amount('1000')" />
              </q-card-section>
              <q-card-section class="row q-gutter-md">
                <q-btn :disable="disable_betting" class="col text-h6" outline color="black" label="2,000" @click="amount('2000')" />
                <q-btn :disable="disable_betting" class="col text-h6" outline color="black" label="3,000" @click="amount('3000')" />
                <q-btn :disable="disable_betting" class="col text-h6" outline color="black" label="4,000" @click="amount('4000')" />
              </q-card-section>
              <q-card-section class="row q-gutter-md">
                <q-btn :disable="disable_betting" class="col text-h6" outline color="black" label="5,000" @click="amount('5000')"/>
              </q-card-section>
              <q-card-section class="row q-gutter-md">
                <q-input class="col" square outlined label="Other Amount" v-model="betamount">
                  <template v-slot:append>
                    <q-avatar>
                      <img src="~assets/roaster-logo.png">
                    </q-avatar>
                  </template>
                </q-input>
              </q-card-section>
              <q-card-section class="row q-mt-lg q-gutter-md">
                <q-btn :disable="disable_betting" color="green" glossy text-color="white" push label="Print" icon="print"  class="col" @keyup.enter="add_bet(betside)" @click="add_bet(betside)" />
                <q-btn :disable="disable_betting" color="orange-10" glossy text-color="white" push label="Clear" icon="backspace" class="col" @click="amount('Clear')" />
              </q-card-section>
            </q-card>
            <q-card class="col text-black">
              <q-card-section class="row q-gutter-md">
                <div class="col text-h6">
                  <q-list bordered separator>
                      <template>
                        <div class="card">
                          <div :class="bet_bg">
                            <q-item class="column">
                              <q-item-label align="center" v-model="sultada" class="text-h6" style="margin-top: 10px">Sultada # {{ current_data === null ? 'NO MATCHES' : current_data.match_number }}</q-item-label>
                              <q-item-label align="center" v-model="sultada" class="text-subtitle2" style="margin-bottom: 10px"> {{ current_date }} {{ current_time }} </q-item-label>
                            </q-item>
                          </div>
                        </div>
                      </template>
                    <q-item >
                      <q-item-section>Bet Side: </q-item-section>
                      <q-item-section side><span :class="bet_color">{{ betside }}</span></q-item-section>
                    </q-item>
                    <q-item >
                      <q-item-section>Odds: </q-item-section>
                      <q-item-section side>{{ odds }}</q-item-section>
                    </q-item>
                    <q-item >
                      <q-item-section>Bet Amount: </q-item-section>
                      <q-item-section side>{{ numberFormat(betamount) }}</q-item-section>
                    </q-item>
                    <q-item >
                      <q-item-section>Bet Prize: </q-item-section>
                      <q-item-section side>{{ numberFormat(bet_prize) }}</q-item-section>
                    </q-item>
                    <q-item >
                      <q-item-section>Total Payout: </q-item-section>
                      <q-item-section side>{{ numberFormat(computedBet) }}</q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div :class="!disable_betting ? 'hidden': 'row q-mt-md'">
        <div class="col-12 q-pa-md text-center" style="background: radial-gradient(circle, rgb(255, 163, 163) 0%, rgb(184, 0, 6) 100%)">
          <h2>MATCH STARTED</h2>
        </div>
      </div>
      <div>
        <!-- start print -->
        <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="false"
          :preview-modal="true"
          :paginate-elements-by-height="300"
          filename="receipt"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a7"
          pdf-orientation="portrait"
          pdf-content-width="212px"
          @hasStartedGeneration="hasStartedGeneration()"
          @hasGenerated="hasGenerated($event)"
          ref="html2Pdf"
          >
            <section slot="pdf-content">
              <div class="row q-pr-lg q-py-md q-pl-md">
                <div class="text-bold text-h6 col-12 text-center">
                      {{ betside }}
                </div>
                <div class="col-12 text-center">
                      {{ current_date }} {{ current_time }}
                </div>
                <div class="q-pt-sm col-6 text-left">
                      Sultada #
                </div>
                <div class="col-6 text-right">
                  {{ current_data === null ? 'NO MATCHES' : current_data.match_number }}
                </div>
                <div class="col-6 text-left">
                      Bet Side
                </div>
                <div class="col-6 text-right">
                  {{ betside }}
                </div>
                <div class="col-6 text-left">
                      Odds
                </div>
                <div class="col-6 text-right">
                  {{ odds }}
                </div>
                <div class="col-6 text-left">
                      Bet Amount
                </div>
                <div class="col-6 text-right">
                  {{ numberFormat(betamount) }}
                </div>
                <div class="col-6 text-left">
                      Bet Prize
                </div>
                <div class="col-6 text-right">
                  {{ numberFormat(bet_prize) }}
                </div>
                <div class="col-6 text-left text-bold">
                      Total Payout
                </div>
                <div class="col-6 text-right text-bold">
                  {{ numberFormat(computedBet) }}
                </div>
                <div class="col-12">
                  <q-separator color="black" />
                </div>
                <div class="col-6 text-left">
                    Cashier
                </div>
                <div class="col-6 text-right">
                    PC3
                </div>
                <div class="col-12 font-style">
                  1. Ang ticket na ito ay para sa Sultada No na naka sulat sa taas.
                </div>
                <div class="col-12 font-style">
                  2. Ang premyo ng ticket na ito ay dapat i-claim ang ticker sa loob ng 72 oras
                </div>
              </div>
            </section>
        </vue-html2pdf>
        <!-- end print -->
      </div>
    </div>
</template>

<script>
import { axiosCont } from 'boot/axios'
import VueHtml2pdf from 'vue-html2pdf'

export default {
  data () {
    return {
      modal: {
        bground: ''
      },
      betside: '',
      bet_color: '',
      bet_bg: '',
      loading: true,
      winnerPop: false,
      started: false,
      oddedit: false,
      bet: 0,
      sultada: '',
      nickname: 'bords',
      betamount: 0,
      disable_betting: null,
      betprize: 0,
      odds: 0,
      totalpayout: 0,
      winner: '',
      meron: 0,
      wala: 0,
      ended: 0,
      current_data: [],
      current_time: '',
      dateOptions: { year: 'numeric', month: 'long', day: 'numeric' },
      current_date: ''
    }
  },
  watch: {
    changed: function (isChanged) {
      if (isChanged) {
        console.log('state: ' + this.$store.state.reload.changed)
        this.getCurrentMatch()
      }
    }
  },
  components: {
    VueHtml2pdf
  },
  methods: {
    generateReport () {
      this.$refs.html2Pdf.generatePdf()
    },
    autoReload () {
      // setInterval(() => {
      this.getCurrentMatch()
      // }, 5000)
    },
    getCurrentMatch () {
      // this.loading = true
      axiosCont.get('matches/current', {
      }).then(response => {
        this.current_data = response.data
        this.meron = this.current_data === null ? 0 : this.current_data.meron_odd
        this.wala = this.current_data === null ? 0 : this.current_data.wala_odd
        this.disable_betting = this.current_data === null ? true : this.current_data.disable_betting
        this.ended = this.current_data === null
      })
    },
    add_bet (bet) {
      // this.loading = true
      axiosCont.post('bets/add', {
        ticket_number: this.ticket_number(),
        match_number: this.current_data.match_number,
        bet_side: bet,
        match_odd: this.current_data.meron_odd + ' : ' + this.current_data.wala_odd,
        bet_amount: this.betamount,
        bet_prize: this.bet_prize,
        total_payout: this.computedBet,
        cashier_id: 1
      }).then(response => {
        console.log(response)
      })
      this.generateReport()
      axiosCont.put('matches/add-bet/' + this.current_data.id, {
        bet_side: bet,
        bet_amount: this.betamount,
        total_payout: this.computedBet
      }).then(response => {
        this.betside = ''
        this.bet_color = ''
        this.bet_b = ''
        this.bet = 0
        this.betamount = 0
        this.betprize = 0
        this.odds = 0
        this.totalpayout = 0
        // this.$q.loading.hide()
        this.getCurrentMatch()
        this.$q.loading.hide()
        // window.location.reload()
      })
    },
    ticket_number () {
      const today = new Date()
      return String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0') + today.getFullYear() + today.getHours() + today.getMinutes() + today.getSeconds()
    },
    numberFormat (text) {
      return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    amount (amount) {
      this.betamount = amount !== 'Clear' ? parseInt(this.betamount) + parseInt(amount) : 0
    },
    chooseSide (text) {
      this.betside = text
      this.bet_color = text === 'MERON' ? 'text-h6 text-red' : 'text-h6 text-blue'
      this.bet_bg = text === 'MERON' ? 'text-h6 text-white bg-red-5' : 'text-h6 text-white bg-blue-9'
      this.odds = text === 'MERON' ? this.current_data.meron_odd : this.current_data.wala_odd
      this.disabe_betting = false
    },
    createBet () {
      const oddPercentage = (this.odds - 100) / 100
      this.betprize = parseInt(this.betamount) * oddPercentage
      this.totalpayout = parseInt(this.betprize) + parseInt(this.betamount)
      this.disabe_betting = true
      console.log(this.betamount + ',' + oddPercentage)
    },
    display_ct () {
      setInterval(() => {
        const display = new Date().toLocaleTimeString()
        this.current_time = display
      }, 1000)
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
    setInterval(() => {
      this.getCurrentMatch()
    }, 5000)
    const date = new Date()
    this.current_date = date.toLocaleDateString('en-US', this.dateOptions)
    setInterval(() => {
      const display = new Date().toLocaleTimeString()
      this.current_time = display
    }, 1000)
  }
}
</script>

<style lang="sass">
.font-style
  padding-top: 2px
  font-size: 9px
</style>
