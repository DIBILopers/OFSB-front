<template>
  <q-page class="background">
      <div class="row flex flex-center " style="padding-top: 120pt;">
        <div class="col-3">
          <q-card class="my-card q-pa-md rounded-borders shadow-6" style="background-color: rgba(133, 136, 140, 0.3);">
            <q-card-section class="top-login-bar text-white">
              <div class="text-h3 text-center"> Login </div>
            </q-card-section>
            <q-card-section class="text-white" style="margin-top:20px;">
              <q-input required color="" dark v-model="form.email" type="email" class="text-white" >
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
              <q-input color="" dark v-model="form.password" :type="isPwd ? 'password' : 'text'">
                <template v-slot:prepend>
                  <q-icon name="vpn_key" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn :ripple="{ color: 'blue' }" color="grey-3" push class="full-width text-black" label="login" @click="loginClick"/>
            </q-card-actions>
          </q-card>
        </div>
      </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: 'admin',
        password: 'admin123'
      },
      isPwd: false
    }
  },
  methods: {
    loginClick () {
      // const data = {
      //   email: this.email,
      //   password: this.password
      // }
      // console.log(data)
      this.$router.push('/admin/home')
    }
  }
}
</script>

<style lang="sass">
.background
  background: url('~assets/bg-login3.jpg') no-repeat center center fixed
  -webkit-background-size: cover
  -moz-background-size: cover
  -o-background-size: cover
  background-size: cover
</style>
