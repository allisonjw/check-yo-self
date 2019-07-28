var toDoListArray = [];
var taskArray = [];
var searchButton = document.querySelector('.header__search--button');
var searchInput = document.querySelector('.header__search--input');
var taskTitleInput = document.querySelector('#aside__input--title');
var taskItemInput = document.querySelector('#aside__input--item');
// var possibleTaskList = document.querySelector('#side__ul--new-task');
var addTaskItemBtn = document.querySelector('.aside__add-item--btn');
var makeCardBtn = document.querySelector('#aside__make-task--btn');
var clearAllBtn = document.querySelector('#aside__clear--btn');
var filterUrgBtn = document.querySelector('#filter__urg--btn');
var newTaskItemArea = document.querySelector('#section__ul--task');
var asideTaskForm = document.querySelector('.aside__section--top');
var main = document.querySelector('.main__card--field');
var taskMessage = document.querySelector('.make__list--message');

reinstantiateCards();
reDisplayCards();

addTaskItemBtn.addEventListener('click', createTask);
asideTaskForm.addEventListener('click', removeCreateTask);
makeCardBtn.addEventListener('click', makeToDoCard);
taskTitleInput.addEventListener('keyup', handleFormBtns);
taskItemInput.addEventListener('keyup', handleFormBtns);
clearAllBtn.addEventListener('click', clearFormInputs);
// filterUrgBtn.addEventListener('click', urgencyFilter);
// asideTaskForm.addEventListener('click', handleTaskForm);
// asideTaskForm.addEventListener('click', handleFormBtns);
// main.addEventListener('click', handleCard);
// function handleTaskForm(e) {

// }

function handleCard() {
 
}


function handleFormBtns(e) {
  e.preventDefault;
  var taskItems = document.querySelectorAll('.aside__add--item');
  makeCardBtn.disabled = !taskTitleInput.value || !taskItems.length; 
  clearAllBtn.disabled = !taskTitleInput.value && !taskItemInput.value && !taskItems.length; 
  addTaskItemBtn.disabled = !taskItemInput.value;
}

function clearFormInputs(e) {
  e.preventDefault;
  taskTitleInput.value = "";
  taskItemInput.value = "";
  newTaskItemArea.innerHTML = "";
  handleFormBtns(e);
}

function reinstantiateCards() {
  if (JSON.parse(localStorage.getItem('taskLists')) === null) {
    return;
  } else {
  toDoListArray = JSON.parse(localStorage.getItem('taskLists')).map(function(newObject) {
    return new ToDo(newObject.id, newObject.title, newObject.tasks, newObject.urgent);
    });
    reDisplayCards()
  }
}

function reDisplayCards() {
  for (var i = 0; i < toDoListArray.length; i++) {
   makeToDoCard(toDoListArray[i]);
  }
}

function makeTaskMessage() {
  if (toDoListArray.length === 0) {
    taskMessage.classList.remove('hidden');
}
}


function createTask() {
  var taskId = Date.now()
  var input = taskItemInput.value;
  var possibleTaskList = document.querySelector('#section__ul--task');
  var possibleItem = `<li class="aside__add--item" data-id="${taskId}"> 
  <img src="images/delete.svg" class="aside__delete-list-item"><p class="article__output--p" contenteditable="true">${input}</li>`
  possibleTaskList.insertAdjacentHTML('beforeend', possibleItem);
  taskItemInput.value = "";
  makeCardBtn.disabled = false;
  makeTaskObject(taskId);
  }

function makeTaskObject(e, taskId) {
  e.preventDefault;
  var taskObject = {
     task: taskItemInput.value, 
     taskId: taskId, 
     checked: false
  }
  taskArray.push(taskObject);
  taskItemInput.value = "";
  handleFormBtns(e);
  // createTask(taskId, input);
  }  

function createTasksArray() {
  var objectArray = [];
  var nodeList = document.querySelectorAll('.aside__add--item');
  var tasksArray = Array.from(nodeList);
  for (var i = 0; i < tasksArray.length; i++) {
    var newTask = tasksArray[i].innerText;
    objectArray.push({complete: false, task: `${newTask}`});
  }
  makeToDoListObject(objectArray);
  };

function removeCreateTask(e) {
  if(e.target.classList.contains('aside__delete-list-item')) {
    e.target.closest("li").remove();
  }
} 

   // ********Phase One
// 1. Get new task card to adhear
// 1.a The text fields and checklist in the form CLEARED
// 1.b
// 1.c page should NOT reload
// 1.d card should persist and The todo should be added to localStorage using the saveToStorage method defined in the ToDoList class.
// ******Clear All
// 1. both inputs should be cleared
// 1.a only displayed if both the title input and checklist are empty.
// ********Buttons
// 2. Make Task List btn for 'commiting' checklist
// 3. Clear All button clears title and checklist
// 4. Filter btn filters list that have been marked urgent


