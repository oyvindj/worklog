<template xmlns="http://www.w3.org/1999/html">
  <div class="navbar">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">

          <router-link :to="'/'"
                       class="ui primary button big">
            Hjem
          </router-link>
          <router-link :to="'/worklist'"
                       class="ui primary button big">
            Arbeidslogg
          </router-link>
          <button
            class="ui right floated button big"
            v-if="!authenticated"
            @click="login()">
            Logg inn
          </button>

          <button
            class="ui right floated button big"
            v-if="authenticated"
            @click="logout()">
            Logg av
          </button>
          <a class="ui right floated button" v-if="authenticated">
            <img class="ui right spaced avatar image" v-bind:src="this.profile.picture">
            Velkommen {{profile.nickname}}!
          </a>

        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AuthService from '../auth/AuthService'

const auth = new AuthService()
const { login, logout } = auth

export default {
  name: 'navbar',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      profile: 'GET_USER',
      authenticated: 'GET_AUTHENTICATED'
    })
  },
  methods: {
    login,
    logout
  }
}
</script>
<style scoped></style>
