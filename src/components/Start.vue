<template>
  <div>
    <!--<Challenges></Challenges>-->
    <!--<Highscores></Highscores>-->
    <QuizList :quizList="quizList"></QuizList>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Challenges from './Challenges.vue'
  import Highscores from './Highscores.vue'
  import QuizList from './QuizList.vue'
  export default {
    name: 'start',
    computed: {
      ...mapGetters({
        profile: 'GET_PROFILE',
        quizList: 'GET_QUIZ_LIST'
      })
    },
    components: {
      Challenges, Highscores, QuizList
    },
    methods: {
      ...mapActions({
        loadChallenges: 'LOAD_CHALLENGES',
        loadHighscores: 'LOAD_HIGHSCORES',
        loadUsers: 'LOAD_USERS'
      })
    },
    created: function () {
    }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
</style>

