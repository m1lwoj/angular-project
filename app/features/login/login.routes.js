export default function routes($stateProvider, $routeProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      template: require('./login.html'),
      controller: 'LoginController',
      controllerAs: 'login'
    })
}