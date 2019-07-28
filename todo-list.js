class ToDoList {
    constructor(obj){
      this.id = obj.id
      this.title = obj.title
      this.urgent = obj.urgent || false;
      this.tasks = obj.tasks || [];
    }
  
    saveToStorage(toDoListArray) {
      localStorage.setItem('taskLists',JSON.stringify(toDoListArray));
    }
  
    deleteFromStorage(){
    }
  
    updateToDo(){
    }
  
    updateTask(){
    }
  }