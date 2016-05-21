export default class ToDoStorageService {
      constructor($http, $injector) {
    this.$http = $http;
    this.$injector = $injector;
  }

  getStorage() {
 		return this.$http.get('/api')
			.then(function () {
				return this.$injector.get('api');
			}, function () {
				return this.$injector.get('localStorage');
			});
  }
}
