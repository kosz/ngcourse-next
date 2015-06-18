import {Inject} from 'utils/di';

class LoginFormComponent {
  
  private static selector = 'ngc-login-form';
  private static options = {
    scope: {
      errorMessage: '=',
      fireSubmit: '&onSubmit'
    }
  };
  private static template = `
    <form
      class="login"
      name = "loginFormCtrl.form"
      novalidate
      >
      Enter username:
      <input
        ng-model="ctrl.username"
        name="username"
        ng-pattern="/^[a-z]+$/"
        required> <br>
      Password:
      <input
        type="password"
        ng-model="ctrl.password"
        name="password"
        required > <br>
    
      <div ng-show="ctrl.errorMessage" > {{ ctrl.errorMessage }}</div>
      <button
        id="login-button"
        ng-click="ctrl.submit()"
        ng-disabled="loginFormCtrl.form.$invalid"
        >
          Login
      </button>
    </form>
    `;
  
  private errorMessage;
  private username;
  private password;
  private fireSubmit: Function;
  
  constructor() {
    //
  }
  
  private submit() {
    var form = {
      data: this
    };
    console.log('form sent:', form);
    this.fireSubmit(form);
  }
}