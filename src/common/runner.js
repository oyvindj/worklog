export class Runner {
  static STARTED = 0
  static COUNTDOWN = 1
  static ANSWERING = 2
  static SHOWING_ANSWER = 3
  static SHOWING_TIMEOUT = 4
  static SHOWING_RESULT = 5
  static ANSWERED = 6
  static FINISHED = 7

  constructor (quiz, onStart, onFinish, onCountdown, onTimeout, onQuestion, onAnswer, onCountdownCount) {
    this.quiz = quiz
    this.questions = this.quiz.questions
    this.onStart = onStart
    this.onFinish = onFinish
    this.onCountdown = onCountdown
    this.onCountdownCount = onCountdownCount
    this.onTimeout = onTimeout
    this.onQuestion = onQuestion
    this.onAnswer = onAnswer
    this.counter = 0
    this.state = Runner.STARTED
    this.stateChange = 0
    this.currentQuestion = 0
    this.currentAnswer = -1
    this.currentCountdown = 3
    this.correctAnswerCount = 0
    this.answerStartTime = -1
    this.answerFinishTime = -1
    this.totalAnswerTime = 0
    console.log('quiz has ' + this.questions.length + ' questions...')
  }

  changeState (state) {
    this.stateChange = 0
    this.state = state
  }
  doIt () {
    this.counter++
    this.stateChange++
    console.log('doing: ' + this.stateChange + ' - ' + this.state)
    switch (this.state) {
      case (Runner.STARTED):
        this.changeState(Runner.COUNTDOWN)
        this.onCountdown(3)
        return
      case Runner.COUNTDOWN:
        if (this.stateChange >= this.currentCountdown) {
          this.answerStartTime = new Date().getTime()
          this.changeState(Runner.ANSWERING)
          this.onQuestion(this.currentQuestion)
        } else {
          this.onCountdownCount()
        }
        return
      case Runner.ANSWERING:
        if (this.stateChange >= 5) {
          this.changeState(Runner.SHOWING_TIMEOUT)
          this.onTimeout()
        }
        return
      case Runner.ANSWERED:
        this.changeState(Runner.SHOWING_ANSWER)
        const correct = this.isCorrectAnswer(this.currentAnswer)
        if (correct) this.correctAnswerCount++
        const answerTime = this.answerFinishTime - this.answerStartTime
        this.onAnswer(correct, answerTime)
        return
      case Runner.SHOWING_TIMEOUT:
      case Runner.SHOWING_ANSWER:
        if (this.stateChange >= 2) {
          this.currentQuestion++
          if (this.currentQuestion >= this.questions.length) {
            this.changeState(Runner.FINISHED)
            this.onFinish(this.correctAnswerCount, this.totalAnswerTime)
          } else {
            this.currentCountdown = 2
            this.changeState(Runner.COUNTDOWN)
            this.onCountdown(2)
          }
        }
        return
      case Runner.FINISHED:
        return
      default:
        console.log('unknown state: ' + this.state)
    }
  }
  isCorrectAnswer (index) {
    return (this.questions[this.currentQuestion].a === index)
  }
  answer (index) {
    this.currentAnswer = index
    this.changeState(Runner.ANSWERED)
    this.answerFinishTime = new Date().getTime()
    const answerTime = this.answerFinishTime - this.answerStartTime
    this.totalAnswerTime = this.totalAnswerTime + answerTime
  }
  start () {
    this.interval = setInterval(() => this.doIt(), 1000)
    this.onStart()
  }
  stop () {
    clearInterval(this.interval)
  }
  hello () {
    return 'hello from runner.js'
  }
  isRunning () {
    return (this.counter < 5)
  }
}
