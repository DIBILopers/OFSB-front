<template>
  <div class="q-pa-md q-gutter-lg">
    <div id="oddss"  class="row q-gutter-xs text-center">
        <div class="col q-gutter-sm" style="padding-right: 1px">
            <q-card dark bordered class="bg-red-7 my-card">
                <q-card-section>
                    <div class="text-h2" style="padding-top: 10px">MERON</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    <div class="text-h3"> 170 </div>
                </q-card-section>
            </q-card>
            <q-btn size="xl" style="width: 98.5%;" color="red" push label="MERON" />
        </div>

        <div class="col q-gutter-sm" style="padding-left: 1px;">
            <q-card dark bordered class="bg-blue-7 my-card">
                <q-card-section>
                    <div class="text-h2" style="padding-top: 10px">WALA</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    <div class="text-h3"> 230 </div>
                </q-card-section>
            </q-card>
            <q-btn size="xl" style="width: 98.5%" color="blue" push label="WALA" />
        </div>
    </div>
     <!-- <div id="oddss" class="row">
        <q-dialog v-model="oddedit" persistent class="">
            <q-card>
                <q-card-section class="row text- q-gutter-md">
                  <div class="q-pa-md" style="max-width: 350px">
                    <q-list  separator>
                      <q-item >
                        <q-item-label v-model="sultada">Sultada # 24</q-item-label>
                      </q-item>
                      <q-item >
                          <q-item-label v-model="betside">Bet Side <b>WALA</b></q-item-label>
                      </q-item>
                    </q-list>
                  </div>
                </q-card-section>
                  <q-card-section class="row">
                  <q-input outlined v-model="nickname" label="Nickname" />
                  <q-input outlined v-model="bet" label="Bet" />
                </q-card-section>

                <q-card-actions align="right">
                <q-btn label="Save" color="green" v-close-popup />
                <q-btn label="Cancel" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
  </div> -->
   <q-card style="margin-left: auto; margin-right: auto; margin-top: 70px; max-width: 999px; width: 100%">
       <q-card-section class="row q-gutter-md">
        <div class="col-5 q-gutter-md">
          <!-- <q-input outlined v-model="nickname" label="Nickname" /> -->
          <q-input outlined v-model="bet" label="Bet">
            <template v-slot:before>
              <q-icon name="person"/>
            </template>
          </q-input>
            <q-card-actions align="right">
             <q-btn class="full-width" icon="monetization_on" label="Bet" color="green" v-close-popup />
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
                <q-item-label v-model="betside">Bet Side <b class="text-red">WALA</b></q-item-label>
            </q-item>
            <q-item style="padding-top: 20px; margin-left: 6px">
              <q-item-label v-model="odds"> Odds:</q-item-label>
            </q-item>
            <q-item style="padding-top: 20px; margin-left: 6px">
                <q-item-label v-model="betamount">Bet Amount: <strong>{{ betamount }}</strong></q-item-label>
            </q-item>
              <q-item style="padding-top: 20px; margin-left: 6px">
              <q-item-label v-model="betprize">Bet Prize</q-item-label>
            </q-item>
            <q-item style="padding-top: 20px; margin-left: 6px">
                <q-item-label v-model="totalpayout">Total Payout:</q-item-label>
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
export default {
  data () {
    return {
      modal: {
        bground: ''
      },
      winnerPop: false,
      started: false,
      oddedit: false,
      bet: 50000,
      sultada: '#23',
      nickname: 'bords',
      betamount: 5000,
      betprize: 3000,
      odds: 170,
      totalpayout: 8000,
      winner: '',
      columns: [
        {
          name: 'Match Number',
          required: true,
          label: 'Match Number',
          align: 'center',
          field: 'id',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'Match',
          align: 'center',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'meron',
          align: 'center',
          label: 'Meron',
          field: 'meron',
          sortable: true
        },
        {
          name: 'wala',
          align: 'center',
          label: 'Wala',
          field: 'wala',
          sortable: true
        },
        {
          name: 'winner',
          align: 'center',
          label: 'Winner',
          field: 'winner',
          sortable: true
        },
        {
          name: 'total',
          align: 'center',
          label: 'Total Bet',
          field: 'total',
          sortable: true
        }
      ],

      data: [
        {
          id: '1',
          name: 'Twice vs Momoland',
          meron: 170,
          wala: 230,
          winner: 'Twice',
          total: 500000
        },
        {
          id: '2',
          name: 'Twice vs Blackpink',
          meron: 170,
          wala: 230,
          winner: 'Twice',
          total: 500000
        },
        {
          id: '3',
          name: 'Twice vs Itzy',
          meron: 170,
          wala: 230,
          winner: 'Draw',
          total: 500000
        },
        {
          id: '4',
          name: 'Twice vs BTS',
          meron: 170,
          wala: 230,
          winner: 'Twice',
          total: 500000
        },
        {
          id: '5',
          name: 'Twice vs Izone',
          meron: 170,
          wala: 230,
          winner: 'Twice',
          total: 500000
        },
        {
          id: '6',
          name: 'Twice vs Mamamoo',
          meron: 170,
          wala: 230,
          winner: 'Twice',
          total: 500000
        },
        {
          id: '7',
          name: 'Twice vs Redvelvet',
          meron: 170,
          wala: 230,
          winner: 'Redvelvet',
          total: 500000
        }
      ]
    }
  },
  methods: {
    startmatch () {
      this.started = true
    },
    editOdd () {
      this.oddedit = false
    }
  }
}
</script>
