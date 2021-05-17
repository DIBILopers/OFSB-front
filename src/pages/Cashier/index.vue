<template>
  <div class="q-pa-md q-gutter-lg">
    <div id="oddss" class="row q-gutter-xs text-center">
        <div class="col q-gutter-sm">
            <q-card dark bordered class="bg-red-7 my-card">
                <q-card-section>
                    <div class="text-h1">MERON</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    <div class="text-h3"> 170 </div>
                </q-card-section>
            </q-card>
            <q-btn size="xl" color="red" label="MERON" />
        </div>

        <div class="col q-gutter-sm">
            <q-card dark bordered class="bg-blue-7 my-card">
                <q-card-section>
                    <div class="text-h1">WALA</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    <div class="text-h3"> 230 </div>
                </q-card-section>
            </q-card>
            <q-btn size="xl" color="blue" label="WALA" />
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
