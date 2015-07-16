import {Inject} from 'utils/di';
import {AuthenticationStore} from 'stores/authentication/authentication-store';

export class AuthenticatorComponent {
  
  private static selector = 'ngc-authenticator';
  private static options = {
    transclude: true
  };
  private static template = `
    <div>
    <ngc-login-form
      ng-hide="ctrl.user.isAuthenticated"
      on-submit="ctrl.login(data)"
      error-message="ctrl.errorMessage">
    </ngc-login-form>
    <div ng-show="ctrl.user.isAuthenticated">
      Hello, <span>{{ctrl.users[ctrl.user.data.username].displayName}}</span>!
      <button ng-click="ctrl.logout()">Logout</button>
      <hr>
      <ng-transclude></ng-transclude>
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