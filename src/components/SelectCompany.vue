<template xmlns="http://www.w3.org/1999/html">
  <div class="select-company">
    <div class="ui segment">
      <div class="ui block header"><i class="building icon"></i>Firma</div>
      <div class="ui middle aligned selection animated list company-list">
      <div v-for="item in companies" class="item" v-bind:class="selectedClass(item.id)" @click="select(item.id)">
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

  export default {
    name: 'selectcompany',
    data () {
      return {}
    },
    props: {
      name: {
        default: null
      }
    },
    components: {
      // Foo
    },
    computed: {
      ...mapGetters({
        companies: 'GET_COMPANIES',
        selectedCompany: 'GET_SELECTED_COMPANY'
      })
    },
    methods: {
      ...mapMutations({
        setSelectedCompany: 'SET_SELECTED_COMPANY'
      }),
      ...mapActions({}),
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
</style>
