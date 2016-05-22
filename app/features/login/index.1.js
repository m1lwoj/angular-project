import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngRoute from 'angular-route';

import routing from './todo.routes';
import ToDoController from './todo.controller';

import ToDoStorage from './todolocalstorage.service';

export default angular.module('app.home', [uirouter, ngRoute])
  .config(routing)
  .service('ToDoStorage', ToDoStorage)
  .controller('ToDoController', ToDoController)
  .name;