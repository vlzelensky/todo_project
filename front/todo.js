let todoList = [];
let inputMessage = document.querySelector('.message');
let status = true;
const renderTodoItem = (todoItem) => (
    `
        <div class="new-wrapper" id="${todoItem.id}">
            <div class="checkbox-block">
                <input type="checkbox" class="checkbox-status" ${todoItem.checked ? "checked" : ""}/>
                <div class="strike"></div>
            </div>
            <textarea type="text" class="todo-text" disabled>${todoItem.text}</textarea>
            <button class="edit_todo fas fa-edit" type="button"></button>
            <button class="delete_todo far fa-trash-alt type="button"></button>
        </div>
    `
);

function render() {
    let str = "";
    todoList.forEach((todoItem) => {
        str += renderTodoItem(todoItem);
    });
    document.querySelector(".wrapper").innerHTML = str;
    document.querySelectorAll('.delete_todo').forEach((element) => element.addEventListener('click', deleteTodo));
    document.querySelectorAll('.checkbox-status').forEach((element) => element.addEventListener("click", todoDone));
    document.querySelectorAll('.edit_todo').forEach((element) => element.addEventListener('click', todoEdit));
    document.querySelectorAll('textarea').forEach((element) => element.addEventListener('keydown', setChangesOnEnter));
    document.querySelectorAll('textarea').forEach((element) => element.addEventListener('blur', setPrevValue));
}

async function addTodo() {
    newTask = inputMessage.value.trim();
    if (!newTask) {
        inputMessage.focus();
        return
    }
    await request('/api/task', 'POST', {
        text : newTask,
        checked : false,
    });
    await ready();
    inputMessage.value = '';
    inputMessage.focus();
}

async function deleteTodo() {
    const id = this.parentElement.getAttribute("id");
    await request("/api/task/" + id, "delete");
    status = true;
    ready();
}

function todoDone() {
    const id = this.parentElement.parentElement.getAttribute("id");
    const todoChange = todoList.find((element) => element.id === id);
    todoChange.checked = !todoChange.checked;
    if (todoChange.checked === true) {
        setTimeout(() => {
            let index = todoList.indexOf(todoChange, 0);
            todoList.splice(index, 1);
            todoList.push(todoChange);
        render();
        }, 500);
    } else if (todoChange.checked === false) {
        setTimeout(() => {
            let index = todoList.indexOf(todoChange, 0);
            todoList.splice(index, 1);
            todoList.unshift(todoChange);
        render();
        }, 500);
    }

}

function todoEdit() {
    if (status === true) {
        status = false;
        let prevValue = this.parentElement.querySelector("textarea").value.trim()
        this.parentElement.querySelector("textarea").removeAttribute("disabled");
        this.parentElement.querySelector("textarea").focus();


    }
}

function setChangesOnEnter(event) {
    if (event.key === "Enter") {
        const id = this.parentElement.getAttribute("id");
        const todoChange = todoList.find((element) => element.id === id);
        let newValue = this.parentElement.querySelector("textarea").value.trim();
        if (!newValue) {
            event.preventDefault();
            return
        }
        todoChange.text = newValue;
        this.parentElement.querySelector("textarea").setAttribute("disabled", "disabled");
        event.preventDefault();
        status = true;
        render();
    }
}

function setPrevValue() {
    status = true;
    render();
}

document.querySelector('.add').addEventListener('click', addTodo);
inputMessage.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTodo();
        event.preventDefault();
    }
})

async function request(url, method = "GET", data = null) {
    try {
        const headers = {}
        let body
        if (data) {
            headers['Content-Type'] = "application/json"
            body = JSON.stringify(data);
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        });
        return response.json();
    } catch (e) {
        console.warn("Error", e.message)
    }
}

async function ready() {
    todoList = await request("/api/tasks/");
    render();
}
ready();
