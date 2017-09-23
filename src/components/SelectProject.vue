<template xmlns="http://www.w3.org/1999/html">
  <div class="select-project">
    <div class="ui segment">
      <div class="ui block header">
        <i class="building icon"></i> Prosjekt <a @click="submitCreateProject()">Legg til</a>
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

  export default {
    name: 'selectproject',
    data () {
      return {}
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
        projects: 'GET_PROJECTS',
        selectedCompany: 'GET_SELECTED_COMPANY',
        selectedProject: 'GET_SELECTED_PROJECT'
      })
    },
    methods: {
      ...mapMutations({
        setSelectedProject: 'SET_SELECTED_PROJECT'
      }),
      ...mapActions({
        loadProjects: 'LOAD_PROJECTS'
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
  .project-list {
    min-height: 100px;
  }
</style>
