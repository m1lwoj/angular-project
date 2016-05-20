export default function routes($stateProvider) {
  $stateProvider
    .state('todo', {
      url: '/',
      template: require('./todo.html'),
      controller: 'ToDoController',
      controllerAs: 'todo'
    });
}