<template>
  <section>
    <div>
      <div>
        <nuxt-link to="/protected">Protected</nuxt-link>
        <nuxt-link v-if="uid" to="/auth/signin">Logout</nuxt-link>
        <nuxt-link v-else to="/auth/signin">Sign In</nuxt-link>
      </div>
      <p>
        Unprotected page --- anyone can see this
      </p>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('modules/user', [
        'uid'
      ])
    }
  }
</script>

<style>
  a {
    padding: 5px;
  }
</style>
