<template>
  <v-app>
    <v-card class="mx-auto upload">
      <v-card-title>
        <h2>Select a file</h2>
      </v-card-title>
      <v-file-input
        v-model="file"
        @change="loadCSV($event)"
        class="mr-4 ml-1 file-input"
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
      <v-card-actions>
        <v-btn :disabled="!file" @click="uploadFile" class="ml-auto" color="success">
          Upload file
        </v-btn>
      </v-card-actions>
    </v-card>

    <div class="csv-table">
      <v-card>
        <v-card-title>
          Statement
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="parse_csv"
          :search="search"
          class="csv-table"
        />
      </v-card>
    </div>

    <v-app />
  </v-app>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      file: null,
      sortOrders: {},
      sortKey: '',
      parse_csv: [],
      headers: [],
      search: ''
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
    sortBy (key) {
      const vm = this
      vm.sortKey = key
      vm.sortOrders[key] = vm.sortOrders[key] * -1
    },

    loadCSV () {
      if (window.FileReader) {
        const reader = new FileReader()
        reader.readAsText(this.file)
        reader.onload = (event) => {
          const csv = event.target.result
          this.parse_csv = this.csvJSON(csv)
        }
      } else {
        console.log('No file reader')
      }
    },

    csvJSON (csv) {
      const lines = csv.split('\n')

      const result = []

      const headers = lines[0].toString().replace(/"/g, '').split(',')
      headers.forEach((header, index) => {
        if (index === 0) {
          this.headers.push({ text: header, value: header, width: '8%' })
        } else {
          this.headers.push({ text: header, value: header })
        }
      })
      console.log(this.headers)
      this.parse_header = lines[0].split(',')
      lines[0].split(',').forEach((key) => {
        this.sortOrders[key] = 1
      })

      lines.map(function (line, indexLine) {
        if (indexLine < 1) { return } // Jump header line

        // console.log(line)
        const obj = {}
        const currentline = line.substr(1).split('","')

        headers.map(function (header, indexHeader) {
          if (indexHeader === 0) {
            console.log(currentline[indexHeader])
            // eslint-disable-next-line quotes
            obj[header] = moment(currentline[indexHeader]).format("DD-MM-YYYY")
          } else {
            obj[header] = currentline[indexHeader]
          }
        })

        result.push(obj)
      })

      result.pop() // remove the last item because undefined values
      return result // JavaScript object
    },

    uploadFile () {
      console.log(this.file.name)
      console.log(this.file)
      const formData = new FormData()
      formData.append('file', this.file)

      console.log(formData)
      this.$axios.$post(`${process.env.BASE_URL}/files/upload`, formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }).then((res) => {
        console.log(res.message)
      }).catch((err) => {
        console.log(err)
      })
    }

  }
}
</script>

<style lang="scss" scoped>
  .upload {
    width: 500px;
    margin-top: 50px;
  }

  .csv-table {
    margin-top: 40px
  }
</style>
