export default function routes($stateProvider, $routeProvider) {

  $stateProvider
    .state('todo', {
      url: '/tasks/:status',
      template: require('./todo.html'),
      controller: 'ToDoController',
      controllerAs: 'todo'
    })
}