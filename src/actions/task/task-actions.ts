/// <reference path="../../../typings/tsd.d.ts" />
import {Inject} from 'utils/di';
import {TASK_ACTIONS} from 'constants/action-constants';

export class TaskActions {

  constructor(@Inject private dispatcher) {
    this.dispatcher = dispatcher;
  }

  getTasks() {
    this.dispatcher.onNext({
      actionType: TASK_ACTIONS.GET_TASKS
    });
  }
  
  addTask(newTask) {
    this.dispatcher.onNext({
      actionType: TASK_ACTIONS.ADD_TASK,
      newTask: newTask
    });
  }
  
  updateTask(task) {
    this.dispatcher.onNext({
      actionType: TASK_ACTIONS.UPDATE_TASK,
      task: task
    });
  }
  
  deleteTask(task) {
    this.dispatcher.onNext({
      actionType: TASK_ACTIONS.DELETE_TASK,
      task: task
    });
  }
}
