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
    @Inject('$http') private $http,
    @Inject('$log') private $log,
    @Inject('tasks') private tasks,
    @Inject('$stateParams') private $stateParams,
    @Inject('router') private router
  ) {

    this.tasks.getTask(this.$stateParams._id)
      .then((response) => this.task = response)
      .then(null, this.$log.error);
  }

  updateTask(task) {
    this.tasks.updateTask(task)
      .then(this.router.goToTaskList.bind(this.router))
      .then(null, this.$log.error);
  }
  
  cancel() {
    this.router.goToTaskList();
  }
}