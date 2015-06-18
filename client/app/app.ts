/// <reference path="../../typings/tsd.d.ts" />
import {TasksStore} from 'stores/tasks/tasks-store';
import {ServerService} from 'services/server/server-service';
import {RouterService, RouterConfig} from 'services/router/router-service';
import {TaskListComponent} from 'components/task-list/task-list-component';
import {TaskAddComponent} from 'components/task-add/task-add-component';
import {TasksActions} from 'actions/task-actions';
import {makeDirective, makeSelector} from 'utils/component-utils';

import 'angular';
import 'rx';
import 'angular-ui-router';

angular.module('ngcourse.router', ['ui.router'])
  .config(RouterConfig)
  .service('router', RouterService);

angular.module('ngcourse.tasks', [])
  .service('tasksStore', TasksStore)
  .service('tasksActions', TasksActions);

angular.module('ngcourse.server', [])
  .service('server', ServerService);
  
angular.module('ngcourse.dispatcher', [])
  .service('dispatcher', Rx.Subject);

angular.module('ngcourse', [
  'ngcourse.tasks',
  'ngcourse.server',
  'ngcourse.router',
  'ngcourse.dispatcher'])
  
  .directive(
    makeSelector(TaskListComponent), 
    makeDirective(TaskListComponent))
  .directive(
    makeSelector(TaskAddComponent), 
    makeDirective(TaskAddComponent))
  
  .constant('API_BASE_URL', 'http://ngcourse.herokuapp.com/api/v1/')
  .run(function ($log) {
    $log.info('All ready!');
  });


angular.element(document).ready(function() {
  angular.bootstrap(document, ['ngcourse']);
});