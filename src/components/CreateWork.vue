<template xmlns="http://www.w3.org/1999/html">
  <div class="navbar">
    <h3>Logg Arbeid</h3>
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
        user: 'GET_USER'
      })
    },
    methods: {
      submitForm () {
        console.log('submitForm()...')
        this.work['nickname'] = this.user.nickname
        this.work['date'] = new Date()
        localStorage.setItem('last_company', this.work.company)
        localStorage.setItem('last_project', this.work.project)
        this.createWork(this.work)
      },
      validate () {
        return true
      },
      ...mapMutations({}),
      ...mapActions({
        loadProjects: 'LOAD_PROJECTS',
        loadCompanies: 'LOAD_COMPANIES',
        createWork: 'CREATE_WORK'
      }),
      errorClass () {
        return ''
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
