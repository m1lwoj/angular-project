export default class ToDoController {
  constructor() {
    alert('tu');
    this.name = 'todo';
    // this.scope = $scope;
    // this.store = store;
  }

  TodoCtrl($scope, $routeParams, $filter, ToDoStorage) {
    'use strict';

    var todos = $scope.todos = ToDoStorage.todos;

    $scope.newTodo = '';
    $scope.editedTodo = null;

    $scope.$watch('todos', function() {
      $scope.remainingCount = $filter('filter')(todos, {
        completed: false
      }).length;
      $scope.completedCount = todos.length - $scope.remainingCount;
      $scope.allChecked = !$scope.remainingCount;
    }, true);

    // Monitor the current route for changes and adjust the filter accordingly.
    $scope.$on('$routeChangeSuccess', function() {
      var status = $scope.status = $routeParams.status || '';
      $scope.statusFilter = (status === 'active') ? {
        completed: false
      } : (status === 'completed') ? {
        completed: true
      } : {};
    });

    $scope.addTodo = function() {
      var newTodo = {
        title: $scope.newTodo.trim(),
        completed: false
      };

      if (!newTodo.title) {
        return;
      }

      $scope.saving = true;
      ToDoStorage.insert(newTodo)
        .then(function success() {
          $scope.newTodo = '';
        })
        .finally(function() {
          $scope.saving = false;
        });
    };

    $scope.editTodo = function(todo) {
      $scope.editedTodo = todo;
      // Clone the original todo to restore it on demand.
      $scope.originalTodo = angular.extend({}, todo);
    };

    $scope.saveEdits = function(todo, event) {
      // Blur events are automatically triggered after the form submit event.
      // This does some unfortunate logic handling to prevent saving twice.
      if (event === 'blur' && $scope.saveEvent === 'submit') {
        $scope.saveEvent = null;
        return;
      }

      $scope.saveEvent = event;

      if ($scope.reverted) {
        // Todo edits were reverted-- don't save.
        $scope.reverted = null;
        return;
      }

      todo.title = todo.title.trim();

      if (todo.title === $scope.originalTodo.title) {
        $scope.editedTodo = null;
        return;
      }

      ToDoStorage[todo.title ? 'put' : 'delete'](todo)
        .then(function success() {}, function error() {
          todo.title = $scope.originalTodo.title;
        })
        .finally(function() {
          $scope.editedTodo = null;
        });
    };

    $scope.revertEdits = function(todo) {
      todos[todos.indexOf(todo)] = $scope.originalTodo;
      $scope.editedTodo = null;
      $scope.originalTodo = null;
      $scope.reverted = true;
    };

    $scope.removeTodo = function(todo) {
      ToDoStorage.delete(todo);
    };

    $scope.saveTodo = function(todo) {
      ToDoStorage.put(todo);
    };

    $scope.toggleCompleted = function(todo, completed) {
      if (angular.isDefined(completed)) {
        todo.completed = completed;
      }
      ToDoStorage.put(todo, todos.indexOf(todo))
        .then(function success() {}, function error() {
          todo.completed = !todo.completed;
        });
    };

    $scope.clearCompletedTodos = function() {
      ToDoStorage.clearCompleted();
    };

    $scope.markAll = function(completed) {
      todos.forEach(function(todo) {
        if (todo.completed !== completed) {
          $scope.toggleCompleted(todo, completed);
        }
      });
    };
  }
}