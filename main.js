var toDoListArray = [];
var taskArray = [];
var searchButton = document.querySelector('.header__search--button');
var searchInput = document.querySelector('.header__search--input');
var taskTitleInput = document.getElementById('aside__input--title');
var taskItemInput = document.querySelector('.aside__input--item');
var taskItemBtn = document.querySelector('.aside__add-item--btn');
var makeListBtn = document.getElementById('aside__make-task-list-button');
var clearAllBtn = document.getElementById('aside__clear--btn');
var filterUrgBtn = document.getElementById('filter__urg--btn');
var newTaskItemArea = document.getElementById('section__ul--task');
var asideTaskForm = document.querySelector('.aside__section--top');
var main = document.querySelector('.main__card--field');
var taskMessage = document.querySelector('.make__list--message');

makeListBtn.addEventListener('click', handleMakeTaskCard);
clearAllBtn.addEventListener('click', clearAllForm);
filterUrgBtn.addEventListener('click', urgencyFilter);
asideTaskForm.addEventListener('click', handleTaskForm);
asideTaskForm.addEventListener('click', handleFormBtns);
main.addEventListener('click', handleCard);

function handleTaskForm(e) {

}

function handleCard(e) {
  taskMessage(e);
}

        // ********Phase One
// 1. List cards on page when user clicks Make Task List Button
// 1.a queryselect all inputs and button
// 1.b addeventlister for buttons

//*******/New Task Item
// 1. checklist in between the Task Title and Task Item inputs
// 1.a each item should be able to be deleted(delete.svg)
// 1.b task CAN NOT be added if item input is empty
// 1.c checklist DOES NOT need to persist

// ******Make Task List
// 1. Get new task card to adhear
// 1.a The text fields and checklist in the form CLEARED
// 1.b Make Task List button disabled if both inputs empty
// 1.c page should NOT reload
// 1.d card should persist and The todo should be added to localStorage using the saveToStorage method defined in the ToDoList class.
function clearFormInputs() {
  taskTitleInput.value && taskListInput.value === "";
}

// ******Clear All
// 1. both inputs should be cleared
// 1.a only displayed if both the title input and checklist are empty.
        // ********Buttons
// 2. Make Task List btn for 'commiting' checklist
// 3. Clear All button clears title and checklist
// 4. Filter btn filters list that have been marked urgent



function taskMessage(e) {
  taskListArray.length === 0 ? taskMessage.classList.remove('hidden') : taskMessage.classList.add('hidden');
}
  
function generateToDoList() {
  main.insertAdjacentHTML('afterbegin',
      `<article class="task__card">
      <header class="article__header">
        <h3 contenteditable="true">Task Title</h3>
      </header>
      <output class="output__lists--tasks">
        <ul class="output__ul">
          <li>
          <p class="output__a-text" contenteditable="true">
          </li>
        </ul>
      </output>
      <footer>
        <form class="article__form--urgent"alt="lighting strike to mark urgency" class="article__iurgent--svg">
          <img src="images/urgent.svg">
          <p>URGENT</p>
        </form>
        <form class="article__form--delete" alt="round button with 'X' to delete" class="article__delete--svg" disabled>
          <img src="images/delete.svg" id="delete-id">
          <p>DELETE</p>
        </form>
      </footer>
    </article>`);
  }

  