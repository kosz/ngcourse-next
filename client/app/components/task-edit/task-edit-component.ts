import {Inject} from 'utils/di';

export class TaskEditComponent {

  private static selector = 'ngc-task-edit';
  private static templateUrl = '/dist/components/task-edit/task-edit-component.html';
  private static options = {};

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