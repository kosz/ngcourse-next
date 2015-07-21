import {Inject} from 'utils/di';

export class TaskAddComponent {

  private static selector = 'ngc-task-add';
  private static options = {};
  private static template = `
    <div class="sm-col-8 mx-auto border rounded">
      <div class="p2 gray bg-darken-1">
        <h4 class="m0 caps">Add Task</h4>
      </div>
      <form class="p2 bg-white">
        <label>Owner</label>
        <input class="block col-12 mb1 field"
          type="text"
          ng-model="newTask.owner">
        <label>Description</label>
        <input class="block col-12 mb2 field"
          type="text"
          ng-model="newTask.description">
        <button class="btn btn-primary"
          ng-click="ctrl.save(newTask)">
          Save
        </button>
        <button class="btn btn-primary bg-gray"
          ng-click="ctrl.cancel()">
          Cancel
        </button>
      </form>
     </div>
  `;

  constructor(
    @Inject('$log') private $log,
    @Inject('router') private router,
    @Inject('tasksActions') private tasksActions
   ) {
     //
  }

  save(task) {
    this.tasksActions.addTask(task);
    this.router.goToTaskList();
  }

  cancel() {
    this.router.goToTaskList();
  }
}