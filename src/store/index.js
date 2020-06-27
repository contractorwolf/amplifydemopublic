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
      state.tasks.push(task);      
      state.tasks = state.tasks.sort(function(a, b){ 
        return new Date(a.createdAt) - new Date(b.createdAt); 
      }); 
    },
    GET_TASKS(state, tasks) {
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
      Vue.set(state.tasks, index, task)
    },
  },
  actions: {
    async addTask(context, task) {
      const data = await API.graphql(graphqlOperation(taskqueries.addTask(task)));
      window.console.log(data);
      task = data.data.createTask;
      context.commit('ADD_TASK', task);
    },
    async updateTask(context, task) {
      const data = await API.graphql(graphqlOperation(taskqueries.updateTask(task)));
      window.console.log(data);
      task = data.data.updateTask;      
      context.commit('UPDATE_TASK', task);
    },

    async deleteTask(context, task) {
      const data = await API.graphql(graphqlOperation(taskqueries.deleteTask(task)));
      window.console.log(data);
      context.commit('DELETE_TASK', task);
    },

    async getTasks(context) {
      const data = await API.graphql(graphqlOperation(taskqueries.listTasks()));
      window.console.log(data);
      context.commit('GET_TASKS', data.data.listTasks.items);
    },
  },
  getters: {
    Tasks(state) { return state.tasks; },
  },
});
