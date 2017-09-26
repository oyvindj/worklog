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
        <div><i class="building icon"></i> <span>Prosjekt</span></div>
        <div class="add-link"><i class="add circle icon"></i><a @click="submitCreateProject()">Legg til</a></div>
        <div v-if="!isEdit" class="add-link"><i class="edit icon"></i><a @click="isEdit = true">Rediger</a></div>
        <div v-if="isEdit" class="add-link"><i class="edit icon"></i><a @click="isEdit = false">Ferdig</a></div>
      </div>
      <div class="ui middle aligned selection animated list project-list">
      <div v-for="item in projects" class="item" v-bind:class="selectedClass(item.id)" @click="select(item.id)">
        <div class="content project-content" v-bind:class="selectedClass(item.id)" @click="select(item.id)">
          <div class="header">{{ item.name }}</div>
          <button v-if="isEdit" @click="submitDelete(item.id)" class="ui red small right button delete-button">Slett</button>
          <div v-if="!isEdit"></div>
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
        isEdit: false,
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
          this.projectName = ''
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
      submitDelete (id) {
        this.deleteProject({id: id, success: (item) => this.loadProjects(this.selectedCompany), error: (i) => {}})
      },
      ...mapMutations({
        setSelectedProject: 'SET_SELECTED_PROJECT'
      }),
      ...mapActions({
        loadProjects: 'LOAD_PROJECTS',
        deleteProject: 'DELETE_PROJECT',
        createProject: 'CREATE_PROJECT'
      }),
      select (id) {
        this.setSelectedProject(id)
      },
      selectedClass (id) {
        if (id === this.selectedProject) {
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
  .select-project {
    display: flex;
    flex-direction: column;
  }
  .select-header {
    display: grid;
    grid-template-columns: 50% 25% 25%;
  }
  .project-list {
    min-height: 100px;
  }
  .project-content {
    display: grid;
    grid-template-columns: 80% 20%;
  }
  .delete-button {
  }
</style>
