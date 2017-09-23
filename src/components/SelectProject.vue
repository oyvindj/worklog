<template xmlns="http://www.w3.org/1999/html">
  <div class="select-project">
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
    <div class="ui segment">
      <div class="ui block header select-header">
        <i class="building icon"></i>
        <span>Prosjekt</span>
        &nbsp;&nbsp;&nbsp;
        <div class="add-link"><a @click="submitCreateProject()">Legg til</a></div>
      </div>
      <div class="ui middle aligned selection animated list project-list">
      <div v-for="item in projects" class="item" v-bind:class="selectedClass(item.id)" @click="select(item.id)">
        <div class="content" v-bind:class="selectedClass(item.id)" @click="select(item.id)">
          <div class="header">{{ item.name }}</div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  // import Foo from './Foo.vue'
  import modal from 'vue-semantic-modal'

  export default {
    name: 'selectproject',
    data () {
      return {
        projectName: '',
        projectCompanyId: -1,
        showCreateProject: false
      }
    },
    props: {
      companyId: {
        default: null
      }
    },
    components: {
      modal
    },
    computed: {
      ...mapGetters({
        companies: 'GET_COMPANIES',
        projects: 'GET_PROJECTS',
        selectedCompany: 'GET_SELECTED_COMPANY',
        selectedProject: 'GET_SELECTED_PROJECT'
      })
    },
    methods: {
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
        this.projectCompanyId = this.selectedCompany
        this.showCreateProject = true
      },
      ...mapMutations({
        setSelectedProject: 'SET_SELECTED_PROJECT'
      }),
      ...mapActions({
        loadProjects: 'LOAD_PROJECTS',
        createProject: 'CREATE_PROJECT'
      }),
      select (id) {
        console.log('selecting id: ' + id)
        this.setSelectedProject(id)
      },
      selectedClass (id) {
        if (id === this.selectedProject) {
          console.log('active id: ' + id)
          return 'active'
        }
        return ''
      },
      errorClass () {
        return ''
      }
    },
    mounted: function () {
      if (this.selectedCompany !== null) {
        this.loadProjects(this.selectedCompany)
      }
    },
    created: function () {},
    watch: {
      'selectedCompany': function () {
        this.loadProjects(this.selectedCompany)
      }
    }
  }
</script>
<style scoped>
  .select-header {
    display: flex;
    flex-direction: row;
  }
  .select-project {
    display: flex;
    flex-direction: column;
  }
  .project-list {
    min-height: 100px;
  }
  .select-header .add-link {
    justify-self: flex-end;
    align-self: flex-end;
  }
</style>
