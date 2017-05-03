<template>
  <div id="example">
		<div class="col-xs-6 col-sm">
		</div>
    <div>
     {{data}} 
    </div>
  </div>
</template>

<script>  
import fb from '../scripts/db.js'
var db = fb.database();
	
export default {
		name: 'example',
		data() {
			return {
				loading: true,
				data: [],
			}
		},
		created() {
			var user = firebase.auth().currentUser;
				if (user) {
          this.uid = user.uid;
					this.getUserData(user.email)
				} else {
					// No user is signed in.
				}
		},
		methods: {
			getUserData(email) {
				this.loading = true;
				this.error = false;
				var self = this;
				var route = '/userdata/' + email.replaceAll('.', '%2E').toString();
				console.log(route);
				var userData = db.ref(route);
				userData.on('value', function(snapshot) {
					self.data = snapshot;
				});
			},
		}
}
</script>

<style>

</style>