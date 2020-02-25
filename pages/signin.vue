<template>
  <v-app>
    <div v-if="!showRegister">
      <sign-in-card @changeRegister="showRegister = !showRegister" />
    </div>
    <div v-else>
      <register-card @changeRegister="showRegister = !showRegister" />
    </div>
  </v-app>
</template>

<script>
import RegisterCard from '../components/RegisterCard'
import SignInCard from '../components/SignInCard'
export default {
  components: {
    RegisterCard,
    SignInCard
  },
  data () {
    return {
      showRegister: false
    }
  },
  beforeCreate () {
    if (this.$store.state.users.loggedIn) {
      this.$router.push('/upload')
    } else {
      this.$router.push('/signin')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
