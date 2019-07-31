var toDoListArray = JSON.parse(localStorage.getItem('taskLists')) || [];
var taskItems = [];

var searchButton = document.querySelector('.header__search--button');
var searchInput = document.querySelector('.header__search--input');
var taskTitleInput = document.querySelector('#aside__input--title');
var taskItemInput = document.querySelector('#aside__input--item');
var addTaskItemBtn = document.querySelector('.aside__add-item--btn');
var makeCardBtn = document.querySelector('#aside__make-task--btn');
var clearAllBtn = document.querySelector('#aside__clear--btn');
var filterUrgBtn = document.querySelector('#filter__urg--btn');
var newTaskItemArea = document.querySelector('#section__ul--task');
var asideTaskForm = document.querySelector('.aside__section--top');
var main = document.querySelector('.main__card--field');
var taskMessage = document.querySelector('.make__list--message');
var deleteImg = document.querySelector('delete__id');


addTaskItemBtn.addEventListener('click', makeTasksObject);
asideTaskForm.addEventListener('click', removeCreateTask);
makeCardBtn.addEventListener('click', saveMakeList);
taskTitleInput.addEventListener('keyup', handleFormBtns);
taskItemInput.addEventListener('keyup', handleFormBtns);
clearAllBtn.addEventListener('click', clearFormInputs);
main.addEventListener('click', handleCard);
window.addEventListener('load', reinstantiateCards(toDoListArray));

function makeTaskMessage() {
  if (toDoListArray.length === 0) {
    taskMessage.classList.remove('hidden');
}
}

function handleFormBtns(e) {
  e.preventDefault();
  var newTaskItems = document.querySelectorAll('.aside__add--item');
  makeCardBtn.disabled = !taskTitleInput.value || !newTaskItems.length; 
  clearAllBtn.disabled = !taskTitleInput.value && !taskItemInput.value && !newTaskItems.length; 
  taskItemInput.value === '' ? addTaskItemBtn.disabled = true: addTaskItemBtn.disabled = false;
  addTaskItemBtn.disabled = !taskItemInput.value;
}

function clearFormInputs(e) {
  e.preventDefault();
  taskTitleInput.value = "";
  taskItemInput.value = "";
  newTaskItemArea.innerHTML = "";
  taskItems = [];
  makeCardBtn.disabled = true;
  clearAllBtn.disabled = true;
  addTaskItemBtn.disabled = true;
}

function makeTasksObject(e) {
  e.preventDefault(e);
  var newTask = {
    id: Date.now(),
    task: taskItemInput.value,
    completed: false
  };
  createTask(newTask);
  taskItems.push(newTask);
  return newTask;
};

function makeToDoList(obj) {
  var toDoId = obj.id;
  var toDoTitle = obj.title;
  var toDoTasks = obj.tasks;
  var toDoUrgent = obj.urgent;
  var newToDo = new ToDoList({
    id: toDoId,
    title: toDoTitle,
    urgent: toDoUrgent,
    tasks: toDoTasks
  });
  displayCard(newToDo);
  return newToDo;
};

function saveMakeList(e) {
  e.preventDefault();
  var newToDo = new ToDoList({
    id: Date.now(),
    title: taskTitleInput.value,
    tasks: taskItems,
    urgent: false
  });
  makeToDoList(newToDo);
  toDoListArray.push(newToDo);
  newToDo.saveToStorage(toDoListArray);
  clearFormInputs(e);
}

function removeCreateTask(e) {
  if (e.target.classList.contains('aside__delete-list-item')) {
    var taskId = getTaskId(e);
    var taskIndex = getTaskId(taskId);
    e.target.closest('.aside__add--item').remove();
    taskItems.splice(taskIndex, 1);
  }
} 

function getTaskId(e) {
  return e.target.closest('.aside__add--item').getAttribute('data-id');
}

function findTaskIndex(id) {
  return taskItems.findIndex(function(arrayObj) {
  return arrayObj.id == parseInt(id);
  });
}

function createTask(task) {
  var taskId = task.id;
  var ul = document.querySelector('#section__ul--task');
  var possibleItem = `<li class="aside__add--item" data-id=${task.id}> 
  <img src="images/delete.svg" class="aside__delete-list-item">
  <p class="article__output--p" contenteditable="true">${task.task}</p>
  </li>`
  ul.insertAdjacentHTML('beforeend', possibleItem);
  taskItemInput.value = "";
  makeCardBtn.disabled = false;
} 

function reinstantiateCards(oldToDos) {
  var newArray = oldToDos.map(function(object) {
    return makeToDoList(object)
  });
   toDoListArray = newArray;
}

