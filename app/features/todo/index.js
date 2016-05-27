import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngRoute from 'angular-route';
import 'firebase';
import angularFire from 'angularfire';
import routing from './todo.routes';
import ToDoController from './todo.controller';

import LoginStorage from '../login/login.service'
import ToDoStorage from './todolocalstorage.service';
import todoCounter from './directives/todo_counter';
import todoFilter from './directives/todo_filter';
import todoForm from './directives/todo_form';
import todoTasks from './directives/todo_tasks';

export default angular.module('app.todo', [uirouter, ngRoute, angularFire])
  .config(routing)
  .service('ToDoStorage', ToDoStorage)
  .service('LoginStorage', LoginStorage)
  .controller('ToDoController', ToDoController)
  .directive('todoCounter', todoCounter)
  .directive('todoFilter', todoFilter)
  .directive('todoForm', todoForm)
  .directive('todoTasks', todoTasks)
  .name;