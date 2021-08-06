<template>
    <div class="q-pa-lg">
      <div class="row q-mb-md">
        <div class="col text-h2 text-center q-mt-md">BETS</div>
      </div>
      <div class="row">
        <div class="col" id="history">
          <q-table
              title="Users"
              :data="table.data"
              :columns="table.columns"
              :filter="table.filter"
              :loading="table.loading"
              row-key="name"
          >
          <template v-slot:top>
              <q-space />
              <q-input borderless dense debounce="300" filled color="grey-7" placeholder="Search" v-model="table.filter">
                  <template v-slot:append>
                      <q-icon name="search" />
                  </template>
              </q-input>
          </template>
          <template v-slot:body="props">
              <q-tr :props="props">
                  <q-td key="ticket_number" :props="props">{{ props.row.ticket_number }}</q-td>
                  <q-td key="match_number" :props="props">{{ props.row.match_number }}</q-td>
                  <q-td key="match_winner" :props="props">{{ props.row.match_winner }}</q-td>
                  <q-td key="bet_side" :props="props">{{ props.row.bet_side }}</q-td>
                  <q-td key="match_odd" :props="props">{{ props.row.match_odd }}</q-td>
                  <q-td key="bet_amount" :props="props">{{ numberFormat(props.row.bet_amount) }}</q-td>
                  <q-td key="bet_prize" :props="props">{{ numberFormat(props.row.bet_prize) }}</q-td>
                  <q-td key="total_payout" :props="props">{{ props.row.match_winner === 'DRAW'? numberFormat(props.row.bet_amount) : numberFormat(props.row.total_payout) }}</q-td>
                  <q-td key="status" :props="props">{{ props.row.status }}</q-td>
                  <q-td key="action" :props="props" class="q-gutter-xs">
                      <q-btn :color="props.row.status === 'Unclaimed' || props.row.status === 'Draw'? 'green-6' : (props.row.status === 'Claimed' ? 'amber-9' : 'red-6')" @click="claim(props.row)" class="btn-action" :disable="props.row.status === 'Lose' || props.row.status === 'Claimed'" :label="props.row.status === 'Claimed' ? 'Claimed' : 'Claim'" size="sm" dense >
                          <q-tooltip content-class="grey" :delay="550" anchor="top middle" self="center middle">{{ props.row.status === 'Claimed' ? "Claimed" : "Claim" }}</q-tooltip>
                      </q-btn>
                      <q-dialog v-model="modal.claim" persistent>
                      <q-card dark class="q-pa-sm" style="min-width: 350px; width: 400px; background: rgba(0,0,0, 0.90)" >
                        <q-card-section>
                          <div class="text-h6"><q-icon name="warning" class="text-red q-mb-md" style="font-size: 3rem;" />Confirm Action</div>
                        </q-card-section>

                        <q-card-section>
                          <div class="text-h6 text-center">Claim PHP {{ numberFormat(modal.modalData.bet_amount) }}</div>
                        </q-card-section>

                        <q-card-actions align="right" class="text-primary">
                          <q-btn @click="confirmClaim(modal.modalData)" color="green" flat label="Confirm" v-close-popup />
                          <q-btn color="red" flat label="Close" v-close-popup />
                        </q-card-actions>
                      </q-card>
                    </q-dialog>
                      <!-- <q-btn color="red-6" class="btn-action" @click="onDelete(props.row)" :disable="tableLoading" icon="delete" size="sm" dense flat>
                          <q-tooltip content-class="grey" :delay="550" anchor="top middle" self="center middle">Delete</q-tooltip>
                      </q-btn> -->
                  </q-td>
              </q-tr>
          </template>
          </q-table>
        </div>
      </div>
    </div>
</template>

<script>
import { axiosCont } from 'src/boot/axios'
// import { axiosCont } from 'boot/axios'

export default {
  data () {
    return {
      modal: {
        bground: '',
        claim: false,
        confirm: false,
        modalData: {
          id: null,
          bet_amount: 0
        }
      },
      table: {
        columns: [
          { name: 'ticket_number', required: true, label: 'Ticket Number', align: 'center', field: 'ticket_number', sortable: true },
          { name: 'match_number', required: true, label: 'Match Number', align: 'center', field: 'match_number', format: val => `${val}`, sortable: true },
          { name: 'match_winner', required: true, label: 'Match Winner', align: 'center', field: 'match_winner' },
          { name: 'bet_side', required: true, label: 'Bet Side', align: 'center', field: 'bet_side' },
          { name: 'match_odd', required: true, label: 'Odds (M : W)', align: 'center', field: 'match_odd' },
          { name: 'bet_amount', required: true, label: 'Bet Amount', align: 'center', field: 'bet_amount' },
          { name: 'bet_prize', required: true, label: 'Bet Prize', align: 'center', field: 'bet_prize' },
          { name: 'total_payout', required: true, label: 'Total Payout', align: 'center', field: 'total_payout' },
          { name: 'status', required: true, label: 'Status', align: 'center', field: 'status' },
          { name: 'action', align: 'center', label: 'Action' }
        ],
        data: [],
        filter: null,
        loading: false
      }
    }
  },
  methods: {
    getData () {
      axiosCont.get('bets/index', {
      }).then(response => {
        this.table.data = response.data
      })
    },
    claim (data) {
      // axiosCont.pu
      this.modal.claim = true
      this.modal.modalData = data
    },
    confirmClaim (data) {
      axiosCont.put('bets/claim/' + data.id, {
      }).then(response => {
        console.log(response.data)
        this.getData()
      })
    },
    numberFormat (text) {
      return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    display_ct () {
      setInterval(() => {
        const display = new Date().toLocaleTimeString()
        this.current_time = display
      }, 1000)
    }
  },
  mounted () {
    this.getData()
    // setInterval(() => {
    //   this.getCurrentMatch()
    // }, 5000)
    // const date = new Date()
    // this.current_date = date.toLocaleDateString('en-US', this.dateOptions)
    // setInterval(() => {
    //   const display = new Date().toLocaleTimeString()
    //   this.current_time = display
    // }, 1000)
  }
}
</script>

<style lang="sass">
.font-style
  padding-top: 2px
  font-size: 9px
</style>
