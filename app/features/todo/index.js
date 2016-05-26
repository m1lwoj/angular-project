import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngRoute from 'angular-route';
import 'firebase';
import angularFire from 'angularfire';
import routing from './todo.routes';
import ToDoController from './todo.controller';

import ToDoStorage from './todolocalstorage.service';

export default angular.module('app.todo', [uirouter, ngRoute, angularFire])
  .config(routing)
  .service('ToDoStorage', ToDoStorage)
  .controller('ToDoController', ToDoController)
  .name;