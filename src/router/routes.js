const routes = [{
  // catch-all to redirect to home view if no route matched
  path: '*',
  redirect: '/uccx-12-5/'
}, {
  // the home page
  name: 'Home',
  path: '/uccx-12-5/',
  component: () => import(`../views/home.vue`)
}]
export default routes