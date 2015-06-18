/// <reference path="../../../typings/tsd.d.ts" />

import {Inject, getServices} from 'utils/di';
import {TODO_ACTIONS} from 'constants/action-constants';

export class TasksActions {

  constructor(@Inject private dispatcher) {
    this.dispatcher = dispatcher;
  }

  updateTasks() {
    this.dispatcher.onNext({
      actionType: TODO_ACTIONS.UPDATE_TASKS
    });
  }
  
  addTask(newTask) {
    this.dispatcher.onNext({
      actionType: TODO_ACTIONS.ADD_TASK,
      newTask: newTask
    });
  }
}
