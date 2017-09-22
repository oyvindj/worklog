<template>
  <div class="worklist">
    <div v-if="showErrorDelete" class="ui error message">
      <i class="close icon" @click="closeErrorDelete()"></i>
      <div class="header">
        Sletting av arbeid feilet
      </div>
      <p>Noe gikk feil. Prøv igjen senere</p>
    </div>
    <div v-if="showConfirmDelete" class="ui message">
      <i class="close icon" @click="closeConfirmDelete()"></i>
      <div class="header">
        Arbeidet er slettet
      </div>
      <p>blah blah...</p>
    </div>
    <h3>Arbeidsliste</h3>
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
        <th>Tid</th>
        <th>Varighet</th>
        <th>Beskrivelse</th>
        <th v-if="isAdmin">Bruker</th>
        <th>&nbsp;</th>
      </tr>
      </thead>
      <tbody v-for="(item, index) in questionList">
      <tr>
        <td> <div class="ui fluid large label">{{ getCompanyName(item.company) }}</div> </td>
        <td> <div class="ui fluid large label">{{item.project}}</div> </td>
        <td> <div class="ui fluid large label">{{ dateString(item) }}</div> </td>
        <td> <div class="ui fluid large label">{{ item.duration }}</div> </td>
        <td> <div class="ui fluid large label">{{ item.description }}</div> </td>
        <td v-if="isAdmin"> <div class="ui fluid large label">{{item.nickname}}</div> </td>
        <td>
          <div class="ui horizontal">
            <button @click="submitDelete(item)" class="ui red button"> Slett </button>
            <!--<button @click="voteUp(item)" class="ui button">
              <i class="thumbs up icon"></i>
              Vote
            </button>-->
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
  import * as dateUtil from '../common/dateUtil'
  import modal from 'vue-semantic-modal'

  export default {
    name: 'questionlist',
    props: {
      /* questionList: {
        default: this.work
      }, */
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
        questionList: 'GET_WORK_LIST'
      })
    },
    methods: {
      getCompanyName (id) {
        for (const item of this.companies) {
          if (item.id === id) {
            return item.name
          }
          return 'undefined'
        }
      },
      confirmDelete () {
        console.log('confirm...')
        const success = (item) => {
          console.log('item deleted...')
          this.showConfirmDelete = true
          this.showErrorDelete = false
        }
        const error = (item) => {
          console.log('error deleting...')
          this.showConfirmDelete = false
          this.showErrorDelete = true
        }
        this.deleteQuestion({item: this.deleteItem.id, success: success, error: error})
        this.showModal = false
      },
      dateString (item) {
        const d = new dateUtil.MyDate(new Date(item.date))
        return d.getShortDateString() + ' ' + item.fromTime + '-' + item.toTime
      },
      voteUp (item) {
        console.log('vote up...')
      },
      ...mapActions({
        deleteQuestion: 'DELETE_WORK',
        loadAllProjects: 'LOAD_ALL_PROJECTS',
        loadCompanies: 'LOAD_COMPANIES',
        loadWorkList: 'LOAD_WORK_LIST'
      }),
      ...mapMutations({
      }),
      submitDelete (item) {
        console.log('showing modal...')
        // this.deleteQuestion(item.id)
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
      this.loadWorkList()
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

