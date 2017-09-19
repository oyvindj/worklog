<template xmlns="http://www.w3.org/1999/html">
  <div class="review-quiz">
    <div>
    <table class="ui striped table">
      <thead>
      <tr>
        <th>Spørsmål</th>
        <th>Alternativ 1</th>
        <th>Alternativ 2</th>
        <th>Alternativ 3</th>
      </tr>
      </thead>
      <tbody v-for="item in newQuestions">
      <tr>
        <td>{{ item.question }}</td>
        <td v-bind:class="{correct: item.correctAnswer == 1}">{{ item.answer1 }}</td>
        <td v-bind:class="{correct: item.correctAnswer == 2}">{{ item.answer2 }}</td>
        <td v-bind:class="{correct: item.correctAnswer == 3}">{{ item.answer3 }}</td>
      </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'

  export default {
    name: 'reviewquiz',
    data () {
      return {
      }
    },
    components: {
    },
    computed: {
      ...mapGetters({
        profile: 'GET_PROFILE',
        newQuestions: 'GET_NEW_QUESTIONS'
      })
    },
    methods: {
      isCorrect (question, index) {
        return ((question.a - 1) === index)
      },
      ...mapActions({
      }),
      ...mapMutations({
      })
    },
    mounted: function () {
    },
    created: function () {
    }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
  .correct {
    background-color: lightgreen;
  }
</style>
