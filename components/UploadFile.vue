<template>
  <v-app>
    <v-card class="mx-auto upload">
      <v-card-title>
        <h2>Upload a file</h2>
      </v-card-title>
      <!-- <v-form> -->
      <v-file-input
        v-model="file"
        class="mr-4 ml-1"
        outlined
        label="Select file"
        color="blue accent-4"
      >
        <template v-slot:selection="{text}">
          <v-chip
            color="blue accent-4"
            dark
            label
            small
          >
            {{ text }}
          </v-chip>
        </template>
      </v-file-input>
      <!-- </v-form> -->
      <v-card-actions>
        <v-btn :disabled="!file" @click="uploadFile" class="ml-auto" color="success">
          Upload file
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-app />
  </v-app>
</template>

<script>
// import fastcsv from 'fast-csv'
export default {
  data () {
    return {
      file: null
    }
  },
  watch: {
    file (newValue, oldValue) {
      console.log(newValue + ' / ' + oldValue)
    }
  },
  beforeCreate () {
    if (!this.$store.state.users.loggedIn) {
      this.$router.push('/signin')
    }
  },
  methods: {
    uploadFile () {
      const formData = new FormData()
      formData.append('file', this.file)
      this.$axios.post(`${process.env.BASE_URL}/files/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((result) => {
        console.log(result)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload {
    width: 500px;
    margin-top: 250px;
  }
</style>
