	<template  id="productList" >
			<div class="six columns" style="margin-top: 25px">
				<h4>Product List</h4>
				<ul>
					<button v-on:click="create()">+ Add Product</button>
					<li v-for="product in products" :key="product['.key']">
						<span>{{product.name}} - {{product.sku}}</span>
						<button v-on:click="edit(product)">Edit</button>
						<button v-on:click="remove(product)">X</button>
					</li>
				</ul>
			</div>
</template>
<script>
export default {
	data: function() {
		return {
      products: {},
			state: {}
		}
	},
	created: function() {
		this.loading = true;
	},
	methods: {
		create: function() {
			console.log("creating");
			var product = {}
			this.edit(product);
		},
		edit: function(product) {
			this.state.editing = true;
			this.product = product;
		},
		remove: function(sku) {

		}
	}
}
</script>