export default class ToDoController {
  constructor($scope, $stateParams, $filter, ToDoStorage) {
  
    'use strict';
  
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$filter = $filter;
    this.ToDoStorage = ToDoStorage;
    this.$scope.todos = ToDoStorage.todos;

    $scope.newTodo = '';
    $scope.editedTodo = null;
    $scope.remainingCount = 0;

    $scope.$watch('todos', this.watchHandler.bind(this), true);

    // Monitor the current route for changes and adjust the filter accordingly.
    $scope.$on('$stateChangeSuccess', this.filterWithStatus.bind(this));
  }

  test() {
    alert('test2');
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

    // this.clearToDoInput();
    // this.stopSaving();
  };

  filterWithStatus() {
    var status = this.$scope.status = this.$stateParams.status || '';
    this.$scope.statusFilter = (status === 'active') ? {
      completed: false
    } : (status === 'completed') ? {
      completed: true
    } : {};
  }

  watchHandler() {
    this.$scope.remainingCount = this.$filter('filter')(this.$scope.todos, {
      completed: false
    }).length;
    this.$scope.completedCount = this.$scope.todos.length - this.$scope.remainingCount;
    this.$scope.allChecked = !this.$scope.remainingCount;
  }

  clearToDoInput() {
    this.$scope.todos = this.ToDoStorage.todos;
    this.$scope.newTodo = '';
  }

  stopSaving() {
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
    alert('c');
    this.ToDoStorage.delete(todo);
  }

  saveTodo(todo) {
    this.ToDoStorage.put(todo);
  }

  toggleCompleted(todo, completed) {
    if (angular.isDefined(completed)) {
      todo.completed = completed;
    }
    this.ToDoStorage.put(todo, this.ToDoStorage.todos.indexOf(todo))
      .then(function success() {}, function error() {
        todo.completed = !todo.completed;
      });
  }

  clearCompletedTodos() {
    this.ToDoStorage.clearCompleted();
  }

  changeStatus(status) {
    this.$scope.status = status;
  }

  markAll(completed) {
    this.$scope.todos.forEach(
      this.toggleItem.bind(this, completed)
    );
  }

  toggleItem(completed, todo, index) {
    if (todo.completed !== completed) {
      this.toggleCompleted(todo, completed);
    }
  }
}
