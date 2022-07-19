'use strict';
const TODOS = [
    {       
        "id": 1,
        "userName": 'Ervin Howell',
        "title": "delectus aut autem",
        "description": "ije;fahcoujfcuvhfailvhf",
        "time": "17:30",
        "completed": false
      }
];


//Создание часов//
let clock = document.querySelector('.clock');


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
    const todoText = document.createTextNode(todo.description);
    const edditBtn = createButton ("Eddit", "eddit-todo-btn");

    todoWrapper.className = "todo-wrapper";
    todoWrapper.id = `todo-${todo.id}`;
    edditBtn.className = "todo-btn eddit";
    edditBtn.id = `eddit-${todo.id}`;

    todoWrapper.append(todoText);
    todoWrapper.append(edditBtn);
    todoWrapper.append(edditBtn);

    return todoWrapper
}

TODOS.forEach(todo =>{
    todosWrapper.append(createTodo(todo));     
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
    const todos = Object.values(todosWrapper.childNodes);
    const newTodo = createTodo({id: (new Date).valueOf(), userName: userNameSelect, title: userTitleInput, description: userTodoInput, time:"00:00", completed: false }); 
    todos.unshift(newTodo);
    todosWrapper.replaceChildren();

    todos.forEach(todo => {
        todosWrapper.append(todo);
    })
} )


//Создание карточки todo//







