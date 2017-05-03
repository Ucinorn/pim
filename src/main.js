
/*
Import packages
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

/*
Link Vue to any modules we have imported
*/
Vue.use(VueRouter);

/*
Retrieve list of vue componenent objects
*/
import mainView from './App.vue'
import viewList from './components/viewList.vue'
import viewDetails from './components/viewDetails.vue'
import productList from './components/productList.vue'
import productDetails from './components/productDetails.vue'
import Account from './components/Account.vue'


const routes = [
  { path: '/', component: mainView, children: [  
		    {
          path: 'products',
          component: productList
        },   
				{
          path: 'products/:sku',
          component: getView('productDetails') 
        },    
				{
          path: 'account',
          component: Account,
					auth: true
        }
      ]
    }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * @param  {string}   name     the filename (basename) of the view to load.
 */
function getView(name) {
    return function(resolve) {
        require(['./components/' + name + '.vue'], resolve);
    }
}

const router = new VueRouter({
  routes: routes
})
 
router.afterEach((to, from, next) => {
  console.log("successfully routed to : " + to.path + " from " + from.path)
})
	
/**
 * Check each route for authorisation before entering.
 */
router.beforeEach((to, from, next) => {
  console.log("routing to : " + to.path + " from " + from.path)
	if (to.auth && !firebase.getAuth()) {
    next('/account')
  } else {
    next()
  }
})

const app = new Vue({
  router
}).$mount('#app')
