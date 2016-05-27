export default class LoginService {
  constructor($q) {
		this.$q = $q;
		this.STORAGE_ID = 'todo-email';
		this.email = this._getFromLocalStorage();
	}

	_getFromLocalStorage() {
		return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
	}

	_saveToLocalStorage(todos) {
		localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
	}
	
	
	get() {
		var deferred = this.$q.defer();

		angular.copy(this._getFromLocalStorage(), this.email);
		deferred.resolve(this.email);

		return deferred.promise;
	}

	insert(email) {
		var deferred = this.$q.defer();

		this.email = email;

		this._saveToLocalStorage(this.email);
		deferred.resolve(this.email);

		return deferred.promise;
	}
}