<template>
  <div class="q-pa-md q-gutter-lg">
    <div id="match" class="row q-gutter-xs text-center">
        <q-card dark bordered class="col text-black bg-white my-card">
            <q-card-section>
                <div class="text-h3">Match #</div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section>
                <div class="text-h1">24</div>
            </q-card-section>
        </q-card>
    </div>
    <div id="oddss" class="row q-gutter-xs text-center">
        <div class="col q-gutter-sm">
            <q-card dark bordered class="bg-red-7 my-card">
                <q-card-section>
                    <div class="text-h1">MERON</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    <div class="text-h3">{{ meron }}</div>
                </q-card-section>
            </q-card>
            <q-btn size="xl" :disable="!started" @click="displayWinner('meron')" color="red" label="MERON WINS" />
        </div>

        <div class="col q-gutter-sm">
            <q-card dark bordered class="bg-blue-7 my-card">
                <q-card-section>
                    <div class="text-h1">WALA</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    <div class="text-h3">{{ wala }}</div>
                </q-card-section>
            </q-card>
            <q-btn size="xl" :disable="!started" @click="displayWinner('wala')" color="primary" label="WALA WINS" />
        </div>
    </div>

    <div id="oddss" class="row q-gutter-xs text-center">
        <div class="col q-gutter-sm">
            <q-btn size="xl" :disable="!started" @click="displayWinner('draw')" color="green" label="Draw" />
        </div>
    </div>

    <div id="winnerPop" class="row q-gutter-xs">
        <q-dialog  v-model="winnerPop">
            <q-card style="width:500px;" :class="modal.bground">
                <q-card-section class="text-white row">
                <div class="text-h1">{{ winner }}</div>
                </q-card-section>
                <q-card-section class="text-white row">
                <div class="text-h1">WINS</div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>

    <div id="control" class="row q-gutter-xs text-center">
        <div dark bordered class="col bg-white my-card ">
            <q-card-section class="q-gutter-sm">
                <q-btn size="xl" :disable="started" @click="oddedit = true" color="primary" label="Edit Odds" icon="edit" />
                <q-btn size="xl" :disable="started" @click="startmatch" color="amber-6" :icon="started ? 'pause' : 'play_arrow'" label="Start Match" />
                <!-- <q-btn size="xl" :disable="!started" @click="endmatch" color="red" label="End Match" /> -->
            </q-card-section>
        </div>
    </div>

    <div id="oddss" class="row q-gutter-xs text-center">
        <q-dialog v-model="oddedit" persistent class="col-8">
            <q-card>
                <q-card-section class="row items-center q-gutter-md">
                <q-input class="" outlined color="red" v-model="meron" label="Meron" />
                <q-input outlined v-model="wala" label="Wala" />
                </q-card-section>

                <q-card-actions align="right">
                <q-btn label="Save" color="green" v-close-popup />
                <q-btn label="Cancel" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>

    <div id="history">
        <q-table
            class="my-sticky-column-table"
            title="History"
            :data="data"
            :columns="columns"
            row-key="name"
        />
    </div>
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
      meron: 100,
      wala: 10,
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
  }
}
</script>
