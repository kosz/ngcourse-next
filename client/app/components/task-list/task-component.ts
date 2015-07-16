/// <reference path="../../../../typings/tsd.d.ts" />
import {Inject} from 'utils/di';
import {UsersStore} from 'stores/users/users-store';
import {TasksStore} from 'stores/tasks/tasks-store';
import 'rx';

export class TaskComponent {

  private static selector = 'ngc-task';
  private static options = {
    replace: true,
    scope: {
      task: '=',
      displayName: '='
    }
  };
  private static template = `
    <tr>
      <td>{{ctrl.displayName}}</td>
      <td>{{ctrl.task.description}}</td>
      <td><a ng-show="ctrl.task.can.edit" ui-sref="tasks.details({_id: task._id})">edit</a>
      </td>
    </tr>     
  `;

  private task;
  private errorMessage;

  constructor(
    @Inject('$log') private $log,
    @Inject('router') private router
    ) {
    this.$log.log('task-component');
  }
};