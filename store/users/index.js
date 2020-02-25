export const state = () => ({
  username: '',
  userId: 0,
  loggedIn: false

})

export const mutations = {
  login (state, data) {
    console.log(data)
    state.loggedIn = true
    state.username = data.username
    state.userId = data.user_id
  },
  logOut (state) {
    state.loggedIn = false
  }
}

export const getters = {
  getStatus (state) {
    return state.loggedIn
  }
}
