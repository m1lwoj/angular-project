export default function routes($stateProvider) {
  $stateProvider
    .state('todo', {
      url: '/',
      template: require('./todo.html'),
      controller: 'ToDoController',
      controllerAs: 'todo'
//       resolve: {
// 				store: function (ToDoStorage) {
// 					// Get the correct module (API or localStorage).
// 					return ToDoStorage.GetStorage().then(function (module) {
// 						module.GetStorage().get(); // Fetch the todo records in the background.
// 						return module;
// 					});
// 				}
// 			}
    });
}