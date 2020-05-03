<template>
    <form>
        <div class="container border">
            <div class="row">
                <div class="col-lg-7 col-8 title-label-col">
                    <div class="form-group">
                        <label for="title" class="form-label title-label"><i>new task</i></label>
                        <input class="form-control form-main-input" type="text" id="title">
                    </div>
                </div>
                <div class="col-lg-2 col-4 status-label-col">
                    <div class="form-group">
                        <label for="status" class="form-label status-label"><i>status</i></label>
                        <select class="form-control" id="status">
                            <option v-for="(item,index) in options" :key="index" :value="item.value">{{item.display}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-3 col-12 add-button-col">
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary create-task-btn"
                            @click.prevent="saveTask">Create Task</button>     
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
export default {
  name: 'create-task',
  data: function () {
    return {
      options: []
    }
  },
  created(){
      this.options.push({value:'NotStarted', display: 'Not Started'});        
      this.options.push({value:'InProgress', display: 'In Progress'});
      this.options.push({value:'Testing', display: 'Testing'});
      this.options.push({value:'Completed', display: 'Completed'});
  },
  methods: {
    saveTask(event) {
      const newtask = {};
      newtask.title = event.target.form.title.value;
      newtask.status = event.target.form.status.value;
      this.$store.dispatch('addTask', newtask);
      event.target.form.title.value = '';
    },
  },
};
</script>

<style scoped>
.create-task-btn {
    width: 150px;
}

.form-group { 
    margin-bottom: 5px;
}
.form-control {
    font-size: 14px;
}

.row {
    padding: 8px;
}

.title-label-col {
    text-align: left;
    padding-right: 0;
    padding-left: 0;
}

.title-label {
    margin-bottom: 0;
}

.status-label-col {
    text-align: left;
    padding-left: 4px;
    padding-right: 0;
}

.status-label {
    margin-bottom: 0;
}
    
.add-button-col {
    padding-top: 24px;
    padding-right: 0;
    padding-left: 4px;
}

@media only screen and (max-width: 768px) {
    .add-button-col {
        padding-top: 4px;
        padding-right: 0;
        padding-left: 0;
    }
    .create-task-btn {
      width: 100%;
    }
}
</style>
