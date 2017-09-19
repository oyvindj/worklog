<template>
  <div>
    <h3 v-if="isAdmin" class="ui block header">
      Dine Quizer
    </h3>
    <h3 v-if="!isAdmin" class="ui block header">
      Velg en quiz fra lista
    </h3>
    <table class="ui celled striped table">
      <thead>
      <tr>
        <th>Tittel</th>
        <th v-if="!isAdmin">Bruker</th>
        <th>&nbsp;</th>
      </tr>
      </thead>
      <tbody v-for="(item, index) in quizList">
      <tr>
        <td>
          <div class="ui fluid large label">{{item.name}}</div>
        </td>
        <td v-if="!isAdmin">
          <div class="ui fluid label">{{item.nickname}}</div>
        </td>
        <td>
          <div class="ui horizontal">
            <button v-if="!isAdmin" v-on:click="runQuiz(index)" class="ui primary button"> Ta Quiz </button>
            <button v-if="isAdmin" v-on:click="editQuiz(item)" class="ui primary button"> Rediger </button>
            <button v-if="isAdmin" v-on:click="submitDeleteQuiz(item)" class="ui red button"> Slett </button>
          </div>
        </td>
      </tr>
      </tbody>
      <tfoot>
      </tfoot>
    </table>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import router from './../router'
  // import router from '../router/index'
  export default {
    name: 'quizlist',
    props: {
      quizList: {
        default: null
      },
      isAdmin: {
        default: false,
        type: Boolean
      }
    },
    computed: {
      ...mapGetters({
        profile: 'GET_PROFILE'
      })
    },
    methods: {
      ...mapActions({
        deleteQuiz: 'DELETE_QUIZ'
      }),
      ...mapMutations({
        setQuiz: 'SET_QUIZ'
      }),
      runQuiz: function (index) {
        console.log('running quiz: ' + index)
        this.setQuiz({ data: this.quizList[index] })
        router.replace('quizrunner')
      },
      submitDeleteQuiz (quiz) {
        console.log('deleting ' + quiz.id)
        this.deleteQuiz(quiz)
      },
      editQuiz (quiz) {
        console.log('edit quiz...')
        router.replace({name: 'CreateQuiz', params: {editQuiz: quiz}})
      }
    },
    mounted: function () {
    }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
  .quiz-actions {
    display: flex;
    flex-direction: row;
  }
</style>

