<template xmlns="http://www.w3.org/1999/html">
  <div class="create-question">
    <div class="ui attached segment">
      <p>Spørsmål: </p>
      <div class="ui input focus big">
        <input placeholder="Spørsmål..." v-model="question.question">
        <button class="ui red button" @click="removeQuestion(question, editIndex)">Slett Spørsmål</button>
      </div>

      <div class="ui hidden divider"></div>

      <div class="ui form">
        <div class="three fields">
          <div class="field">
            <label>Alternativ 1</label>
            <input placeholder="Alternativ 1" v-model="question.answer1">
          </div>
          <div class="field">
            <label>Alternativ 2</label>
            <input placeholder="Alternativ 2" v-model="question.answer2">
          </div>
          <div class="field">
            <label>Alternativ 3</label>
            <input placeholder="Alternativ 3" v-model="question.answer3">
          </div>
        </div>
      </div>

      <div class="ui hidden divider"></div>

      <div class="ui form">
        <div class="inline fields">
          <label>Hva er riktig svar?</label>
          <div class="field">
            <div class="ui radio checkbox">
              <input type="radio" v-model="question.correctAnswer" checked="checked" value="1">
              <label>Alternativ 1...</label>
            </div>
          </div>
          <div class="field">
            <div class="ui radio checkbox">
              <input type="radio" v-model="question.correctAnswer" name="frequency" value="2">
              <label>Alternativ 2...</label>
            </div>
          </div>
          <div class="field">
            <div class="ui radio checkbox">
              <input type="radio" v-model="question.correctAnswer" name="frequency" value="3">
              <label>Alternativ 3...</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'

  export default {
    name: 'createquestion',
    data () {
      return {
        isEdit: false,
        editIndex: 0
      }
    },
    computed: {
      ...mapGetters({
        profile: 'GET_PROFILE',
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
      removeQuestion (question, index) {
      },
      ...mapActions({
      }),
      ...mapMutations({
        setQuestion: 'SET_QUESTION'
      })
    },
    mounted: function () {
      console.log('CreateQuestion mounted...')
    },
    created: function () {
      console.log('CreateQuestion created...')
      if (this.question) {
        this.isEdit = true
      }
    }
  }
</script>

<style>
</style>
