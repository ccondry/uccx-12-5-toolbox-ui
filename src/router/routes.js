const routes = [{
  // catch-all to redirect to home view if no route matched
  path: '*',
  redirect: '/'
}, {
  // the home page
  name: 'Home',
  path: '/',
  component: () => import(`../views/home.vue`)
}]
export default routes