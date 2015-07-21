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

      <div class="mt4 mb4" ui-view="actionArea"></div>

      <header class="flex mb4 header">
        <i class="h1 fa fa-bullseye fa-5x mr2 blue"></i>
        <div class="flex-auto">
          <h3 class="mb0 mt1 caps">
            {{ ctrl.users[ctrl.user.data.username].displayName }}
          </h3>
          <p class="h1 mb0">We've Got {{ctrl.tasks.length}} Tasks</p>
        </div>
      </header>

      <div class="md-col-8 mx-auto rounded tasks-list mb4">
        <div class="flex flex-center py1"
          ng-class="{ 'border-bottom': !$last }"
          ng-repeat="task in ctrl.tasks">
          <i class="fa px3 py2"
            ng-class="{
              'fa-square-o': !task.done,
              'fa-check-square': task.done
            }"></i>
          <div class="flex-auto">
            <p class="m0 h6 gray">
              {{ ctrl.users[task.owner].displayName || 'Owner not specified' }}
            </p>
            <p class="m0">{{task.description}}</p>
          </div>

          <a ng-show="task.can.edit"
            ui-sref="tasks.details({_id: task._id})">
            <i class="fa fa-pencil-square px3 py2 gray"></i>
          </a>
        </div>
      </div>

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