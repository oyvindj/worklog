<!-- PS: THIS FILE IS NOT IN USE IN THE PROJECT -->

<template xmlns="http://www.w3.org/1999/html">
  <div class="select-item">
    <modal v-model="showCreateModal">
      <p slot="header">Skriv inn navn</p>
      <div slot="content" class="work-form">
        <div class="ui labeled input form-row" v-bind:class="errorClass('name')">
          <div class="ui label">Navn</div>
          <input v-model="name" placeholder="navn">
        </div>
      </div>
      <template slot="actions">
        <div class="ui black deny button" @click="showCreateModal=false">Avbryt</div>
        <div class="ui positive right button" @click="confirmCreateItem()">Lagre</div>
      </template>
    </modal>
    <div class="ui segment">
      <div class="ui block header select-header">
        <div><i class="building icon"></i> <span>Item</span></div>
        <div class="add-link"><i class="add circle icon"></i><a @click="submitCreateItem()">Legg til</a></div>
        <div v-if="!isEdit" class="add-link"><i class="edit icon"></i><a @click="isEdit = true">Rediger</a></div>
        <div v-if="isEdit" class="add-link"><i class="edit icon"></i><a @click="isEdit = false">Ferdig</a></div>
      </div>
      <div class="ui middle aligned selection animated list item-list">
      <div v-for="item in items" class="item" v-bind:class="selectedClass(item.id)" @click="select(item.id)">
        <div class="content item-content" v-bind:class="selectedClass(item.id)" @click="select(item.id)">
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
    name: 'selectablelist',
    data () {
      return {
        name: '',
        isEdit: false,
        showCreateModal: false
      }
    },
    props: {
      paramValue: {
        default: null
      },
      paramName: {
        default: null
      },
      items: {},
      loader: {},
      deleter: {},
      selector: {},
      creater: {}
    },
    components: {
      modal
    },
    computed: {
      ...mapGetters({
        // selectedItem: this.getItemsName
        selectedItem: 'GET_SELECTED_PROJECT'
      })
    },
    methods: {
      confirmCreateItem () {
        const item = {
          name: this.name
        }
        item[this.paramName] = this.paramValue
        const success = (item) => {
          console.log('item created...')
          this.loadItems(this.paramValue)
        }
        const error = (item) => {
          console.log('error item create: ' + item)
        }
        this.createItem({data: item, success: success, error: error})
        this.showCreateModal = false
      },
      submitCreateItem () {
        this.showCreateModal = true
      },
      submitDelete (id) {
        this.deleteItem({id: id, success: (item) => this.loadItems(this.paramValue), error: (i) => {}})
      },
      ...mapMutations({
        // setSelectedItem: ('SET_' + this.selector)
        setSelectedItem: 'SET_SELECTED_PROJECT'
      }),
      ...mapActions({
        // createItem: this.creater,
        // loadItems: this.loader,
        // deleteItem: this.deleter
        createItem: 'CREATE_PROJECT',
        loadItems: 'LOAD_PROJECTS',
        deleteItem: 'DELETE_PROJECT'
      }),
      select (id) {
        console.log('selecting id: ' + id)
        this.setSelectedItem(id)
      },
      selectedClass (id) {
        if (id === this.selectedItem) {
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
      if (this.paramValue !== null) {
        this.loadItems(this.paramValue)
      }
    },
    created: function () {},
    watch: {
      'paramValue': function () {
        this.loadItems(this.paramValue)
      }
    }
  }
</script>
<style scoped>
  .select-item {
    display: flex;
    flex-direction: column;
  }
  .select-header {
    display: grid;
    grid-template-columns: 50% 25% 25%;
  }
  .item-list {
    min-height: 100px;
  }
  .item-content {
    display: grid;
    grid-template-columns: 80% 20%;
  }
</style>
