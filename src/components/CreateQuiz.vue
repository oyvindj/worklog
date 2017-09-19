<template xmlns="http://www.w3.org/1999/html">
  <div class="create-quiz">
    <h3 class="ui block header">
      Create Quiz
    </h3>
    <div class="ui three top attached steps">
      <div class="step" v-bind:class="{active: isCurrent('name')}">
        <i class="add user icon"></i>
        <div class="content">
          <div class="title">Navn</div>
          <div class="description">Gi quizen din et navn</div>
        </div>
      </div>
      <div class="step" v-bind:class="{active: isCurrent('questions')}">
        <i class="idea icon"></i>
        <div class="content">
          <div class="title">Spørsmål og Svar</div>
          <div class="description">Definer spørsmålene og svarene i quizen din</div>
        </div>
      </div>
      <div class="step" v-bind:class="{active: isCurrent('confirm')}">
        <i class="save icon"></i>
        <div class="content">
          <div class="title">Lagre</div>
          <div class="description">Bekreft og lagre quizen</div>
        </div>
      </div>
    </div>

    <div class="ui attached segment" v-if="isCurrent('name')">
      <p>Quiz Navn: </p>
      <div class="ui input focus">
        <input placeholder="Navn..." v-model="newQuiz.name">
      </div>
      <button :disabled="!isCompleteName()" class="ui primary button" data-vivaldi-spatnav-clickable="1" @click="submitName()">
        Neste
      </button>
    </div>

    <div v-if="isCurrent('confirm')">
      <ReviewQuiz></ReviewQuiz>
      <button class="ui button" data-vivaldi-spatnav-clickable="1" @click="cancel()">
        Avbryt
      </button>
      <button class="ui primary button" data-vivaldi-spatnav-clickable="1" @click="submitQuiz()">
        Lagre Quiz og Spørsmål
      </button>
    </div>

    <div class="ui attached segment" v-if="isCurrent('questions')">
      <CreateQuestion></CreateQuestion>
      <button class="ui button" data-vivaldi-spatnav-clickable="1" @click="cancel()">
        Avbryt
      </button>
      <button v-if="hasPrevious()" :disabled="!isCompleteQuestion()" class="ui primary button" data-vivaldi-spatnav-clickable="1" @click="previous()">
        Forrige
      </button>
      <button v-if="hasNext()" :disabled="!isCompleteQuestion()" class="ui primary button" data-vivaldi-spatnav-clickable="1" @click="next()">
        Neste
      </button>
      <button :disabled="!isCompleteQuestion()" class="ui primary button" data-vivaldi-spatnav-clickable="1" @click="submitQuestion(false)">
        Nytt Spørsmål
      </button>
      <button :disabled="!isCompleteQuestion()" class="ui primary button" data-vivaldi-spatnav-clickable="1" @click="submitQuestion(true)">
        Bekreft & Lagre
      </button>

      <h4 class="ui block header">
        Quiz Spørsmål
      </h4>
      <div v-for="(item, index) in newQuestions" class="ui ordered list">
        <div>
          <a class="item">{{ item.question }}</a>
          <button class="ui small red button" @click="removeQuestion(item, index)">Slett</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import router from './../router'
  import ReviewQuiz from './ReviewQuiz.vue'
  import CreateQuestion from './CreateQuestion.vue'

  export default {
    name: 'createquiz',
    data () {
      return {
        state: 'name',
        isEdit: false,
        editIndex: 0,
        newQuiz: {name: ''}
      }
    },
    components: {
      CreateQuestion,
      ReviewQuiz
    },
    computed: {
      ...mapGetters({
        profile: 'GET_PROFILE',
        questions: 'GET_QUESTIONS',
        newQuestions: 'GET_NEW_QUESTIONS',
        question: 'GET_QUESTION'
      })
    },
    methods: {
      isCompleteQuestion () {
        return (this.question.question !== '') && (this.question.answer1 !== '') && (this.question.answer2 !== '') && (this.question.answer3 !== '') && (this.correctAnswer !== -1)
      },
      isCompleteName () {
        return (this.name !== '')
      },
      cancel () {
        router.replace('start')
      },
      isCurrent (state) {
        return (this.state === state)
      },
      removeQuestion (question, index) {
        this.newQuestions.splice(index, 1)
        if (index === this.editIndex) {
          // TODO handle empty array position
          this.editIndex++
          this.setQuestion(this.newQuestions[this.editIndex])
        }
        if (question.id) {
          this.deleteQuestion(question.id)
        }
      },
      submitQuiz () {
        this.newQuiz.nickname = this.profile.nickname
        this.createQuiz({quiz: this.newQuiz, questions: this.newQuestions})
        router.replace('start')
      },
      submitName () {
        this.state = 'questions'
        if (this.isEdit) {
          this.setNewQuestions(this.questions)
          this.setQuestion(this.newQuestions[0])
        }
      },
      hasNext () {
        return (this.editIndex < this.newQuestions.length)
      },
      hasPrevious () {
        return (this.editIndex > 0)
      },
      next () {
        this.setQuestion(this.newQuestions[++this.editIndex])
      },
      previous () {
        this.setQuestion(this.newQuestions[--this.editIndex])
      },
      submitQuestion (isLast) {
        if (this.isEdit) {
          this.newQuestions[this.editIndex] = this.question
          this.editIndex++
          if (this.editIndex >= this.questions.length) {
            this.isEdit = false
          }
        } else {
          this.newQuestions.push(this.question)
        }
        if (isLast) {
          this.state = 'confirm'
        } else {
          if (this.isEdit) {
            this.setQuestion(this.newQuestions[this.editIndex])
          } else {
            this.setQuestion({})
          }
        }
      },
      ...mapActions({
        createQuiz: 'CREATE_QUIZ',
        createQuestion: 'CREATE_QUESTION',
        loadQuestions: 'LOAD_QUESTIONS',
        deleteQuestion: 'DELETE_QUESTION'
      }),
      ...mapMutations({
        setQuestion: 'SET_QUESTION',
        setNewQuestions: 'SET_NEW_QUESTIONS'
      })
    },
    mounted: function () {
      const editQuiz = this.$route.params.editQuiz
      if (editQuiz) {
        this.loadQuestions(editQuiz.id)
      }
    },
    created: function () {
      const editQuiz = this.$route.params.editQuiz
      if (editQuiz) {
        this.newQuiz = editQuiz
        this.isEdit = true
      }
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
