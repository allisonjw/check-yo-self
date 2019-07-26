class ToDoList {
    constructor(id, title, tasksArray, urgency){
      this.id = id
      this.title = title
      this.urgent = urgency || false;
      this.tasks = tasksArray || [];
    }
  
    saveToStorage() {
    }
  
    deleteFromStorage(){
    }
  
    updateToDo(){
    }
  
    updateTask(){
    }
  }