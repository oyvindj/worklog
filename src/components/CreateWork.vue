<template xmlns="http://www.w3.org/1999/html">
  <div class="create-worknavbar">
    <h3>Logg Arbeid</h3>
    <modal v-model="showCreateProject">
      <p slot="header">Skriv inn prosjektnavn og velg firma</p>
      <div slot="content" class="work-form">
        <div class="ui labeled input form-row" v-bind:class="errorClass('name')">
          <div class="ui label">Prosjektnavn</div>
          <input v-model="projectName" placeholder="prosjektnavn">
        </div>
        <div class="ui labeled input form-row" v-bind:class="errorClass('center')">
          <div class="ui label"><i class="building icon"></i>Firma *</div>
          <select class="ui fluid dropdown" v-model="projectCompanyId">
            <option v-for="item in companies" v-bind:value="item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <template slot="actions">
        <div class="ui black deny button" @click="showCreateProject=false">Avbryt</div>
        <div class="ui positive right button" @click="confirmCreateProject()">Lagre</div>
      </template>
    </modal>
    <modal v-model="showCreateCompany">
      <p slot="header">Skriv inn firmanavn</p>
      <div slot="content" class="work-form">
        <div class="ui labeled input form-row" v-bind:class="errorClass('name')">
          <div class="ui label">Firmanavn</div>
          <input v-model="companyName" placeholder="firmanavn">
        </div>
      </div>
      <template slot="actions">
        <div class="ui black deny button" @click="showCreateCompany=false">Avbryt</div>
        <div class="ui positive right button" @click="confirmCreateCompany()">Lagre</div>
      </template>
    </modal>
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
        <div class="ui labeled input" v-bind:class="errorClass('fromDate')">
          <div class="ui label"><i class="calendar icon"></i>Dato</div>
          <input v-model="work.date" type="date">
        </div>
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
        <select class="ui fluid dropdown" v-model="companyId">
          <option v-for="item in companies" v-bind:value="item.id">{{ item.name }}</option>
        </select>
        <a @click="submitCreateCompany()">Legg til</a>
      </div>
      <div class="ui labeled input form-row" v-bind:class="errorClass('center')">
        <div class="ui label"><i class="building icon"></i>Prosjekt *</div>
        <select class="ui fluid dropdown" v-model="work.projectId">
          <option v-for="item in projects" v-bind:value="item.id">{{ item.name }}</option>
        </select>
        <a @click="submitCreateProject()">Legg til</a>
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
  import modal from 'vue-semantic-modal'

  export default {
    name: 'creatework',
    data () {
      return {
        confirmationMessage: '',
        work: this.createNewWork(),
        companyName: '',
        projectName: '',
        projectCompanyId: -1,
        showCreateCompany: false,
        showCreateProject: false
      }
    },
    components: {
      modal
    },
    computed: {
      ...mapGetters({
        projects: 'GET_PROJECTS',
        companies: 'GET_COMPANIES',
        user: 'GET_USER',
        confirmed: 'GET_CONFIRMED',
        error: 'GET_ERROR'
      }),
      companyId: {
        get: function () {
          return this.work.companyId
        },
        set: function (value) {
          if (value === undefined) {
            return
          }
          console.log('setting companyId to: ' + value)
          this.work.companyId = value
          this.loadProjects(value)
        }
      }
    },
    methods: {
      confirmCreateCompany () {
        console.log('confirmCreateCompany: ' + this.companyName)
        const success = (item) => {
          console.log('company created...')
        }
        const error = (item) => {
          console.log('error company create: ' + item)
        }
        const company = {
          name: this.companyName
        }
        this.createCompany({data: company, success: success, error: error})
        this.showCreateCompany = false
      },
      confirmCreateProject () {
        const project = {
          name: this.projectName,
          companyId: this.projectCompanyId
        }
        const success = (item) => {
          console.log('project created...')
          this.loadProjects(this.projectCompanyId)
        }
        const error = (item) => {
          console.log('error project create: ' + item)
        }
        this.createProject({data: project, success: success, error: error})
        this.showCreateProject = false
      },
      submitCreateProject () {
        this.showCreateProject = true
      },
      submitCreateCompany () {
        this.showCreateCompany = true
      },
      createNewWork () {
        const date = new dateUtil.MyDate(new Date())
        return {
          toTime: dateUtil.getCurrentTimeString(new Date()),
          companyId: localStorage.getItem('last_company'),
          projectId: localStorage.getItem('last_project'),
          date: date.getInputString()
        }
      },
      submitForm () {
        console.log('submitForm()...')
        this.work['nickname'] = this.user.nickname
        localStorage.setItem('last_company', this.work.companyId)
        localStorage.setItem('last_project', this.work.projectId)
        const fromTime = new dateUtil.MyTime(this.work.fromTime)
        const toTime = new dateUtil.MyTime(this.work.toTime)
        this.work['fromTime'] = fromTime.getTime()
        this.work['toTime'] = toTime.getTime()
        const success = (item) => {
          console.log('cb called: ' + JSON.stringify(item))
          this.confirmationMessage = item.company + ' - ' + item.project + ' (' + item.description + '): ' + item.fromTime + '-' + item.toTime + ' (' + item.duration + ')'
          this.work = this.createNewWork()
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
        createWork: 'CREATE_WORK',
        createCompany: 'CREATE_COMPANY',
        createProject: 'CREATE_PROJECT'
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
      // this.loadProjects()
      this.loadCompanies()
    },
    watch: {
      work: function () {
        console.log('work changed')
      },
      companyId: function () {
        console.log('company id changed')
        this.loadProjects(this.work.companyId)
      }
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
