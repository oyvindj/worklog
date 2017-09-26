<template>
  <div class="worklist">
    <div v-if="showErrorDelete" class="ui error message">
      <i class="close icon" @click="closeErrorDelete()"></i>
      <div class="header">
        Sletting av todo feilet
      </div>
      <p>Noe gikk feil. Prøv igjen senere</p>
    </div>
    <div v-if="showConfirmDelete" class="ui message">
      <i class="close icon" @click="closeConfirmDelete()"></i>
      <div class="header">
        Todo er slettet
      </div>
      <p>blah blah...</p>
    </div>
    <h3>Todoliste</h3>
    <modal v-model="showModal">
      <p slot="header">Bekreft Sletting</p>
      <p slot="content">Er du sikker på at du vil slette?</p>
      <template slot="actions">
        <div class="ui black deny button" @click="showModal=false">Nei</div>
        <div class="ui positive right button" @click="confirmDelete()">Ja</div>
      </template>
    </modal>
    <table class="ui celled striped table">
      <thead>
      <tr>
        <th>Kunde</th>
        <th>Prosjekt</th>
        <th>Beskrivelse</th>
        <th v-if="isAdmin">Bruker</th>
        <th>&nbsp;</th>
      </tr>
      </thead>
      <tbody v-for="(item, index) in todos">
      <tr>
        <td> <div class="ui fluid large label">{{ getCompanyName(item.companyId) }}</div> </td>
        <td> <div class="ui fluid large label">{{ getProjectName(item.projectId) }}</div> </td>
        <td> <div class="ui fluid large label">{{ item.description }}</div> </td>
        <td v-if="isAdmin"> <div class="ui fluid large label">{{item.nickname}}</div> </td>
        <td>
          <div class="ui horizontal">
            <button @click="submitDelete(item)" class="ui red button"> Slett </button>
          </div>
        </td>
      </tr>
      </tbody>
      <tfoot>
      </tfoot>
    </table>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import modal from 'vue-semantic-modal'

  export default {
    name: 'todolist',
    props: {
      isAdmin: {
        default: false,
        type: Boolean
      }
    },
    data () {
      return {
        showModal: false,
        deleteItem: null,
        showConfirmDelete: false,
        showErrorDelete: false
      }
    },
    components: {
      modal
    },
    computed: {
      ...mapGetters({
        profile: 'GET_USER',
        companies: 'GET_COMPANIES',
        projects: 'GET_ALL_PROJECTS',
        todos: 'GET_TODOS'
      })
    },
    methods: {
      getProjectName (id) {
        for (const item of this.projects) {
          if (item.id === id) {
            return item.name
          }
        }
        return 'undefined'
      },
      getCompanyName (id) {
        for (const item of this.companies) {
          if (item.id === id) {
            return item.name
          }
        }
        return 'undefined'
      },
      confirmDelete () {
        console.log('confirm...')
        const success = (item) => {
          console.log('item deleted...')
          this.loadTodos()
          this.showConfirmDelete = true
          this.showErrorDelete = false
        }
        const error = (item) => {
          console.log('error deleting...')
          this.showConfirmDelete = false
          this.showErrorDelete = true
        }
        this.deleteTodo({item: this.deleteItem.id, success: success, error: error})
        this.showModal = false
      },
      ...mapActions({
        deleteTodo: 'DELETE_TODO',
        loadAllProjects: 'LOAD_ALL_PROJECTS',
        loadCompanies: 'LOAD_COMPANIES',
        loadTodos: 'LOAD_TODOS'
      }),
      ...mapMutations({
      }),
      submitDelete (item) {
        console.log('showing modal...')
        this.deleteItem = item
        this.showModal = true
      },
      closeErrorDelete () {
        this.showErrorDelete = false
      },
      closeConfirmDelete () {
        this.showConfirmDelete = false
      }
    },
    mounted: function () {
      this.loadCompanies()
      this.loadAllProjects()
      this.loadTodos()
    }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
  .quiz-actions {
    display: flex;
    flex-direction: row;
  }
</style>

