"use strict";
import Item from "./item.js";

(function (todo) {
    const items = document.querySelector('#toDoItems');

    todo.addItem = function(e){
        
        e.preventDefault();
        const input = this['todoInput'];
        const li = createToDo(input.value);
        items.appendChild(li);
        input.value = '';
    }

    const createToDo = (input) => {
        let li = document.createElement('li');
        li.innerText = input;
        li.classList.add('list-group-item');
        li.addEventListener('click', change);

        let button = document.createElement('button');
        button.classList.add('btn', 'btn-danger','float-end');
        button.innerText = 'X';
        button.addEventListener('click', remove);

        li.appendChild(button);

        return li;
    }

    function change(){
        this.classList.toggle('bg-success');
        this.classList.toggle('text-decoration-line-through');
        this.classList.toggle('bg-opacity-25');

    }

    function remove(){
        this.parentElement.remove();
    }

})(window.todo = window.todo || {});


document.querySelector('#todoForm').addEventListener('submit', todo.addItem);



