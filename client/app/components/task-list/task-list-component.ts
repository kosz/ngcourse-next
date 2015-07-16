/// <reference path="../../../../typings/tsd.d.ts" />
import {Inject} from 'utils/di';
import {AuthenticationStore} from 'stores/authentication/authentication-store';
import {UsersStore} from 'stores/users/users-store';
import {TasksStore} from 'stores/tasks/tasks-store';
import 'rx';

export class TaskListComponent {

  private static selector = 'ngc-tasks';
  private static options = {
    replace: true
  };
  private static template = `
    <div>
      {{ctrl.users[ctrl.user.data.username].displayName}}, we've got {{ctrl.tasks.length}} tasks
      <br/>
      <div ui-view="actionArea"></div>
      <table>
        <tr>
          <th>Owner</th>
          <th>Task description</th>
        </tr>
        <tr ng-repeat="task in ctrl.tasks">
          <td>{{ctrl.users[task.owner].displayName}}</td>
          <td>{{task.description}}</td>
          <td><a ng-show="task.can.edit" ui-sref="tasks.details({_id: task._id})">edit</a>
          </td>
        </tr>
      </table>
    </div>
    `;

  private tasks;
  private users;
  private user;
  private errorMessage;

  constructor(
    @Inject('$log') private $log,
    @Inject('router') private router,
    @Inject('authenticationStore') private authenticationStore: AuthenticationStore,
    @Inject('tasksStore') private tasksStore: TasksStore,
    @Inject('usersStore') private usersStore: UsersStore,
    @Inject('tasksActions') private tasksActions
    ) {
      
      this.tasks = tasksStore.currentTasks;
      this.users = usersStore.currentUsers;
      this.user = authenticationStore.currentUser;
      
      this.authenticationStore.getUserObservable
        .subscribe(
          (user) => this.user = user,
          (error) => this.errorMessage = error
        );
        
      this.tasksStore.getTasksObservable
        .subscribe(
          (tasks) => this.tasks = tasks,
          (error) => this.errorMessage = error
        );
      
      this.usersStore.getUsersObservable
        .subscribe(
          (users) => this.users = users,
          (error) => this.errorMessage = error
        );
  }
  
  private goToAddTask() {
    this.router.goToAddTask.bind(this.router);
  }
};

        // <ngc-task
        //   ng-repeat="task in ctrl.tasks"
        //   task="task" 
        //   display-name="ctrl.usersByUsername[task.owner].displayName">
        // </ngc-task>
        
        
        // <tr ng-repeat="task in ctrl.tasks">
        //   <td>{{ctrl.usersByUsername[task.owner].displayName}}</td>
        //   <td>{{task.description}}</td>
        //   <td><a ng-show="task.can.edit" ui-sref="tasks.details({_id: task._id})">edit</a>
        //   </td>
        // </tr>