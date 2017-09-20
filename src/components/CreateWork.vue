<template xmlns="http://www.w3.org/1999/html">
  <div class="navbar">
    <h3>Logg Arbeid</h3>
    <div v-if="error" class="ui error message">
      <i class="close icon" @click="closeError()"></i>
      <div class="header">
        Logging av arbeid feilet
      </div>
      <p>Sjekk form input. Dato må være i framtiden og fra-tid før til-tid</p>
    </div>
    <div v-if="confirmed" class="ui message">
      <i class="close icon" @click="closeMessage()"></i>
      <div class="header">
        Arbeidet er logget
      </div>
      <p>{{ confirmationMessage }}</p>
    </div>

    <div class="work-form">
      <div class="ui labeled input form-row" v-bind:class="errorClass('firstName')">
        <div class="ui label">Beskrivelse *</div>
        <input v-model="work.description" placeholder="beskrivelse">
      </div>
      <div class="form-row">
        <div class="ui labeled input" v-bind:class="errorClass('fromTime')">
          <div class="ui label"><i class="clock icon"></i>Fra Tid</div>
          <input v-model="work.fromTime" placeholder="tt:mm">
        </div>
        <div class="ui labeled input" v-bind:class="errorClass('toTime')">
          <div class="ui label"><i class="clock icon"></i>Til Tid</div>
          <input v-model="work.toTime" placeholder="tt:mm">
        </div>
      </div>
      <div class="ui labeled input form-row" v-bind:class="errorClass('center')">
        <div class="ui label"><i class="building icon"></i>Firma *</div>
        <select class="ui fluid dropdown" v-model="work.company">
          <option v-for="item in companies" v-bind:value="item">{{ item }}</option>
        </select>
      </div>
      <div class="ui labeled input form-row" v-bind:class="errorClass('center')">
        <div class="ui label"><i class="building icon"></i>Prosjekt *</div>
        <select class="ui fluid dropdown" v-model="work.project">
          <option v-for="item in projects" v-bind:value="item">{{ item }}</option>
        </select>
      </div>
      <button :disabled="!validate()" v-on:click="submitForm" class="ui large primary button" tabindex="0">
        Lagre
      </button>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import * as dateUtil from '../common/dateUtil'

  export default {
    name: 'creatework',
    data () {
      return {
        confirmationMessage: '',
        work: {
          toTime: dateUtil.getCurrentTimeString(new Date()),
          company: localStorage.getItem('last_company'),
          project: localStorage.getItem('last_project')
        }
      }
    },
    computed: {
      ...mapGetters({
        projects: 'GET_PROJECTS',
        companies: 'GET_COMPANIES',
        user: 'GET_USER',
        confirmed: 'GET_CONFIRMED',
        error: 'GET_ERROR'
      })
    },
    methods: {
      submitForm () {
        console.log('submitForm()...')
        this.work['nickname'] = this.user.nickname
        this.work['date'] = new Date()
        localStorage.setItem('last_company', this.work.company)
        localStorage.setItem('last_project', this.work.project)
        const fromTime = new dateUtil.MyTime(this.work.fromTime)
        const toTime = new dateUtil.MyTime(this.work.toTime)
        this.work['fromTime'] = fromTime.getTime()
        this.work['toTime'] = toTime.getTime()
        const success = (item) => {
          console.log('cb called: ' + JSON.stringify(item))
          this.confirmationMessage = item.company + ' - ' + item.project + ' (' + item.description + '): ' + item.fromTime + '-' + item.toTime
        }
        this.createWork({work: this.work, success: success, error: success})
      },
      validate () {
        return true
      },
      ...mapMutations({
        setConfirmed: 'SET_CONFIRMED',
        setError: 'SET_ERROR'
      }),
      ...mapActions({
        loadProjects: 'LOAD_PROJECTS',
        loadCompanies: 'LOAD_COMPANIES',
        createWork: 'CREATE_WORK'
      }),
      errorClass () {
        return ''
      },
      closeError () {
        this.setError(false)
      },
      closeMessage () {
        this.setConfirmed(false)
      }
    },
    mounted: function () {
      this.loadProjects()
      this.loadCompanies()
    }

  }
</script>
<style scoped>
  .work-form {
    align-self: center;
    display: flex;
    flex-direction: column;
  }
  .button {
    max-width: 300px;
    align-self: left;
  }
  .input,
  .select {
    max-width: 600px;
    margin: 5px;
  }
</style>
