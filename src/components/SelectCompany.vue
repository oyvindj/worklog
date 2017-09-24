<template xmlns="http://www.w3.org/1999/html">
  <div class="select-company">
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
    <div class="ui segment">
      <div class="ui block header select-header">
        <div><i class="building icon"></i><span>Firma</span></div>
        <div class="add-link"><a @click="submitCreateCompany()">Legg til</a></div>
        <div v-if="!isEdit" class="add-link"><i class="edit icon"></i><a @click="isEdit = true">Rediger</a></div>
        <div v-if="isEdit" class="add-link"><i class="edit icon"></i><a @click="isEdit = false">Ferdig</a></div>
      </div>
      <div class="ui middle aligned selection animated list company-list">
      <div v-for="item in companies" class="item" v-bind:class="selectedClass(item.id)" @click="select(item.id)">
        <div class="content" v-bind:class="selectedClass(item.id)" @click="select(item.id)">
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
  import modal from 'vue-semantic-modal'

  export default {
    name: 'selectcompany',
    data () {
      return {
        companyName: '',
        isEdit: false,
        showCreateCompany: false
      }
    },
    props: {
      name: {
        default: null
      }
    },
    components: {
      modal
    },
    computed: {
      ...mapGetters({
        companies: 'GET_COMPANIES',
        selectedCompany: 'GET_SELECTED_COMPANY'
      })
    },
    methods: {
      submitDelete (id) {
        this.deleteCompany({id: id, success: (item) => this.loadProjects(this.selectedCompany), error: (i) => {}})
      },
      confirmCreateCompany () {
        console.log('confirmCreateCompany: ' + this.companyName)
        const success = (item) => {
          console.log('company created...')
          this.loadCompanies()
          // this.setSelectedCompany(item.id)
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
      submitCreateCompany () {
        this.showCreateCompany = true
      },
      ...mapMutations({
        setSelectedCompany: 'SET_SELECTED_COMPANY'
      }),
      ...mapActions({
        loadCompanies: 'LOAD_COMPANIES',
        deleteCompanie: 'DELETE_COMPANY',
        createCompany: 'CREATE_COMPANY'
      }),
      select (id) {
        console.log('selecting id: ' + id)
        this.setSelectedCompany(id)
      },
      selectedClass (id) {
        if (id === this.selectedCompany) {
          console.log('active id: ' + id)
          return 'active'
        }
        return ''
      },
      errorClass () {
        return ''
      }
    },
    mounted: function () {},
    created: function () {}
  }
</script>
<style scoped>
  .company-list {
    min-height: 100px;
  }
  .select-header {
    display: grid;
    grid-template-columns: 50% 25% 25%;
  }
</style>
