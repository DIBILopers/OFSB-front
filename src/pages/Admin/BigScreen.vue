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
        <q-card dark bordered class="col bg-red-7 my-card">
            <q-card-section>
                <div class="text-h1">MERON</div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section>
                <div class="text-h3">170</div>
            </q-card-section>
        </q-card>

        <q-card dark bordered class="col bg-blue-7 my-card">
            <q-card-section>
                <div class="text-h1">WALA</div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section>
                <div class="text-h3">230</div>
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
export default {
  data () {
    return {
      winnerPop: false,
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
  }
}
</script>
