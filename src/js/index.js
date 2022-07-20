'use strict';

const TODOS_KEY = 'todos';
let TODOS = [
    // {       
    //     "id": 1,
    //     "userName": 'Ervin Howell',
    //     "title": "delectus aut autem",
    //     "description": "ije;fahcoujfcuvhfailvhf",
    //     "time": "17:30",
    //     "completed": false
    //   }
];


//Создание часов//
let clock = document.querySelector('.clock');

function setTimeAtModal() {
    let date = new Date();
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

    return clock.innerHTML = `${hour}:${min}`;
}

function timeUpdate() {
    let date = new Date();
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    // let sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(); 

    clock.innerHTML = `${hour}:${min}`;
}
    setInterval(timeUpdate, 1000);


//Открытие модального окна для создания задачи//
const addUserBtn = document.getElementById('add-todo-btn');
const onAdd = () => {
    const addUserWindow = document.getElementById('modal-window-added');
    addUserWindow.classList.remove('hidden');
}
addUserBtn.addEventListener('click', () => { onAdd()});


//Закрытие модального окна для создания задачи//
const cancelBtn = document.getElementById('cancel-button');
const onCancel = () =>{
    const addUserWindow = document.getElementById('modal-window-added');
    addUserWindow.classList.add('hidden');  
};
cancelBtn.addEventListener('click', () =>{ onCancel()});


//Подгрузка Users с сервера и отрисовка в модальном окне//
const urlUsers = 'https://jsonplaceholder.typicode.com/users';
let users;
const selectUser = document.getElementById('responsible-user');
const selectLabel = document.getElementById('responsible-user-label');

fetch (urlUsers)
    .then(response => response.json())
    .then(json => {
        users = json;              

        users.forEach((user) => {   
            selectUser.add(
                new Option(user.name, user.name));
               
        });
    });

//Создание одного todo//

const todoTitleInput = document.getElementById('todo-title');
const todoDescriptionInput = document.getElementById('todo-description');
const ResponsUser = document.getElementById('responsible-user');
const todoConteiner = document.getElementById('todo-tasks');
let userTitleInput = '';
let userTodoInput = '';
let userNameSelect = '';

const todosWrapper = document.createElement('div');
todosWrapper.className = 'todos-wrapper';
todoConteiner.append(todosWrapper);


const createButton = (text, className) => {
    const button = document.createElement('button');
    const textName = document.createTextNode(text);
    button.className = className;
    button.append(textName);

    return button;
} 

const createTodo = (todo) =>{
    const todoWrapper = document.createElement('div');
    const todoHeader = document.createElement('div');
    const todoTitle = document.createElement('h3');
    const todoTitleText = document.createTextNode(todo.title);
    const todoHeaderBtn = document.createElement('div');
    const editBtn = createButton ("Edit", "edit-btn");
    const deleteBtn = createButton ("Delete", "delete-btn");  

    todoWrapper.className = "todo-wrapper";
    todoWrapper.id = `todo-${todo.id}`;
    todoWrapper.setAttribute('draggable', true);

    todoHeader.className = "todo-header";
    todoTitle.className = "todo-title";
    todoHeaderBtn.className = "todo-header-btns";
    editBtn.id = `eddit-${todo.id}`;
    deleteBtn.id =`delete-${todo.id}`;

    const todoContent = document.createElement('div');
    const todoDescription = document.createElement('p');
    const todoDescriptionText = document.createTextNode(todo.description);
    const arrowBtn = createButton (">", "arrow-btn");

    todoContent.className = "todo-content";
    todoDescription.className = "todo-description";
    arrowBtn.className = "arrow-btn";
    arrowBtn.id = `arrow-${todo.id}`;  

    const todoFooter = document.createElement('div');
    const todoResponsibleUser = document.createElement('p');
    const todoResponsibleUserName = document.createTextNode(todo.userName);
    const todoTime = document.createElement('p');
    const todoTimeText = document.createTextNode(setTimeAtModal());

    todoFooter.className = "todo-footer";
    todoResponsibleUser.className = "todo-responsible-user";
    todoTime.className = "todo-time";

    todoTitle.append(todoTitleText);
    todoHeaderBtn.append(editBtn);
    todoHeaderBtn.append(deleteBtn);
    todoHeader.append(todoTitle);
    todoHeader.append(todoHeaderBtn); 

    todoDescription.append(todoDescriptionText);  
    todoContent.append(todoDescription);
    todoContent.append(arrowBtn);  
   
    todoResponsibleUser.append(todoResponsibleUserName);
    todoTime.append(todoTimeText);
    todoFooter.append(todoResponsibleUser);
    todoFooter.append(todoTime);

    todoWrapper.append(todoHeader);
    todoWrapper.append(todoContent);
    todoWrapper.append(todoFooter);

    
    return todoWrapper
}

TODOS.forEach(todo =>{
    todosWrapper.append(createTodo(todo));
    localStorage.getItem('todoKey');   
})

todoTitleInput.addEventListener('change', (e) =>{
     userTitleInput = e.target.value;     
});
todoDescriptionInput.addEventListener('change', (e) =>{
    userTodoInput = e.target.value;     
});
ResponsUser.addEventListener('change', (e) =>{
    userNameSelect = e.target.value;     
});


const addedConfirmBtn = document.getElementById('confirm-button');
addedConfirmBtn.addEventListener('click',function () {
    if (userTodoInput){
        const todos = Object.values(todosWrapper.childNodes);
        const newTodo = createTodo({id: (new Date).valueOf(), userName: userNameSelect, title: userTitleInput, description: userTodoInput, time:"00:00", completed: false }); 
        // todos.unshift(newTodo);
        todosWrapper.replaceChildren();
    
        todos.forEach(todo => {
            todosWrapper.append(todo);
        });
        todos.forEach(el => {
            const elementId = document.getElementById(`${el.id}`);
            elementId.ondragstart = drag;
        });

        todoTitleInput.value = '';
        userTitleInput = '';
        todoDescriptionInput.value = '';
        userTodoInput = '';
        ResponsUser.value = 'Select user';
        userNameSelect = '';   
    } else {
        alert('Please enter a description of the task!')
    }
});

//Реализация Drag & Drop//



const todoColumn = document.querySelector('.column-todo');
const inProgressColumn = document.querySelector('.column-progress');
const doneColumn = document.querySelector('.column-done');


todoColumn.ondragover = allowDrop;
inProgressColumn.ondragover = allowDrop;
doneColumn.ondragover = allowDrop;

function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
}

todoColumn.ondrop = drop;
inProgressColumn.ondrop = drop;
doneColumn.ondrop = drop;
  
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("id");
    ev.target.appendChild(document.getElementById(data));
}









