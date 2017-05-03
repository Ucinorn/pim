<template>
	<div id="mainview">
    <div class="row">
			<div class="col-xs-12 col-sm middle-xs">
				<router-link to="/">HOME</router-link>
			</div>
			<div class="col-xs-12 col-sm">
				<router-link to="products">Products</router-link>
			</div>
			<div class="col-xs-12 col-sm">
				<router-link to="account">Account</router-link>
			</div>
		</div>
		<transition name="fade">
      <div id="message" v-bind:class="[type]" v-if="message != ''">{{message}}</div>
		</transition>
    	<router-view></router-view>
  </div>
</template>
<script>
import Firebase from 'firebase'	
import db from './scripts/db.js'	

export default {
 data () {
    return {
			message: '',
			type: '',
      authenticated: false,
			loading: false,
    }
  },
		created: function() {
		this.loading = true;
    var uid = firebase.auth().currentUser.uid;
		var ref = db.ref(uid + "/products/");
			
			ref.on("value", function(snapshot) {
        console.log(snapshot.val());
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
			
      ref.on("value", function(snapshot) {
        console.log(snapshot.val());
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
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
  }
}
</script>
<style>
</style>