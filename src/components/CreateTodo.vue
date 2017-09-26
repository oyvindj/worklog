<template xmlns="http://www.w3.org/1999/html">
  <div class="create-todo">
    <h3>Lag TODO</h3>
    <div v-if="error" class="ui error message">
      <i class="close icon" @click="closeError()"></i>
      <div class="header">
        Lagring av todo feilet
      </div>
      <p>Sjekk form input.</p>
    </div>
    <div v-if="confirmed" class="ui message">
      <i class="close icon" @click="closeMessage()"></i>
      <div class="header">
        Todo er lagret
      </div>
      <p>{{ confirmationMessage }}</p>
    </div>

    <div class="todo-form">
      <div class="ui labeled input form-row" v-bind:class="errorClass('firstName')">
        <div class="ui label">Beskrivelse *</div>
        <input v-model="todo.description" placeholder="beskrivelse">
      </div>
      <div class="select-project">
        <SelectCompany></SelectCompany>
        <SelectProject companyId="todo.companyId"></SelectProject>
      </div>
      <button :disabled="!validate()" v-on:click="submitForm" class="ui large primary button" tabindex="0">
        Lagre
      </button>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import SelectCompany from './SelectCompany.vue'
  import SelectProject from './SelectProject.vue'
  import * as miscUtil from '../common/miscUtil'

  export default {
    name: 'createtodo',
    data () {
      return {
        confirmationMessage: '',
        todo: this.createNewTodo()
      }
    },
    components: {
      SelectCompany, SelectProject
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
          return this.todo.companyId
        },
        set: function (value) {
          if (value === undefined) {
            return
          }
          this.todo.companyId = value
          this.loadProjects(value)
        }
      }
    },
    methods: {
      createNewTodo () {
        this.setSelectedCompany(localStorage.getItem('last_company'))
        this.setSelectedProject(localStorage.getItem('last_project'))
        return {description: ''}
      },
      submitForm () {
        console.log('submitForm()...')
        this.todo['nickname'] = this.user.nickname
        this.todo['companyId'] = this.selectedCompany
        this.todo['projectId'] = this.selectedProject
        localStorage.setItem('last_company', this.todo.companyId)
        localStorage.setItem('last_project', this.todo.projectId)
        const success = (item) => {
          this.confirmationMessage = miscUtil.getNameFromList(item.companyId, this.companies) + ' - ' + miscUtil.getNameFromList(item.projectId, this.projects) + ' (' + item.description + ')'
          this.todo = this.createNewTodo()
        }
        this.createTodo({item: this.todo, success: success, error: success})
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
        createTodo: 'CREATE_TODO',
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
      todo: function () {
        console.log('todo changed...')
      },
      companyId: function () {
        console.log('company id changed')
        this.loadProjects(this.todo.companyId)
      }
    }
  }
</script>
<style scoped>
  .todo-form {
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
