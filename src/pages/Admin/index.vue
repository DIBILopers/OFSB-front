<template>
  <div class="q-pa-md q-gutter-lg">

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
