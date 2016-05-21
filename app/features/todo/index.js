import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './todo.routes';
import ToDoController from './todo.controller';

import ToDoStorage from './todolocalstorage.service';


export default angular.module('app.home', [uirouter, 'ngRoute', 'ngResource'])
  .config(routing)
  .controller('ToDoController', ToDoController)
  .factory('ToDoStorage', ToDoStorage.prototype.getStorage)
  // .factory('ToDoLocalStorage', ToDoLocalStorageService)
  // .factory('ToDoApiStorage', ToDoApiStorageService)
  // .factory('ToDoStorage',localstorage) 
  .name;
 