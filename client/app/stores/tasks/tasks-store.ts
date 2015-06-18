/// <reference path="../../../../typings/tsd.d.ts" />
import {Inject, getServices} from 'utils/di';
import {TODO_ACTIONS} from 'constants/action-constants';
import {List} from 'immutable';
import 'rx';

export class TasksStore {

  private tasksObservable;
  private tasks;

  constructor(
    @Inject('$log') private $log, 
    @Inject('server') private server, 
    @Inject('dispatcher') private dispatcher) {

    this.tasks = List();
    this.tasksObservable = new Rx.Subject();

    dispatcher.filter(
      (x) => x.actionType === TODO_ACTIONS.UPDATE_TASKS)
        .subscribe(() => this.updateTasks());

    dispatcher.filter(
      (x) => x.actionType === TODO_ACTIONS.ADD_TASK)
        .subscribe((x) => this.addTask(x.newTask));
  }
  
  public getTasksObservable() {
    return this.tasksObservable;
  }
  
  private updateTasks() {
    this.server.get('tasks').then((data) => {
      this.tasks = List(data);
      this.tasksObservable.onNext(this.tasks);
    })
    .then(null, this.$log.error);
  }

  private addTask(newTask) {
    this.server.post('tasks', newTask).then((data) => {
      this.updateTasks();
    })
    .then(null, this.$log.error);
  }

}
