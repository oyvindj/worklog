<template>
  <div>
    <a class="ui large olive label" style="">
      You have {{ challenges.length }} new challenges
      <i class="delete icon"></i>
    </a>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'start',
    computed: {
      ...mapGetters({
        profile: 'GET_PROFILE',
        challenges: 'GET_CHALLENGES'
      })
    },
    methods: {
      ...mapActions({
        loadChallenges: 'LOAD_CHALLENGES'
      })
    },
    mounted: function () {
      this.loadChallenges()
    }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
</style>

