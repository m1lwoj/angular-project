export default class ToDoLocalStorageService {
	constructor($q, $firebaseArray) {
		this.$q = $q;
		this.STORAGE_ID = 'todos-angularjs';
		this.firebaseArray = $firebaseArray;
		this.todos = this._getFromLocalStorage();


		// this.notes.$loaded()
		// 	.then(function(aa) {
		// 		console.log(aa);
		// 	})
		// 	.catch(function(err) {
		// 		console.error(err);
		// 	});

	}

	_getFromLocalStorage() {
		let ref = new Firebase("https://todo-project.firebaseio.com/tasks");
		return this.firebaseArray(ref);


		// return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
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

		this.todos.$remove(todo);

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

		this.todos.$add(todo);
		
		deferred.resolve(this.todos);

		return deferred.promise;
	}

	put(todo, index) {
		var deferred = this.$q.defer();

		this.todos[index] = todo;

		deferred.resolve(this.todos);

		return deferred.promise;
	}
}