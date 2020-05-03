<template>
  <div class="main">
    <span v-if="!editMode">
      <div class="row border">
          <div class="col-lg-7 col-12 item-title-col" @click="toggleEdit">
            {{index + 1}}. {{ task.title }}
          </div>
          <div class="col-lg-2 col-7 item-status-col" @click="toggleEdit">
            {{ getOptionDisplay(task.status)}}
          </div>
          <div class="col-lg-3 col-5 item-button-col">
            <button class="btn btn-info" @click.prevent="toggleEdit">edit</button>
            <button class="btn btn-dark button-space" @click.prevent="deleteTask(task)">delete</button>
          </div>
          <div class="col-12">
            <div class="created-date"><br>added: {{ task.createdAt }} - updated: {{task.updatedAt}}</div>
          </div>
      </div>

    </span>
    <span v-else>

     <form>    
      <div class="row">
          <div class="col-lg-7 col-12 edit-title-col">
              <input class="form-control" type="text" id="title" :value="task.title" />
          </div>
          <div class="col-lg-2 col-7 edit-status-col">
              <select class="form-control edit-status" id="status">
                 <option v-for="(item,index) in getStatusList(task.status)" :key="index" :value="item.value">{{item.display}}</option>
              </select>
          </div>
          <div class="col-lg-3 col-5 edit-button-col">
              <button type="submit" class="btn btn-success" @click.prevent="saveTask">save</button> 
              <button class="btn btn-danger button-space" @click.prevent="toggleEdit">cancel</button>
          </div>
          <div class="col-12">
            <div class="created-date"><br>added: {{ task.createdAt }} - updated: {{task.updatedAt}}</div>
          </div>
      </div>
      </form>  
    </span>
  </div>
</template>

<script>



export default {
  name: 'taskitem',
  props: {
    task: Object,
    index: Number,
  },
  components: {
  },
  data: function () {
    return {
      editMode: false,
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
    deleteTask(task) {
      this.$emit('deleteTask', task);
    },
    toggleEdit(){
        this.editMode = !this.editMode;
    },
    saveTask(){
        this.editMode = false;
        const newtask = {};
        newtask.title = event.target.form.title.value;
        newtask.status = event.target.form.status.value;
        newtask.id = this.task.id;
        this.$store.dispatch('updateTask', newtask);
    },
    getStatusList(current){
      let statusList = [];
      statusList.push({value:current, display: this.getOptionDisplay(current)});
      statusList = [...statusList, ...this.options.filter(o => o.value !== current)];
      return statusList;
    },
    getOptionDisplay(currentValue){
      let match = this.options.find(v => v.value === currentValue);
      return match.display;
    }

  },
};
</script>

<style scoped>
.row {
  padding: 4px;
  margin-bottom: 10px;
}
.form-control {
    font-size: 14px;
    font-weight: bold;
}
.edit-title-col {
  text-align: left;
  padding: 0px;
  margin-top: 4px;
  
}
.edit-status-col {
  text-align: left;
  padding: 0px;
  margin-top: 4px;

}
.edit-button-col {
  text-align: right;
  padding: 0px;
  margin-top: 4px;
}
.edit-status {
  margin-left: 4px;
    font-style: italic;
  font-weight: normal;
}
.button-space{
  margin-left: 4px;
}

.item-title-col {
  text-align: left;
  padding: 0 0 0 5px;
  font-weight: bold;
}

.item-status-col {
  text-align: center;
  padding: 0px;
  margin-top: 4px;
  font-style: italic;
}

.item-button-col {
  text-align: right;
  padding: 0px;
  margin-top: 4px;
}

.created-date {
  font-size: 10px;
  color: #cccccc;
  line-height: 7px;
}

@media only screen and (max-width: 768px) {
  .edit-status {
    margin-left: 0px;
  }
  .item-status-col {
    padding: 0 2px 0 2px;
    text-align: left;
  }

  .item-title-col {
    padding: 0 2px 0 2px;
  }
}
</style>