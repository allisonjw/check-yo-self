class ToDoList {
    constructor(obj){
      this.id = obj.id
      this.title = obj.title
      this.urgent = obj.urgent || false;
      this.tasks = obj.tasks|| [];
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
  
    updateTask(toDoListArray, index) {
      this.tasks[index].completed = !this.tasks[index].completed;
      this.saveToStorage(toDoListArray);
    }
  }