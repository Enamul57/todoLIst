//query select
const listTitle = document.getElementById('input-todo');
const listContainer = document.getElementById('taskList');
const formGroup = document.querySelector('.form-group');


//Todo List class
class Todo {
    constructor(list) {
        this.list = list;
    }
}



//Handle UI tasks
class UI {
    //all type of alert ui function
    static showAlert(msg, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.todoapp');
        const form = document.querySelector('#todolist');
        container.insertBefore(div, form);

    }
    //add list to ui
    static addListTodo(item) {
       const listTag= document.createElement('li');
       const checkBox = document.createElement('input');
       checkBox.type ='checkbox';
       checkBox.className ='checkBoxclass';
       listTag.appendChild(checkBox);

   
       const textNode = document.createTextNode(item.list);
       listTag.appendChild(textNode);
       let span = document.createElement('span');
       span.innerHTML = "X";
       span.style.color='red';
       span.style.fontWeight='400';
       listTag.appendChild(span);
      listContainer.appendChild(listTag);
          //if checkbox is clicked
          checkBox.addEventListener('click', () => {
            if (checkBox.checked) {
              // Checkbox is checked, show an alert
              listTag.style.color='green';
              listTag.style.fontWeight='bold';
             
            }
          });
    }
    //remove the input value
    static clearFields() {
        listTitle.value = '';
    }
    //remove from ui
    static deleteTodoList(item){
       item.remove(); 
    }
}

//Handle Store
class Store {
    static getTodos() {

        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];

        } else {
            todos = JSON.parse(localStorage.getItem('todos'));

        }
        return todos;
    }
    //add to local storage
    static addTodo(todo) {
        const todos = Store.getTodos();
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    //remove from local storage
    static removeList(itemValue){
        const todos = Store.getTodos();
        todos.forEach((item,index)=>{
            if(item.list ==itemValue){
                todos.splice(index,1);
            }
        });
        localStorage.setItem('todos',JSON.stringify(todos));
    }
}

//submiting form
document.getElementById('todolist').addEventListener('submit', (e) => {
    //prevent submit
    e.preventDefault();
    const listItem = listTitle.value;
    //validate 
    if (listItem === '') {
        UI.showAlert('Please fill the fields', 'danger');
        setTimeout((() => {
            document.querySelector('.alert').remove();
        }), 2000);
    } else {
        //instatiate lists
        const todo = new Todo(listItem);
        //add list to UI
        UI.addListTodo(todo);
        //add list to store
        Store.addTodo(todo);
        // Show success message

        UI.showAlert('List Added', 'success');
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000);
        UI.clearFields();
    }

});

//clicking delete button
listContainer.addEventListener('click',(e)=>{
  if(e.target.tagName ==='SPAN'){

    let str = e.target.parentElement.textContent;
    const value = str.replace(/X/g,'');
    //remove from UI
   UI.deleteTodoList(e.target.parentElement);;
    // Remove from store
    Store.removeList(value);
  }
});
