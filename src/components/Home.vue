<template>
  <div class="home">
    <div class="ui hidden divider"></div>
    <h4 v-if="!authenticated">
      You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
    </h4>

    <!--<div class="ui buttons">
      <button class="ui button" @click="submitQuestion()">Send inn nytt spørsmål</button>
      <div id="or-label" class="or"></div>
      <button class="ui positive button">Se alle spørsmål</button>
    </div>-->

    <CreateWork v-if="authenticated"></CreateWork>
    <div class="ui hidden divider"></div>
    <WorkList v-if="authenticated" :isAdmin=false :questionList="questions"></WorkList>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import WorkList from './WorkList.vue'
  import CreateWork from './CreateWork.vue'

  export default {
    name: 'home',
    props: ['auth', 'authenticated'],
    computed: {
      ...mapGetters({
        profile: 'GET_USER',
        questions: 'GET_WORK_LIST'
      })
    },
    components: {
      WorkList, CreateWork
    },
    methods: {
      submitQuestion () {
        this.createQuestion({description: 'Foo question?', nickname: this.profile.nickname})
      },
      ...mapActions({
        loadQuestionList: 'LOAD_WORK_LIST',
        createQuestion: 'CREATE_WORK'
      }),
      getUserId () {
        if (this.profile && this.profile.sub) {
          return this.profile.sub.split('|')[1]
        } else {
          return ''
        }
      }
    },
    mounted: function () {
      this.loadQuestionList()
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