function makeToDoListObject() {
  // var taskArray = makeTaskObject();
  var toDo = new ToDoList(Date.now(), taskTitleInput.value, objectArray);
  toDoListArray.push(toDo);
  toDo.saveToStorage(toDoListArray);
  makeToDoCard(toDo);
  clearFormInputs();
}
  
function makeToDoCard(toDo) {
  taskMessage.classList.add('hidden');
  var urgency = toDo.urgency ? 'urgent-active.svg' : 'urgent.svg';
  var urgencyText = toDo.urgency ? 'active' : 'inactive';
  var urgencyBackground = toDo.urgency ? 'background-active' : 'background-inactive';
  var urgencyBorders = toDo.urgency ? 'border-active' : 'border-inactive';
  var listItems = generateTaskInCard(toDo);
  main.insertAdjacentHTML('afterbegin',
      `<article class="task__card ${urgencyBackground}" data-id=${toDo.id}>
      <header class="article__header">
        <h3 contenteditable="true">${toDo.title}</h3>
      </header>
      <output class="output__lists--tasks${urgencyBorders}">
        <ul class="output__ul">
        ${listItems}
        </ul>
      </output>
      <footer>
        <form class="article__form--urgent"alt="lighting strike to mark urgency" class="article__iurgent--svg">
          <img src="images/${urgency}">
          <p class="footer__p--urgent ${urgencyText}">URGENT</p>
        </form>
        <form class="article__form--delete" alt="round button with 'X' to delete" class="article__delete--svg" disabled>
          <img src="images/delete.svg" id="delete-id">
          <p class="footer__p--delete">DELETE</p>
        </form>
      </footer>
    </article>`);
    // makeTaskMessage();
    taskArray = [];
}

function generateTaskInCard(toDo) {
  // debugger;
  console.log('help')
  var addLiArray = [];
  var listItems = '';
  console.log(toDo.tasks)
  for (var i = 0; i < toDo.tasks.length; i++) {
    var checkbox = toDo.tasks[i].checked === true ? 'checkbox-active.svg' : 'checkbox.svg';
    var checkboxText = toDo.tasks[i].checked === true ? 'checkbox-text-active' : 'checkbox-text-inactive';
  addLiArray.push(`<li data-id=${toDo.tasks[i].taskId}>
    <img src="images/${checkbox}" class="main__img--checkbox" alt="checkbox for completed tasks">
    <p class="main__article--p${checkboxText}" contenteditable="true">${toDo.tasks[i].task}</p>
    </li>`);
  }
  for (var i = 0; i < addLiArray.length; i++) {
    listItems += addLiArray[i];
  }
  return listItems;
  };


// var objectTask = '';
// for (var i = 0; i < toDo.tasks.length; i++) {
//   var completeTask = toDo.tasks[i].complete === true ? 'main__template--card--bullet--active' : 'main__template--card--bullet';
//   addLiArray.push(`<li class=${completeTask} data-index=${[i]}>${toDo.tasks[i].task} </li>`);
// }

// for (var i = 0; i < addLiArray.length; i++) {
//   objectTask += addLiArray[i];
// }

// return objectTask;
// };
// var toDoText = "";
// var toDoItems = toDoList.tasks.map(function(tasks, index){
//   if(tasks.complete === false) {
//     return `<li class="main__article--task" data-index=${index}><img class="main__img--checkbox" alt="empty checkbox to complete tasks" src="images/checkbox.svg"><p class="main__article--p" contenteditable="true">${tasks.task}</p></li>`
//   } else if (tasks.complete === true) {
//     return `<li class="main__article--task-complete" data-index=${index}><img class="main__img--checkbox-complete" alt="checkbox for completed tasks" src="images/checkbox-active.svg"><p class="main__article--p complete" contenteditable="true">${tasks.task}</li>`
//   }
// })
// for(var i = 0; i<toDoItems.length; i++) {
//   toDoText += toDoItems[i];
// }
// return toDoText;
// };
// ********PHASE TWO*********
// CHECKING TASK
// 1.After a user has completed a task on their checklist, they should be able to check it off
//  1.a add complete styling to paragraph once checked 
//  1.b checked task persist
//  1.c updateTask method should save changes to storage
//  1.d DOM update should happen in main.js
  

// DELETE TASK
// 2. the user should be able to remove it once they have completed their checklist.
//  2.a disable delete button until all task are complete
//  2.b target the article and closed delete button to delete
//  2.c deleteFromStorage method should be used

// MAKE URGENT
// 3. clicks on the Urgent button, the button should stay in the active state.
//   3.a urgent cards should persist
//   3.b updateToDo method should be used