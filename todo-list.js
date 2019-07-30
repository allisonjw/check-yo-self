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
  
    updateToDo(toDoListArray, index) {
      this.urgency = !this.urgency;
      this.saveToStorage(toDoListArray);
      return this.urgent;
    }
  
    updateTask(toDoListArray, index) {
      this.tasks[index].checked = !this.tasks[index].checked;
      this.saveToStorage(toDoListArray);
    }
  }