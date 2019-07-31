class ToDoList {
    constructor(id, title, urgent, tasks){
      this.id = id
      this.title = title
      this.urgent = urgent || false;
      this.tasks = tasks || [];
    }
  
    saveToStorage(toDoListArray) {
      localStorage.setItem('taskLists',JSON.stringify(toDoListArray));
    }
  
    deleteFromStorage(index) {
        toDoListArray.splice(index, 1);
        this.saveToStorage(toDoListArray);   
    }
  
    updateToDo(toDoListArray, toDoIndex) {
      this.urgent = !this.urgent;
      this.saveToStorage(toDoListArray, toDoIndex);
      return this.urgent;
    }
  
    updateTask(toDoListArray, taskId) {
      this.tasks[taskId] = !this.tasks[taskId];
      this.saveToStorage(toDoListArray, taskId);
    }
  }