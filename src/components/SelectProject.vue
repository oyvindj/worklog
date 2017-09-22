<template xmlns="http://www.w3.org/1999/html">
  <div class="navbar">
    <div class="ui segment">
      <div class="ui middle aligned selection animated list">
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

  export default {
    name: 'selectproject',
    data () {
      return {
        id: null
      }
    },
    props: {
      companyId: {
        default: null
      }
    },
    components: {
      // Foo
    },
    computed: {
      ...mapGetters({
        projects: 'GET_PROJECTS'
      })
    },
    methods: {
      ...mapMutations({}),
      ...mapActions({
        loadProjects: 'LOAD_PROJECTS'
      }),
      select (id) {
        console.log('selecting id: ' + id)
        this.id = id
      },
      selectedClass (id) {
        if (id === this.id) {
          console.log('active id: ' + id)
          return 'active'
        }
        return ''
      }
    },
    mounted: function () {
      this.loadProjects(this.companyId)
    },
    created: function () {}
  }
</script>
<style scoped>
</style>
