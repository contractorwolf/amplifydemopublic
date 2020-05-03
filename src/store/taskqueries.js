// type Task @model @auth(rules: [{ allow: owner }]) {
//     id: ID!
//     title: String!
//     status: TaskStatus!
//     createdAt: String
//     updatedAt: String
//   }
//
//   enum TaskStatus {
//     NotStarted
//     InProgress
//     Testing
//     Completed
//   }
  
export default {
    addTask(task) {
      const query = `
          mutation createTask {
              createTask(
                  input: {
                      title: "${task.title}"
                      status: ${task.status}
                  }
              ) {
                    id
                    title
                    status
                    createdAt
                    updatedAt
              }
          }
      `;
      return query;
    },
    listTasks() {
      const query = `
          query {
              listTasks {
                  items {
                      id
                      title
                      status
                      createdAt
                      updatedAt
                  }
              }
          }
      `;
      return query;
    },
    deleteTask(task){
        let query = `
            mutation deleteTask{
                deleteTask(
                    input: {
                        id: "${ task.id }"
                    }
                ) {
                    id
                    title
                }
            }
        `
        return query;
    },
    updateTask(task){
        let query = `
        mutation updateTask {
            updateTask(
                input:{
                    id: "${task.id}"
                    title: "${task.title}"
                    status: ${task.status}
                }
            ) {
                id
                title
                status
                createdAt
                updatedAt
            }
        }	
        `
        return query;
    },
  };