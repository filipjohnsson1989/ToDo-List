"use strict";
import Item from "./item.js";

(function (todo) {

    todo.get = function () {
        const savedItems = JSON.parse(localStorage.getItem('items'));
        if (savedItems !== null)
            savedItems.forEach(item => addItem(item));
    }

    todo.add = function (e) {
        e.preventDefault();
        const input = this['todoInput'];
        const item = new Item(input.value, false);
        addItem(item);
        input.value = '';
        save();
    }

    const save = () => {
        let items = document.querySelectorAll('#toDoItems>li');
        let res = Array.from(items).map(i => new Item(i.childNodes[0].textContent, i.classList.contains('bg-success')));
        localStorage.setItem('items', JSON.stringify(res));
    }

    const addItem = (item) => {
        const li = createToDo(item);
        const list = document.querySelector('#toDoItems');
        list.appendChild(li);
    }

    const createToDo = (item) => {
        let li = document.createElement('li');
        li.innerText = item.text;
        li.classList.add('list-group-item');
        li.addEventListener('click', change);

        let button = document.createElement('button');
        button.classList.add('btn', 'btn-danger', 'float-end');
        button.innerText = 'X';
        button.addEventListener('click', remove);

        li.appendChild(button);

        if (item.isChecked)
            toggle(li);

        return li;
    }

    function change() {
        toggle(this);
        save();
    }

    const toggle = (li) => {
        li.classList.toggle('bg-success');
        li.classList.toggle('text-decoration-line-through');
        li.classList.toggle('bg-opacity-25');
    }

    function remove() {
        this.parentElement.remove();
        save();
    }

})(window.todo = window.todo || {});


document.querySelector('#todoForm').addEventListener('submit', todo.add);
todo.get();



