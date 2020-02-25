<template>
  <v-app>
    <v-card class="sign-card mx-auto">
      <v-card-title>
        <h2>Login</h2>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            :rules="[rules.required]"
            v-model="emailOrUsername"
            label="Email or Username"
            prepend-icon="mdi-at"
          />
          <v-text-field
            :rules="[rules.required, rules.min]"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            label="Password"
            prepend-icon="mdi-lock"
          />
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn @click="$emit('changeRegister')" color="info">
          Register
        </v-btn>
        <v-spacer />
        <v-btn :disabled="!valid" @keyup.enter="login" @click="login" color="success" elevation="5">
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.error ? 'error' : 'success'"
    >
      {{ snackbar.text }}
      <v-btn
        @click="snackbar.show = false"
        color="blue"
        text
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      showPassword: false,
      valid: false,
      emailOrUsername: '',
      password: '',
      rules: {
        required: value => !!value || 'This field is required',
        // email: email => this.validateEmail(email) || 'Incorrect email',
        min: v => v.length >= 8 || 'Min 8 characters'
      },
      snackbar: {
        error: false,
        show: false,
        text: ''
      }
    }
  },
  methods: {
    validateEmail (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    login () {
      this.$axios.$post(`${process.env.BASE_URL}/users/login`, {
        emailOrUsername: this.emailOrUsername,
        password: this.password
      }).then((res) => {
        this.snackbar.text = res.message
        console.log(res)
        if (res.success) {
          this.snackbar.error = false
          this.$store.commit('users/login', res.data)
          this.snackbar.show = true
          console.log(this.$store.state.users.userId)
          this.$router.push('/upload')
        } else {
          this.snackbar.error = true
          this.snackbar.show = true
        }
        // this.setLoggedIn()
      }).catch((err) => {
        console.log(err)
      })
    },
    ...mapMutations({
      setLoggedIn: 'users/setLoggedIn'
    })
  }
}
</script>

<style lang="scss" scoped>
  .login {

  }
</style>
