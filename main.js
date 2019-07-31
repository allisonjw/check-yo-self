var toDoListArray = [];
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

reinstantiateCards();
reDisplayCards();


addTaskItemBtn.addEventListener('click', createTask);
asideTaskForm.addEventListener('click', removeCreateTask);
makeCardBtn.addEventListener('click', makeTasksArray);
taskTitleInput.addEventListener('keyup', handleFormBtns);
taskItemInput.addEventListener('keyup', handleFormBtns);
clearAllBtn.addEventListener('click', clearFormInputs);
main.addEventListener('click', handleCard);

function reinstantiateCards() {
  if (JSON.parse(localStorage.getItem('taskLists')) === null) {
   return;
  } else {
  var newArray = JSON.parse(localStorage.getItem('taskLists')).map(function(array) {
  return new ToDoList(array.id, array.title, array.urgent, array.tasks);
  });
   toDoListArray = newArray;
}
}

function reDisplayCards() {
  for (var i = 0; i < toDoListArray.length; i++) {
   displayCard(toDoListArray[i]);
  }
}

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
  makeCardBtn.disabled = true;
  clearAllBtn.disabled = true;
  addTaskItemBtn.disabled = true;
}

function createTask() {
  var id = Date.now();
  var ul = document.querySelector('#section__ul--task');
  var possibleItem = `<li class="aside__add--item" data-id=${id}> 
  <img src="images/delete.svg" class="aside__delete-list-item">
  <p class="article__output--p" contenteditable="true">${taskItemInput.value}</p>
  </li>`
  ul.insertAdjacentHTML('beforeend', possibleItem);
  taskItemInput.value = "";
  makeCardBtn.disabled = false;
} 

function makeToDoList(e, taskItems) {
  var toDo = new ToDoList(Date.now(), taskTitleInput.value, false, taskItems);
  toDoListArray.push(toDo);
  toDo.saveToStorage(toDoListArray);
  displayCard(toDo);
  clearFormInputs(e);
}

function makeTasksArray(e) {
  var newTasks = document.querySelectorAll('.aside__add--item');
  var tasksArray = Array.from(newTasks);
  for (var i = 0; i < tasksArray.length; i++) {
  var newTask = tasksArray[i].innerText;
  taskItems.push({complete: false, task: `${newTask}`, id: Date.now()});
}
makeToDoList(e, taskItems);
};

function removeCreateTask(e) {
  if (e.target.classList.contains('aside__delete-list-item')) {
     e.target.closest("li").remove();
  }
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
  var addListArray = [];
  var listItems = '';
  for (var i = 0; i < toDo.tasks.length; i++) {
    var checkbox = toDo.tasks[i].complete ? 'checkbox-active.svg' : 'checkbox.svg';
    var checkboxText = toDo.tasks[i].complete ? 'checkbox-text-active' : 'checkbox-text-inactive';
    addListArray.push(`
    <li class="aside__add--item" data-id=${[i]}> 
      <img class=".article__image--checkbox" src="images/${checkbox}">
      <p class="article__output--p ${checkboxText}" contenteditable="true">${toDo.tasks[i].task}</p>
    </li>`);
  }
  for (var i = 0; i < addListArray.length; i++) {
    listItems += addListArray[i];
  }
  return listItems;
};
  
function handleCard(e) {
  deleteCard(e);
  toggleUrgent(e);
  updateCompletedButton(e);
}

function getTaskId(e) {
  return e.target.closest('li').getAttribute('data-id');
}

function findTaskIndex(id) {
  return taskItems.findIndex(function(arrayObj) {
  return arrayObj.id == parseInt(id);
  });
}

function getToDoId(e) {   
 return e.target.closest('.task__card').getAttribute('data-id');
  
}

function findToDoIndex(id) {  
  return toDoListArray.findIndex(function(array) {
  return array.id == parseInt(id);
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
    var check = toDoObject.tasks[taskIndex] ? 'images/checkbox-active.svg' : 'images/checkbox.svg';
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







