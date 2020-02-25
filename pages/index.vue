<template>
  <div />
</template>

<script>
export default {
  beforeCreate () {
    if (this.$store.state.users.loggedIn) {
      this.$router.push('/upload')
    } else {
      this.$router.push('/signin')
    }
  }
}
</script>
