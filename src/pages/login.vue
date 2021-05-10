<template>
  <q-page class="flex flex-center">
   <q-card class="my-card col-md-6">
      <q-card-section class="q-gutter-md">
        <div class="text-h6">Login sa Sabungan ni Nene</div>
        <q-input outlined v-model="text" label="Username" />
        <q-input outlined v-model="text" label="Password" />
        <q-btn color="primary" label="Login" to="/sakanal" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
