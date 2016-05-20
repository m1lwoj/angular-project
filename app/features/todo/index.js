import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './todo.routes';
import ToDoController from './todo.controller';

export default angular.module('app.home', [uirouter])
  .config(routing)
  .controller('ToDoController', ToDoController)
  .name;
 