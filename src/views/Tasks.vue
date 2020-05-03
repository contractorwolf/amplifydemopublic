<template>
  <div class="container">
    <h1>To Do List</h1>
    <TaskList/>
    <CreateTask/>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import TaskList from '../components/TaskList.vue';
import CreateTask from '../components/CreateTask.vue';



export default {
  name: 'tasks',
  components: {
    TaskList,
    CreateTask,
  },
  beforeCreate() {
    Auth.currentAuthenticatedUser().catch(() => { this.$router.push('/unauthorized'); });
  },
};
</script>

<style scoped>
  .container {
    max-width: 650px;
  }
</style>