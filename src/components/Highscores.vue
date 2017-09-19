<template>
  <div>
    <a class="ui large orange label">
      Highscore is held by {{ highscores[0].nick }}
    </a>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'highscores',
    computed: {
      ...mapGetters({
        profile: 'GET_PROFILE',
        highscores: 'GET_HIGHSCORES'
      })
    },
    methods: {
      ...mapActions({
        loadHighscores: 'LOAD_HIGHSCORES'
      })
    },
    mounted: function () {
      this.loadHighscores()
    }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
</style>

