import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/Todo'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos!: Todo[];
  inputTodo: string = '';

  constructor() { }

  ngOnInit(): void {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    } else {
      this.todos = [];
    }
  }

  toggleDone(id: number) {
    this.todos = this.todos.map((v, i) => {
      if (i === id) {
        v.completed = !v.completed;
      }
      return v;
    });
    this.saveTodos();
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((v, i) => i !== id);
    this.saveTodos();
  }

  addTodo() {
    if (this.inputTodo.trim() === '') {
      alert('Please enter a non-empty value.');
      return;
    }
    this.todos.push({
      content: this.inputTodo,
      completed: false,
      date: new Date()
    });
    this.inputTodo = '';
    this.saveTodos();
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
