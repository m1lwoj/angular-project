export default class ToDoLocalStorageService {
  constructor($q) {
		this.$q = $q;
		this.STORAGE_ID = 'todos-angularjs';
		this.todos = new Array();
	}

	_getFromLocalStorage() {
		return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
	}

	_saveToLocalStorage(todos) {
		localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
	}

	clearCompleted() {
		var deferred = this.$q.defer();

		var incompleteTodos = this.todos.filter(function(todo) {
			return !todo.completed;
		});

		angular.copy(incompleteTodos, this.todos);

		this._saveToLocalStorage(this.todos);
		deferred.resolve(this.todos);

		return deferred.promise;
	}

	delete(todo) {
		var deferred = this.$q.defer();

		this.todos.splice(this.todos.indexOf(todo), 1);

		this._saveToLocalStorage(this.todos);
		deferred.resolve(this.todos);

		return deferred.promise;
	}

	get() {
		var deferred = this.$q.defer();

		angular.copy(this._getFromLocalStorage(), this.todos);
		deferred.resolve(this.todos);

		return deferred.promise;
	}

	insert(todo) {
		var deferred = this.$q.defer();

		this.todos.push(todo);

		this._saveToLocalStorage(this.todos);
		deferred.resolve(this.todos);

		return deferred.promise;
	}

	put(todo, index) {
		var deferred = this.$q.defer();

		this.todos[index] = todo;

		this._saveToLocalStorage(this.todos);
		deferred.resolve(this.todos);

		return deferred.promise;
	}
}