<template>
  <section class="container">
    <div>
      <nuxt-link to="/auth/signin">Already a user? Sign-in</nuxt-link>
    </div>
    <div>
      <form @submit.prevent="signUp">
        <label for="usernameTxt">Username:</label>
        <input id="usernameTxt" type="text" v-model="email">
        <label for="passwordTxt">Password:</label>
        <input id="passwordTxt" type="password" v-model="password">
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </section>
</template>


<script>
import { mapActions } from 'vuex'
import firebaseApp from '~/firebase/app'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('modules/user', [ 'login' ]),
    async signUp () {
      try {
        const firebaseUser = await firebaseApp.auth().createUserWithEmailAndPassword(this.email, this.password)
        await this.writeUserData(firebaseUser.uid, firebaseUser.email)
        await this.login(firebaseUser.uid)
        this.$router.push('/protected')
      } catch (error) {
        console.log(error.message)
      }
    },
    writeUserData (userId, email) {
      return firebaseApp.database().ref('users/' + userId).set({
        email: email
      })
    }
  }
}
</script>

<style scoped>
  form {
    padding: 16px;
  }

  input[type=text], input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  button {
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
  }

  button:hover {
    opacity: 0.8;
  }

  .container {
    padding: 16px;
    max-width: 400px;
  }

</style>

