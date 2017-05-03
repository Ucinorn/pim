<template id="productDetails">
<div class="six columns" style="margin-top: 25px" v-if="state.editing">
				<h4>Product List</h4>
				<form v-on:submit.prevent="save(product)" :key="product['.key']">
					<label>{{product['.key']}}</label>
					<template v-for="(att, key) in view.attributes" v-if="key != '.key'">
						<div class="view string" v-if="att.type == 'string'">
							<label>{{key}}</label>
							<input type="text" v-model="product[key]">
						</div>
						<div class="view number" v-if="att.type == 'number'">
							<label>{{key}}</label>
							<input type="number" v-model="product[key]">
						</div>
						<div class="view date" v-if="att.type == 'date'">
							<label>{{key}}</label>
							<input type="date" v-model="product[key]">
						</div>
						<div class="view date" v-if="att.type == 'select'">
							<label>{{key}}</label>
							<select v-model="selected">
								<option v-for="option in att.options" v-bind:value="option">
									{{option}}
								</option>
							</select>
							<input type="select" v-model="product[key]">
						</div>
					</template>
	<template v-for="(value, key) in product" v-if="key != '.key'">
						<div v-if="Object.keys(view.attributes).indexOf(key) == -1">
							<label>{{key}}</label>
							<input type="number" v-model="product[key]">
						</div>
						<div v-if="Object.keys(view.attributes).indexOf(key) == -1">
							<label>{{key}}</label>
							<input type="number" v-model="product[key]">
						</div>
					</template>
	<div>
		<input v-model="newAttribute" v-on:keyup.enter="addAttribute(newAttribute)" placeholder="Add a New Attribute">
		<button>Add</button>
	</div>
	<input type="submit" value="Save">
	</form>
	<button v-on:click="close()">Close - X</button>
	</div>
	</template>
<script>
export default {
	data: function() {
		return {
			product: {
				".key": "",
			},
			view: {
				attributes: {}
			},
			state: {
				editing: false,
				new: false,
			},
			newAttribute: "",
		}
	},

	methods: {
		addAttribute: function(name) {
			console.log('Adding Attribute: ' + name);
			this.product[name] = "";
		},
		save: function(data) {
			console.log('saving product to model');
			var json = (JSON.parse(JSON.stringify(data)))
			var sku = json['.key'];
			delete json['.key'];
			products.child(sku).update(json);
		},
		close: function() {
			this.editing = false;
		}
	}
}
</script>