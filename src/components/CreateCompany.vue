<template xmlns="http://www.w3.org/1999/html">
  <div class="navbar">
    <h3>Opprett Firma</h3>
    <p slot="header">Bekreft Sletting</p>
    <p slot="content">Er du sikker på at du vil slette?</p>
    <div class="work-form">
      <div class="ui labeled input form-row" v-bind:class="errorClass('name')">
        <div class="ui label">Firmanavn</div>
        <input v-model="name" placeholder="firmanavn">
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    name: 'createcompany',
    data () {
      return {
        name: ''
      }
    },
    props: {
      name: {
        default: null
      }
    },
    computed: {
      ...mapGetters({})
    },
    methods: {
      errorClass () {
        return ''
      },
      ...mapMutations({}),
      ...mapActions({})
    },
    mounted: function () {
      // this.loadXXX()
    }
  }
</script>
<style scoped></style>
