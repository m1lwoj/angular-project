import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngRoute from 'angular-route';

import routing from './login.routes';
import LoginController from './login.controller';

import LoginStorage from './login.service';

export default angular.module('app.login', [uirouter, ngRoute])
  .config(routing)
  .service('LoginStorage', LoginStorage)
  .controller('LoginController', LoginController)
  .name;