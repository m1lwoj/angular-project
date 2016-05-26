export default class LoginController {
  constructor(LoginStorage) {
 
    'use strict';

    this.LoginStorage = LoginStorage;
    this.email = LoginStorage.email;
  }

  login() {
    this.LoginStorage.insert(this.email);
  }
}
