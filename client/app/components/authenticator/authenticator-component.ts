import {Inject} from 'utils/di';

class AuthenticatorComponent {
  
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
      Hello, <span>{{ctrl.userDisplayName}}</span>!
      <button ng-click="ctrl.logout()">Logout</button>
      <hr>
      <ng-transclude></ng-transclude>
    </div>
  `;
  
  private user: any;
  private userDisplayName: any;
  private errorMessage: any;

  constructor(
    @Inject('$log') private $log,
    @Inject('users') private users,
    @Inject('koast') private koast
  ) {
    this.user = this.koast.user;
    this.koast.user.whenAuthenticated()
        .then(() => this.users.whenReady())
        .then(() => {
          this.userDisplayName = this.users.getUserDisplayName(
            this.koast.user.data.username);
        })
        .then(null, this.$log.error);
  }

  login(form) {
    console.log('form received:', form);
    this.koast.user.loginLocal(form)
      .then(null, this.showLoginError.bind(this));
  }

  logout() {
    this.koast.user.logout()
      .then(null, this.$log.error);
  }

  showLoginError(errorMessage) {
    this.errorMessage = 'Login failed.';
    this.$log.error(errorMessage);
  }
}