function displayCard(toDo) {
  taskMessage.classList.add('hidden');
  var urgent = toDo.urgent ? 'urgent-active.svg' : 'urgent.svg';
  var urgentText = toDo.urgent ? 'active' : 'inactive';
  var urgentBackground = toDo.urgent ? 'background-active' : 'background-inactive';
  var urgentBorders = toDo.urgent ? 'border-active' : 'border-inactive';
  var listItems = generateTaskInCard(toDo);
  main.insertAdjacentHTML('afterbegin',
      `<article class="task__card ${urgentBackground}" data-id=${toDo.id}>
      <header class="article__header">
        <h3 contenteditable="true"> ${toDo.title}</h3>
      </header>
      <output class="output__lists--tasks ${urgentBorders}">
        <ul class="output__ul">
        ${listItems}
        </ul>
      </output>
      <footer>
        <form class="article__form--urgent" alt="lighting strike to mark urgent">
          <img src="images/${urgent}" class="urgent-id">
          <p class="footer__p--urgent ${urgentText}">URGENT</p>
        </form>
        <form class="article__form--delete" alt="round button with 'X' to delete"disabled>
          <img src="images/delete.svg" class="delete-id">
          <p class="footer__p--delete">DELETE</p>
        </form>
      </footer>
    </article>`);
}

function generateTaskInCard(toDo) {
  var listItems = '';
  for (var i = 0; i < toDo.tasks.length; i++) {
    var checkbox = toDo.tasks[i].completed ? 'checkbox-active.svg' : 'checkbox.svg';
    var checkboxText = toDo.tasks[i].completed ? 'checkbox-text-active' : 'checkbox-text-inactive';
    listItems += `
    <li class="aside__add--item" data-id="${toDo.tasks[i].id}"> 
      <img class=".article__image--checkbox" src="images/${checkbox}">
      <p class="article__output--p ${checkboxText}" contenteditable="true">${toDo.tasks[i].task}</p>
    </li>`
 
  }
  return listItems;
};
  
function handleCard(e) {
  deleteCard(e);
  toggleUrgent(e);
  updateCompletedButton(e);
}

function getToDoId(e) {   
 return e.target.closest('.task__card').getAttribute('data-id');
  
}

function findToDoIndex(id) {  
  return toDoListArray.findIndex(function(arrayObj) {
  return arrayObj.id == parseInt(id);
});
}

function updateCompletedButton(e) {
  if (e.target.closest('li img')) {
    var toDoId = getToDoId(e);
    var toDoIndex = findToDoIndex(toDoId);
    var toDoObject = toDoListArray[toDoIndex];
    var taskId = getTaskId(e);
    var taskIndex = findTaskIndex(taskId, toDoObject);
    toDoListArray[toDoIndex].updateTask(toDoListArray, taskIndex);
    var check = toDoObject.tasks[taskIndex].completed ? 'images/checkbox-active.svg' : 'images/checkbox.svg';
    e.target.setAttribute('src', check);
  toggleCheckboxStyle(e);
  }
};  

function toggleCheckboxStyle(e) {
  var checkboxText = e.target.closest('li').querySelector('.article__output--p');       
  checkboxText.classList.toggle('checkbox-text-active');
  checkboxText.classList.toggle('checkbox-text-inactive');
}

function toggleUrgent(e) {
  if (e.target.classList.contains('urgent-id')) {
    var toDoId = getToDoId(e);
    var toDoIndex = findToDoIndex(toDoId);
    toDoListArray[toDoIndex].updateToDo(toDoListArray, toDoIndex);
    var urgent = toDoListArray[toDoIndex].urgent ? 'images/urgent-active.svg' : 'images/urgent.svg';
    e.target.setAttribute('src', urgent);
  toggleUrgentStyle(e, toDoIndex);
  }
}

function toggleUrgentStyle(e) {
  var urgentText = e.target.closest('article').querySelector('.footer__p--urgent');
  var urgentCard = e.target.closest('article');
  var urgentSection = e.target.closest('article').querySelector('.output__lists--tasks');
  urgentText.classList.toggle('active');
  urgentCard.classList.toggle('background-active');
  urgentSection.classList.toggle('border-active'); 
}

function deleteCard(e) {
  if (e.target.classList.contains('delete-id')) {
    var toDoId = getToDoId(e);
    var toDoIndex = findToDoIndex(toDoId);
    e.target.closest('article').remove();
    toDoListArray[toDoIndex].deleteFromStorage(toDoIndex);
  }
  makeTaskMessage();
}







