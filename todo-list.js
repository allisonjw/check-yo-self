class ToDoList {
    constructor(id, title, urgent, taskItems){
      this.id = id
      this.title = title
      this.urgent = urgent || false;
      this.tasks = taskItems || [];
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
    }
  
    updateTask(toDoListArray, taskId) {
      this.tasks[taskId] = !this.tasks[taskId];
      this.saveToStorage(toDoListArray, taskId);
    }
  }