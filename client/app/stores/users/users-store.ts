/// <reference path="../../../../typings/tsd.d.ts" />
import {Inject, getServices} from 'utils/di';
import {TODO_ACTIONS} from 'constants/action-constants';
import {List} from 'immutable';
import 'rx';

export class UsersStore {
  
  private byUserName: any;
  private usersPromise: any;
  private all: any;

  constructor(
    @Inject('koast') private koast,
    @Inject('$log') private $log,
    @Inject('server') private server
  ) {
    this.byUserName = {};
    this.loadUsers();
  }

  private loadUsers () {
    this.usersPromise = this.koast.user.whenAuthenticated()
      .then(() => this.server.queryForResources('users'))
      .then((userArray) => (
        this.all = userArray,
        userArray.forEach(
          (user) => user.username && (this.byUserName[user.username] = user)
        )
      ))
      .then(null, this.$log.error);
  }

  public whenReady () {
    return this.usersPromise;
  }

  public getUserByUsername (username) {
    return this.byUserName[username];
  }

  public getUserDisplayName (username) {
    var user = this.getUserByUsername(username);
    if (!user) {
      return '';
    }

    return user.displayName;
  }
}
