import {Inject} from 'utils/di';

export class TaskEditComponent {

  private static selector = 'ngc-task-edit';
  private static options = {};
  private static template = `
   <div class="sm-col-8 mx-auto border rounded">
    <div class="p2 gray bg-darken-1">
      <h4 class="m0 caps">Edit Task</h4>
    </div>
    <form class="p2 bg-white">
      <label>Owner</label>
      <input class="block col-12 mb1 field"
        type="text"
        ng-model="ctrl.task.owner">
      <label>Description</label>
      <input class="block col-12 mb2 field"
        type="text"
        ng-model="ctrl.task.description">
      <button class="btn btn-primary"
        ng-click="ctrl.updateTask(ctrl.task)">
        Update
      </button>
      <button class="btn btn-primary bg-gray"
        ng-click="ctrl.cancel()">
        Cancel
      </button>
    </form>
  </div>
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