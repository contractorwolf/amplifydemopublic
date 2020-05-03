/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

import { API, graphqlOperation } from 'aws-amplify';
import taskqueries from './taskqueries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
  },
  mutations: {
    ADD_TASK(state, task) {
      //task.orderDate = new Date(task.createdAt);
      state.tasks.push(task);      
      state.tasks = state.tasks.sort(function(a, b){ 
        return new Date(a.createdAt) - new Date(b.createdAt); 
      }); 
    },
    GET_TASKS(state, tasks) {
      // add the sort field to keep the display order of tasks
      // tasks.forEach(element => {
      //   element.orderDate = new Date(element.createdAt);
      // });
      tasks = tasks.sort(function(a, b){ 
          return new Date(a.createdAt) - new Date(b.createdAt); 
      }); 

      state.tasks = tasks;
    },
    DELETE_TASK(state, task) {
      state.tasks = state.tasks.filter(p => p.id != task.id);
    },
    UPDATE_TASK(state, task) {
      const index = state.tasks.findIndex((t) => t.id === task.id);
      // //task.orderDate = new Date(task.createdAt);

      // state.tasks = state.tasks.sort(function(a, b){ 
      //   return new Date(a.createdAt) - new Date(b.createdAt); 
      // }); 

      Vue.set(state.tasks, index, task)
    },
  },
  actions: {
    async addTask(context, task) {
      window.console.log('incoming task: ', JSON.stringify(task));
      window.console.log(taskqueries.addTask(task));
      const data = await API.graphql(graphqlOperation(taskqueries.addTask(task)));
      task = data.data.createTask;
      context.commit('ADD_TASK', task);
    },
    async updateTask(context, task) {
      window.console.log('incoming task: ', JSON.stringify(task));
      //window.console.log(taskqueries.updateTask(task));
      const data = await API.graphql(graphqlOperation(taskqueries.updateTask(task)));
      window.console.log('update response: ' + JSON.stringify(data));
      task = data.data.updateTask;      
      context.commit('UPDATE_TASK', task);
    },

    async deleteTask(context, task) {
      window.console.log('incoming task: ', JSON.stringify(task));
      window.console.log(taskqueries.deleteTask(task));
      const data = await API.graphql(graphqlOperation(taskqueries.deleteTask(task)));
      window.console.log('delete response: ' + JSON.stringify(data));
      context.commit('DELETE_TASK', task);
    },

    async getTasks(context) {
      const data = await API.graphql(graphqlOperation(taskqueries.listTasks()));
      context.commit('GET_TASKS', data.data.listTasks.items);
    },
  },
  getters: {
    Tasks(state) { return state.tasks; },
  },
});
