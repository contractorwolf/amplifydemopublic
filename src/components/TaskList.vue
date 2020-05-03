<template>
  <div class="container">
    <TaskItem v-for="(task, index) in this.$store.getters.Tasks" v-bind:key="task.id"
        @deleteTask="deleteTask"
        :task="task"
        :index="index"
    />
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue';

export default {
  name: 'tasklist',
  components: {
    TaskItem,
  },
  created() {
    this.$store.dispatch('getTasks');
  },
  methods: {
    deleteTask(task) {
        this.$store.dispatch('deleteTask', task);
    },
  },
};
</script>

<style scoped>
</style>