export default class ToDoController {
  constructor($scope, $routeParams, $filter, ToDoStorage) {
    'use strict';

    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.$filter = $filter;
    this.ToDoStorage = ToDoStorage;

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
  }

  addTodo() {
    var newTodo = {
      title: this.$scope.newTodo.trim(),
      completed: false
    };

    if (!newTodo.title) {
      return;
    }

    this.$scope.saving = true;

     
    this.ToDoStorage.insert(newTodo)
      .then(this.clearToDoInput.bind(this))
      .finally(this.stopSaving.bind(this));
  };
  
  clearToDoInput(){
     this.$scope.newTodo = '';
   }
   
  stopSaving(){
     this.$scope.saving = false;
   }
   
  editTodo(todo) {
    this.$scope.editedTodo = todo;
    // Clone the original todo to restore it on demand.
    this.$scope.originalTodo = angular.extend({}, todo);
  };

  saveEdits(todo, event) {
    // Blur events are automatically triggered after the form submit event.
    // This does some unfortunate logic handling to prevent saving twice.
    if (event === 'blur' && this.$scope.saveEvent === 'submit') {
      this.$scope.saveEvent = null;
      return;
    }

    this.$scope.saveEvent = event;

    if (this.$scope.reverted) {
      // Todo edits were reverted-- don't save.
      this.$scope.reverted = null;
      return;
    }

    todo.title = todo.title.trim();

    if (todo.title === this.$scope.originalTodo.title) {
      this.$scope.editedTodo = null;
      return;
    }

    this.ToDoStorage[todo.title ? 'put' : 'delete'](todo)
      .then(function success() {}, function error() {
        todo.title = this.$scope.originalTodo.title;
      })
      .finally(function() {
        this.$scope.editedTodo = null;
      });
  }

  revertEdits(todo) {
    this.todos[this.todos.indexOf(todo)] = this.$scope.originalTodo;
    this.$scope.editedTodo = null;
    this.$scope.originalTodo = null;
    this.$scope.reverted = true;
  }

  removeTodo(todo) {
    this.ToDoStorage.delete(todo);
  }

  saveTodo(todo) {
    this.ToDoStorage.put(todo);
  }

  toggleCompleted(todo, completed) {
    if (angular.isDefined(completed)) {
      todo.completed = completed;
    }
    this.ToDoStorage.put(todo, this.todos.indexOf(todo))
      .then(function success() {}, function error() {
        todo.completed = !todo.completed;
      });
  }

  clearCompletedTodos() {
    this.ToDoStorage.clearCompleted();
  };

  markAll(completed) {
    this.todos.forEach(function(todo) {
      if (todo.completed !== completed) {
        this.$scope.toggleCompleted(todo, completed);
      }
    });
  };
}
