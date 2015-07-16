import {Inject} from 'utils/di';

export class TaskEditComponent {

  private static selector = 'ngc-task-edit';
  private static options = {};
  private static template = `
    <input ng-model="ctrl.task.owner" placeholder="Owner" /> <br/>
    <input ng-model="ctrl.task.description" placeholder="Description"/> <br/>
    <button ng-click="ctrl.updateTask(ctrl.task)">Update</button>
    <button ng-click="ctrl.cancel()">Cancel</button>
  `;

  private task;

  constructor(
    @Inject('$log') private $log,
    @Inject('tasksActions') private tasksActions,
    @Inject('tasksStore') private tasksStore,
    @Inject('$stateParams') private $stateParams,
    @Inject('router') private router
  ) {

    this.task = this.tasksStore.getTaskById(
      this.$stateParams._id);
  }

  updateTask(task) {
    this.tasksActions.updateTask(task);
    this.router.goToTaskList();
  }
  
  cancel() {
    this.router.goToTaskList();
  }
}