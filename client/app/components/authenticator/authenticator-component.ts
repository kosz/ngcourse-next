import {Inject} from 'utils/di';
import {AuthenticationStore} from 'stores/authentication/authentication-store';

export class AuthenticatorComponent {

  private static selector = 'ngc-authenticator';
  private static options = {
    transclude: true
  };
  private static template = `
    <ngc-login-form
      ng-hide="ctrl.user.isAuthenticated"
      on-submit="ctrl.login(data)"
      error-message="ctrl.errorMessage">
    </ngc-login-form>

    <div class="clearfix white bg-blue"
      ng-show="ctrl.user.isAuthenticated">
      <div class="left col-4 aqua">
        <p class="btn py2 m0 truncate"><i class="fa fa-bolt px1"></i> Hello, <span>{{ctrl.users[ctrl.user.data.username].displayName}}</span>!</p>
      </div>
      <div class="right">
        <a class="btn py2 m0"
          ui-sref="tasks.add">
          <i class="fa fa-plus-circle"></i> Add Task
        </a>
        <a class="btn py2 m0"
          href="#"
          ng-click="ctrl.logout()">
          Logout
        </a>
      </div>
    </div>

    <div class="px2"
      ng-show="ctrl.user.isAuthenticated"
      ng-transclude>
    </div>
  `;

  private user;
  private users;
  private errorMessage;

  constructor(
    @Inject('$log') private $log,
    @Inject('authenticationStore') private authenticationStore,
    @Inject('authenticationActions') private authenticationActions,
    @Inject('usersStore') private usersStore) {

    this.users = usersStore.currentUsers;
    this.user = authenticationStore.currentUser;

    this.authenticationStore.getUserObservable
      .subscribe(
        (newUser) => this.user = newUser,
        (error) => this.errorMessage = error.data);

    this.usersStore.getUsersObservable
      .subscribe(
        (users) => this.users = users,
        (error) => this.errorMessage = error);
  }

  private login(form) {
    this.authenticationActions.login(form);
  }

  private logout() {
    this.authenticationActions.logout();
  }
}