<template>
  <div>
    <h3>Arbeidsliste</h3>
    <table class="ui celled striped table">
      <thead>
      <tr>
        <th>Kunde</th>
        <th>Prosjekt</th>
        <th>Dato</th>
        <th>Varighet</th>
        <th>Beskrivelse</th>
        <th v-if="isAdmin">Bruker</th>
        <th>&nbsp;</th>
      </tr>
      </thead>
      <tbody v-for="(item, index) in questionList">
      <tr>
        <td> <div class="ui fluid large label">{{item.company}}</div> </td>
        <td> <div class="ui fluid large label">{{item.project}}</div> </td>
        <td> <div class="ui fluid large label">{{ dateString(item) }}</div> </td>
        <td> <div class="ui fluid large label">{{ item.duration }}</div> </td>
        <td> <div class="ui fluid large label">{{ item.description }}</div> </td>
        <td v-if="isAdmin"> <div class="ui fluid large label">{{item.nickname}}</div> </td>
        <td>
          <div class="ui horizontal">
            <button @click="submitDeleteQuestion(item)" class="ui red button"> Slett </button>
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

  export default {
    name: 'questionlist',
    props: {
      questionList: {
        default: null
      },
      isAdmin: {
        default: false,
        type: Boolean
      }
    },
    computed: {
      ...mapGetters({
        profile: 'GET_USER'
      })
    },
    methods: {
      dateString (item) {
        const d = new dateUtil.MyDate(new Date(item.date))
        return d.getShortDateString() + ' ' + item.fromTime + '-' + item.toTime
      },
      voteUp (item) {
        console.log('vote up...')
      },
      ...mapActions({
        deleteQuestion: 'DELETE_WORK'
      }),
      ...mapMutations({
      }),
      submitDeleteQuestion (item) {
        this.deleteQuestion(item.id)
      }
    },
    mounted: function () {
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

