import {Inject} from 'utils/di';

export class TaskListComponent {

  private static selector = 'ngc-tasks';
  private static options = {};
  private static template = `
    <div>
      {{main.userDisplayName}}, we've got {{ctrl.tasks.length}} tasks
      <br/>
      <div ui-view="actionArea"></div>
      <table>
        <tr>
          <th>Owner</th>
          <th>Task description</th>
        </tr>
        <tr ng-repeat="task in ctrl.tasks">
          <td>{{task.owner}}</td>
          <td>{{task.description}}</td>
          <td><a ng-show="task.can.edit" ui-sref="tasks.details({_id: task._id})">edit</a>
          </td>
        </tr>
      </table>
    </div>
    `;

  private tasks;
  private addTask;
  private name;

  constructor(
    @Inject('$log') private $log,
    @Inject('router') private router,
    @Inject('tasksStore') private tasksStore,
    @Inject('tasksActions') private tasksActions) {

    this.tasksStore.getTasksObservable()
      .subscribe((tasks) => {
        this.tasks = tasks.toJS();
      });

    this.tasksActions.updateTasks();
  }
  
  private goToAddTask() {
    this.router.goToAddTask.bind(this.router);
  }
};