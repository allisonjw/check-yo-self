class ToDoList {
    constructor(obj){
      this.id = obj.id
      this.title = obj.title
      this.urgent = obj.urgent || false;
      this.tasks = obj.tasks|| [];
    }
  
    saveToStorage(toDoListArray) {
      var saveToDos = JSON.stringify(toDoListArray)
      localStorage.setItem('taskLists', saveToDos);
    }
  
    deleteFromStorage(index) {
        toDoListArray.splice(index, 1);
        this.saveToStorage(toDoListArray);   
    }
  
    updateToDo(toDoListArray, toDoIndex) {
      this.urgent = !this.urgent;
      this.saveToStorage(toDoListArray, toDoIndex);
    }
  
    updateTask(toDoListArray, taskindex) {
      this.tasks[taskindex].completed = !this.tasks[taskindex].completed;
      this.saveToStorage(toDoListArray);
    }
  }