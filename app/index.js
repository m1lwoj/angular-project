// var angular = require('angular');

// import 'bootstrap/dist/css/bootstrap.css';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './config';

import todo from './features/todo';

const ngModule = angular
        .module('app', [
          todo
        ])
        .config(routing);
        
alert(ngModule);