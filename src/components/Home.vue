<template>
  <div class="home">
    <h4 v-if="!authenticated">
      You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
    </h4>

    <CreateWork v-if="authenticated"></CreateWork>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import CreateWork from './CreateWork.vue'

  export default {
    name: 'home',
    props: ['auth', 'authenticated'],
    computed: {
      ...mapGetters({
        profile: 'GET_USER'
      })
    },
    components: {
      CreateWork
    },
    methods: {
      ...mapActions({}),
      getUserId () {
        if (this.profile && this.profile.sub) {
          return this.profile.sub.split('|')[1]
        } else {
          return ''
        }
      }
    }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
  #or-label {
    content: 'eller';
  }
  .ui.buttons .or:before {
    content: 'eller';
    width: 2.2em;
  }
</style>

