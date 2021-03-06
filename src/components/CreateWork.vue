<template xmlns="http://www.w3.org/1999/html">
  <div class="create-worknavbar">
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
      <div class="select-project">
        <SelectCompany></SelectCompany>
        <SelectProject companyId="work.companyId"></SelectProject>
      </div>
      <button :disabled="!validate()" v-on:click="submitForm" class="ui large primary button" tabindex="0">
        Lagre
      </button>
    </div>
     <!-- <SelectableList items="projects" loader="LOAD_PROJECTS" creater="CREATE_PROJECT" deleter="DELETE_PROJECT" selector="SELECTED_PROJECT" paramName="companyId" paramValue="SELECTED_COMPANY"></SelectableList> -->
  </div>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import * as dateUtil from '../common/dateUtil'
  import SelectCompany from './SelectCompany.vue'
  import SelectProject from './SelectProject.vue'
  import SelectableList from './SelectableList.vue'
  import * as miscUtil from '../common/miscUtil'

  export default {
    name: 'creatework',
    data () {
      return {
        confirmationMessage: '',
        work: this.createNewWork()
      }
    },
    components: {
      SelectCompany, SelectProject, SelectableList
    },
    computed: {
      ...mapGetters({
        projects: 'GET_PROJECTS',
        companies: 'GET_COMPANIES',
        user: 'GET_USER',
        confirmed: 'GET_CONFIRMED',
        error: 'GET_ERROR',
        selectedCompany: 'GET_SELECTED_COMPANY',
        selectedProject: 'GET_SELECTED_PROJECT'
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
      createNewWork () {
        const date = new dateUtil.MyDate(new Date())
        this.setSelectedCompany(localStorage.getItem('last_company'))
        this.setSelectedProject(localStorage.getItem('last_project'))
        return {
          toTime: dateUtil.getCurrentTimeString(new Date()),
          date: date.getInputString()
        }
      },
      submitForm () {
        console.log('submitForm()...')
        this.work['nickname'] = this.user.nickname
        this.work['companyId'] = this.selectedCompany
        this.work['projectId'] = this.selectedProject
        localStorage.setItem('last_company', this.work.companyId)
        localStorage.setItem('last_project', this.work.projectId)
        const fromTime = new dateUtil.MyTime(this.work.fromTime)
        const toTime = new dateUtil.MyTime(this.work.toTime)
        this.work['fromTime'] = fromTime.getTime()
        this.work['toTime'] = toTime.getTime()
        const success = (item) => {
          console.log('cb called: ' + JSON.stringify(item))
          this.confirmationMessage = miscUtil.getNameFromList(item.companyId, this.companies) + ' - ' + miscUtil.getNameFromList(item.projectId, this.projects) + ' (' + item.description + '): ' + item.fromTime + '-' + item.toTime + ' (' + item.duration + ')'
          this.work = this.createNewWork()
        }
        this.createWork({work: this.work, success: success, error: success})
      },
      validate () {
        return true
      },
      ...mapMutations({
        setConfirmed: 'SET_CONFIRMED',
        setError: 'SET_ERROR',
        setSelectedCompany: 'SET_SELECTED_COMPANY',
        setSelectedProject: 'SET_SELECTED_PROJECT'
      }),
      ...mapActions({
        loadProjects: 'LOAD_PROJECTS',
        loadCompanies: 'LOAD_COMPANIES',
        createWork: 'CREATE_WORK',
        createCompany: 'CREATE_COMPANY',
        createProject: 'CREATE_PROJECT'
      }),
      closeError () {
        this.setError(false)
      },
      closeMessage () {
        this.setConfirmed(false)
      },
      errorClass () {
        return ''
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
  .select-project {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 50% 50%;
    grid-template-areas: "c p";
    justify-items: stretch;
    align-items: stretch;
  }
  SelectProject {
    grid-area: p;
  }
  SelectCompany {
    grid-area: c;
  }
</style>
