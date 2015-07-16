import {Inject} from 'utils/di';

export class TaskAddComponent {

  private static selector = 'ngc-task-add';
  private static options = {};
  private static template = `
    <input ng-model="newTask.owner" placeholder="Owner"/> <br/>
    <input ng-model="newTask.description" placeholder="Description"/><br/>
    <button ng-click="ctrl.save(newTask)">Save</button>
    <button ng-click="ctrl.cancel()">Cancel</button>
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