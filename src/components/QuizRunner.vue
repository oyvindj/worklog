<template>
  <div>
    <div class="ui icon message">
      <i class="inbox icon"></i>
      <div class="content">
        <div class="header">
          Running Quiz
        </div>
        <p>{{ quiz.name }}</p>
      </div>
    </div>

    <div v-if="!started">
      <button v-on:click="run()" class="ui primary button"> Start </button>
    </div>

    <h1 v-if="showCountdown"><span>Showing question in {{ countdown }} seconds...</span></h1>

    <h2 v-if="showQuestion"><span>{{ quiz.questions[currentQuestion].q }}?</span></h2>

    <div v-if="showQuestion" class="ui steps" v-for="(item, index) in quiz.questions[currentQuestion].answers">
      <div v-bind:class="{ correctAnswer: isCorrect(index) }">
      <a class="active step" v-on:click="submit(index)">
        <div id="option{index}" class="content">
          <div class="title">{{ item }}</div>
          <div class="description">&nbsp;</div>
        </div>
      </a>
      </div>
    </div>

    <div v-if="showTimeout" class="ui warning message">
      <div class="header">
        Du brukte for lang tid på å svare!
      </div>
      Du må svare innen 5 sekunder per spørsmål
    </div>

    <div v-if="showAnswer" class="ui confirmation message" v-bind:class="{ confirmation: currentResult, error: !currentResult }" >
      <div class="header">
        Svaret var: {{ currentResult }}!
      </div>
      Du brukte {{ answerTime }} ms. på å svare
    </div>
    <!--<div v-if="showAnswer" class="ui large green label">Svaret var: {{ currentResult }}!</div>-->

    <div v-if= "showFinishedResult" class="ui positive message">
      <i class="close icon" data-vivaldi-spatnav-clickable="1"></i>
      <div class="header">
        Quizen er ferdig:
      </div>
      <p>{{ correctAnswerCount }} av {{ quiz.questions.length }} riktige svar på {{ totalAnswerTime }} ms.</p>
    </div>

    <div v-if="showFinishedResult">
      <button v-on:click="tryAgain()" class="ui primary button">Prøv en ny quiz</button>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import router from './../router'
  import { Runner } from '../common/runner'
  export default {
    name: 'quizrunner',
    data () {
      return {
        started: false,
        showCountdown: false,
        showQuestion: false,
        showAnswer: false,
        showFinishedResult: false,
        showTimeout: false,
        runner: null,
        currentQuestion: 0,
        correctAnswerCount: 0,
        countdown: 0,
        currentResult: false,
        answerTime: -1,
        totalAnswerTime: -1
      }
    },
    computed: {
      ...mapGetters({
        profile: 'GET_PROFILE',
        quiz: 'GET_QUIZ'
      })
    },
    methods: {
      onStart () {
        console.log('started...')
      },
      onFinish (correctAnswerCount, totalAnswerTime) {
        console.log('finished, correct answers: ' + correctAnswerCount)
        this.correctAnswerCount = correctAnswerCount
        this.totalAnswerTime = totalAnswerTime
        this.runner.stop()
        this.triggerDisplay(this.showFinishedResult)
        this.showFinishedResult = true
      },
      onCountdown (sec) {
        console.log('showCountdown: ' + sec)
        this.countdown = sec
        this.triggerDisplay(this.showCountdown)
        this.showCountdown = true
      },
      onCountdownCount () {
        this.countdown--
      },
      onTimeout () {
        console.log('showTimeout...')
        this.triggerDisplay(this.showTimeout)
        this.showTimeout = true
        this.showAnswer = true
      },
      onQuestion (index) {
        console.log('showQuestion: ' + index)
        this.currentQuestion = index
        this.triggerDisplay(this.showQuestion)
        this.showQuestion = true
      },
      onAnswer (result, answerTime) {
        console.log('showAnswer: ' + result)
        this.currentResult = result
        this.answerTime = answerTime
        this.triggerDisplay(this.showAnswer)
        this.showAnswer = true
      },
      submit (index) {
        this.runner.answer(index)
      },
      tryAgain () {
        router.replace('start')
      },
      triggerDisplay (trigger) {
        this.showCountdown = false
        this.showQuestion = false
        this.showTimeout = false
        this.showAnswer = false
        this.showFinalResult = false
        trigger = true
      },
      run () {
        this.started = true
        this.runner.start()
      },
      isCorrect (index) {
        return (this.showAnswer && (index === this.quiz.questions[this.currentQuestion].a))
      }
    },
    mounted: function () {
      this.runner = new Runner(this.quiz, this.onStart, this.onFinish, this.onCountdown, this.onTimeout, this.onQuestion, this.onAnswer, this.onCountdownCount)
    }
  }
</script>

<style scoped>
  a {
    cursor: pointer;
  }
  .correctAnswer {
    background-color: green;
  }
</style>

