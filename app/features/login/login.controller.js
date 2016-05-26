export default class LoginController {
  constructor(LoginStorage, $location) {
 
    'use strict';

    this.LoginStorage = LoginStorage;
    this.email = LoginStorage.email;
    this.location = $location;
  }

  login() {
    this.LoginStorage.insert(this.email);
    this.location.path('/tasks/active').replace();
  }
}
