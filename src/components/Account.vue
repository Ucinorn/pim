<template>
	<div id="account">
		<transition name="fade">
			<div id="login" v-if="loginOpen">
        <form @submit.prevent="wantsToSignUp ? signUpWithPassword() : signInWithPassword()" class="auth-form">
        <h1>{{wantsToSignUp ? 'Sign up' : 'Sign in'}}</h1>
        <div>
          <label for="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Email" required="required" v-model="email"/>
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" required="required" v-model="password" placeholder="Password"/>
        </div>
        <div v-show="wantsToSignUp">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" name="confirm-password" id="confirm-password" v-model="confirmPassword" placeholder="Confirm Password"/>
        </div>
        <div v-show="!wantsToSignUp" class="clearfix btn-group">
          <button type="submit">Sign in</button>
          <button type="button" @click="wantsToSignUp = true">Sign up</button>
        </div>
        <div v-show="wantsToSignUp">
          <button type="submit" class="signup-submit">Sign up</button>
        </div>
        <div v-if="loadingLogin">
            loading....
        </div>
        </form>
			</div>
		</transition>
  </div>
</template>

<script>
import fb from '../scripts/db.js'
var auth = fb.auth();
export default {
  data () {
    return {
			type: '',
			loginOpen: false,
      email: '',
      password: '',
      confirmPassword: '',
      wantsToSignUp: false,
      authenticated: false,
			loading: false,
			loadingLogin: false
    }
  },
	events: {
        showMessage: function (text, type) {
            this.message = text;
        },
    },
	beforeRouteUpdate (to, from, next) {
		this.closeMessage();
	},
  methods: {
		closeMessage() {
			this.message = "";	
			this.type = "";
		},
    signUpWithPassword () {
			this.loadingLogin = true;
      if (this.password === this.confirmPassword) {
        auth.createUserWithEmailAndPassword(this.email, this.password)
          .then((userData) => this.signInWithPassword())                                              // signIn
          .then(() => console.log("Success!"))
          .catch((error) => console.log("Something went wrong with . Error:" + error))
			}				 
    },
    signInWithPassword () {
      return auth.signInWithEmailAndPassword(this.email, this.password)
        .then((userData) => {
          console.log("Signed In Successfully");
          this.onSignedIn()
          return userData
        })
       .catch((error) => console.log("Something went wrong with signing in. Error:" + error))
    },
    onSignedIn () {
      this.close();
      this.authenticated = true;
    },
		open () {
			this.loadingLogin = true;
		}, 
		close () {
			this.loadingLogin = false;
		}
  }
}
</script>
<style>

</style>