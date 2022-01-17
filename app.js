"use strict";
import Item from "./item.js";

(function (todo) {

    todo.get = function () {
        const savedItems = JSON.parse(localStorage.getItem('items'));
        if (savedItems !== null)
            savedItems.sort(function(first, second){
                return first.order - second.order;
            }).forEach(item => addItem(item));
    }

    todo.add = function (e) {
        e.preventDefault();
        const input = this['todoInput'];
        const item = new Item(null, input.value, false);
        addItem(item);
        input.value = '';
        save();
    }

    todo.removeAllItems = function () {
        let items = document.querySelectorAll('#toDoItems > li');
        if (items !== null)
            items.forEach(item => remove(null, item));
    }
    const save = () => {
        let items = document.querySelectorAll('#toDoItems > li');
        let res = Array.from(items).map((item, index) => new Item(index, item.childNodes[0].textContent, item.classList.contains('bg-success')));
        localStorage.setItem('items', JSON.stringify(res));
    }

    const addItem = (item) => {
        const list = document.querySelector('#toDoItems');
        if (item.order === null) {
            const items = list.querySelector('li');
            item.order = items === null ? 0 : items.length;
        }

        const li = createToDo(item);
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

    function remove(e, item) {
        if (item !== undefined)
            item.remove();
        else
            this.parentElement.remove();
        save();
    }

})(window.todo = window.todo || {});


document.querySelector('#todoForm').addEventListener('submit', todo.add);
document.querySelector('#removeItemsBtn').addEventListener('click', todo.removeAllItems);
todo.get();



